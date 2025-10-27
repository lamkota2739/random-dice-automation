from core.board import Board, DiceSlot
from core.constants import *
from core.field import Field
from core.ui_controller import Uia2Controller
from .task import Task
from utils import periodic
import asyncio
import itertools
import numpy as np
import time



class CoopDistortionMonolith(Task):
    def __init__(self, uic):
        """
        board:
               |1  |2  |3  |4  |5
            a  |d  |j  |g  |d  |m-r
            b  |j  |b  |j  |m-r|m-b
            c  |d  |j  |m-r|m-b|m-b
        """
        super().__init__(uic)
        mode = GameMode.COOP
        resolution = DisplayResolution.PIXEL_2XL

        self.uic = Uia2Controller()
        self.px_profile = PixelProfile(resolution, mode)
        self.field = Field(self.px_profile)
        self.board = Board(self.uic, self.px_profile)

        self.board_state = np.array([  # the first element corresponds to the red monolith
            [DiceSlot("a5"), DiceSlot("b5")],
            [DiceSlot("b4"), DiceSlot("c5")],
            [DiceSlot("c3"), DiceSlot("c4")],
        ])
        self.num_monolith_group = self.board_state.shape[0]
        self.num_monoliths_in_group = self.board_state.shape[1]
        self.num_blue_monoliths_in_group = self.num_monoliths_in_group - 1
        self.num_blue_monoliths = self.num_monolith_group * self.num_blue_monoliths_in_group
        self.group_idxs = itertools.cycle(list(range(self.num_monolith_group)))
        self.swipe_slot_idcs_on_fire = [
            [0, 1], [1, 0]
        ]

        self.monolith_cooldown = 3.0
        self.monolith_fire_interval = self.monolith_cooldown / self.num_blue_monoliths
        self.monolith_fire_count = 0

        self.monolith_lock = asyncio.Lock()

        self.barrier_slot = DiceSlot("b2")
        self.joker_slots = [DiceSlot("a2"), DiceSlot("b1"), DiceSlot("b3"), DiceSlot("c2")]
        self.short_break_time_after_barrier_copy = 1.8

        self.max_wave_count = None

    def run(self, args):
        asyncio.run(self._run(args))

    async def _run(self, args):
        tasks = [
            asyncio.create_task(periodic(self.run_fire_monolith, self.monolith_fire_interval)),
        ]

        self.max_wave_count = args.max_wave_count

        try:
            await asyncio.sleep(self.max_wave_count / 250 * 3600)
        except asyncio.CancelledError:
            pass
        except KeyboardInterrupt:
            print("\n[!] KeyboardInterrupt detected in _run, stopping tasks...")
        finally:
            for task in tasks:
                task.cancel()
            await asyncio.gather(*tasks, return_exceptions=True)
            print("All tasks stopped gracefully.")

    async def run_fire_monolith(self):
        group_idx = next(self.group_idxs)
        async with self.monolith_lock:
            for (slot1_idx, slot2_idx) in self.swipe_slot_idcs_on_fire:
                slot1 = self.board_state[group_idx][slot1_idx]
                slot2 = self.board_state[group_idx][slot2_idx]
                self.board.swipe_slot(slot1, slot2)

        if self.monolith_fire_count % self.num_monolith_group == 0:
            self.monolith_fire_count = 0
            async with asyncio.TaskGroup() as tg:
                tg.create_task(self.monitor_wave_progression())

        self.monolith_fire_count += 0

    async def update_screencap(self):
        roi_list = [
            self.board.px_profile.WAVE_CIRCLE_ROI,
        ]
        imgs = await self.uic.roi_screencap(roi_list, extract_channel="r")
        self.field.update_screencaps(roi_list, imgs)

    async def monitor_wave_progression(self):
        await asyncio.sleep(0.5)

        await self.update_screencap()

        if self.field.wave_progression_detected():
            await self.monolith_lock.acquire()
            self.copy_barrier()
            time.sleep(self.short_break_time_after_barrier_copy)
            self.monolith_lock.release()

    def copy_barrier(self):
        for joker_slot in self.joker_slots:
            self.board.swipe_slot(joker_slot, self.barrier_slot)
