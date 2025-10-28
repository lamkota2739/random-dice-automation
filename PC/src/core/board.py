from .constants import *
from .dice_slot import DiceSlot
from .ui_controller import Uia2Controller



class Board:
    def __init__(self, uic: Uia2Controller, px_profile: PixelProfile):
        self.uic = uic
        self.px_profile = px_profile

        self.swipe_slot_duration = 0.005
        self.swipe_point_offset = 50

    def convert_to_image_coords(self, slot: DiceSlot):
        (x, y) = slot
        (ref_x, ref_y) = self.px_profile.BOARD_CENTER_REFERENCE_POINT
        return (
            ref_x + self.px_profile.SLOT_OFFSET_H*x,
            ref_y + self.px_profile.SLOT_OFFSET_V*y
        )

    def convert_to_reduced_image_coords(self, slot: DiceSlot) -> tuple[int, int]:
        (x, y) = slot
        return (
            self.px_profile.REDUCED_SLOT_OFFSET_H*x,
            self.px_profile.REDUCED_SLOT_OFFSET_V*y
        )

    def swipe_slot(self, slot1: DiceSlot, slot2: DiceSlot):
        img_x1, img_y1 = self.convert_to_image_coords(slot1)
        img_x2, img_y2 = self.convert_to_image_coords(slot2)
        (x1, y1) = slot1
        (x2, y2) = slot2
        offset_x = 0 if x1 == x2 else self.swipe_point_offset
        offset_y = 0 if y1 == y2 else self.swipe_point_offset
        sign_x = 1 if x1 < x2 else -1
        sign_y = 1 if y1 < y2 else -1
        self.uic.swipe(img_x1+offset_x*sign_x, img_y1+offset_y*sign_y,
                       img_x2-offset_x*sign_x, img_y2-offset_y*sign_y,
                       self.swipe_slot_duration)
