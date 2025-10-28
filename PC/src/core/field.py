from .constants import *
from utils import ColorChannel
import numpy as np



class Field:
    def __init__(self, px_profile: PixelProfile):
        self.px_profile = px_profile

        self.imgs = dict()

        self.is_boss_wave = False

    def update_screencaps(self, roi_list, imgs: list[np.ndarray]):
        for (roi_list, img) in zip(roi_list, imgs):
            self.imgs[roi_list] = img

    def click_level_up(self, deck_idx, times=1):
        for i in range(times):
            pass

    def click_emote(self, emote_no):
        pass

    def wave_progression_detected(self):
        img = self.imgs.get(self.px_profile.WAVE_CIRCLE_ROI)
        if not img:
            return False
        value = img[0, 0, ColorChannel.R]
        threshold = 255
        wave_circle_is_light = value >= threshold

        wave_progression_detected = False

        if wave_circle_is_light:
            if not self.is_boss_wave:
                self.is_boss_wave = True
                wave_progression_detected = True
                # print("[wave] boss")
                # print(value)
        else:
            self.is_boss_wave = False

        return wave_progression_detected
