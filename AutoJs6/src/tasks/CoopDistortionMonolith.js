import Task from "./Task.js";
import Board from "../core/Board.js";
import { GameMode, DisplayResolution, PixelProfile } from "../core/constants.js";
import DiceSlot from "../core/DiceSlot.js";
import Field from "../core/Field.js";
import { periodic, sleep, cycle, acquireLock, releaseLock } from "../utils.js";

export default class CoopDistortionMonolith extends Task {
  constructor(uic) {
    super(uic);
    this.pxProfile = new PixelProfile(DisplayResolution.PIXEL_2XL, GameMode.COOP);
    this.field = new Field(this.pxProfile);
    this.board = new Board(this.uic, this.pxProfile);
    this.boardState = [
      [new DiceSlot("a5"), new DiceSlot("b5")],
      [new DiceSlot("b4"), new DiceSlot("c5")],
      [new DiceSlot("c3"), new DiceSlot("c4")],
    ];
    this.numMonolithGroup = this.boardState.length;
    this.numMonolithsInGroup = this.boardState[0].length;
    this.numBlueMonolithsInGroup = this.numMonolithsInGroup - 1;
    this.numBlueMonoliths = this.numMonolithGroup * this.numBlueMonolithsInGroup;
    this.groupIdxs = cycle([...Array(this.numMonolithGroup).keys()]);
    this.swipeSlotIdcsOnFire = [
      [0, 1],
      [1, 0],
    ];
    this.monolithCooldown = 3.0;
    this.monolithFireInterval = this.monolithCooldown / this.numBlueMonoliths;
    this.monolithFireCount = 0;
    this.monolithLock = { value: false };
    this.barrierSlot = new DiceSlot("b2");
    this.jokerSlots = [new DiceSlot("a2"), new DiceSlot("b1"), new DiceSlot("b3"), new DiceSlot("c2")];
    this.shortBreakTimeAfterBarrierCopy = 1.8;
    this.maxWaveCount = null;
  }

  async run(args) {
    periodic(() => this.runFireMonolith(), this.monolithFireInterval);

    this.maxWaveCount = args.max_wave_count;

    try {
      await sleep((this.maxWaveCount / 250) * 3600);
    } catch (e) {
      if (e.name === "AbortError") console.warn("[!] Task aborted");
    } finally {
      console.log("All tasks stopped gracefully.");
    }
  }

  async runFireMonolith() {
    const groupIdx = this.groupIdxs.next().value;
    await acquireLock(this.monolithLock);
    for (const [slot1Idx, slot2Idx] of this.swipeSlotIdcsOnFire) {
      const slot1 = this.boardState[groupIdx][slot1Idx];
      const slot2 = this.boardState[groupIdx][slot2Idx];
      this.board.swipeSlot(slot1, slot2);
    }
    releaseLock(this.monolithLock);

    if (this.monolithFireCount % this.numMonolithGroup === 0) {
      this.monolithFireCount = 0;
      (async () => {
        await this.monitorWaveProgression();
      })();
    }

    this.monolithFireCount += 1;
  }

  async updateScreencap() {
    const roiList = [
      this.pxProfile.WAVE_CIRCLE_ROI,
    ];
    const imgs = await this.uic.roiScreencap(roiList, "r");
    this.field.updateScreencaps(roiList, imgs);
  }

  async monitorWaveProgression() {
    await sleep(0.5);
    await this.updateScreencap();

    if (this.field.waveProgressionDetected()) {
      await acquireLock(this.monolithLock);
      this.copyBarrier();
      await sleep(this.shortBreakTimeAfterBarrierCopy);
      releaseLock(this.monolithLock);
    }
  }

  copyBarrier() {
    for (const jokerSlot of this.jokerSlots) {
      this.board.swipeSlot(jokerSlot, this.barrierSlot);
    }
  }
}
