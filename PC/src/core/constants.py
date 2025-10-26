from enum import Enum



class GameMode(Enum):
    FIGHT = "fight"
    COOP = "coop"



class DisplayResolution(Enum):
    BLUESTACKS = "540x960"
    PIXEL_6A = "1080x2400"
    PIXEL_2XL = "1440x2880"

    SD = "480x720"
    QUARTER_HD = "540x960"
    HD = "720x1280"
    FULL_HD = "1080x1920"
    QUAD_HD = "1440x2560"



class PixelProfile:
    def __init__(self, resolution: DisplayResolution, mode: GameMode):
        match resolution:
            case DisplayResolution.BLUESTACKS | DisplayResolution.QUARTER_HD:
                self.SLOT_OFFSET_H = 62.5
                self.SLOT_OFFSET_V = 60
                if mode == GameMode.FIGHT:
                    self.BOARD_CENTER_REFERENCE_POINT = (145, 562.5)
                elif mode == GameMode.COOP:
                    self.BOARD_CENTER_REFERENCE_POINT = (145, 512.5)

            case DisplayResolution.FULL_HD:
                self.SLOT_OFFSET_H = 125
                self.SLOT_OFFSET_V = 120
                if mode == GameMode.FIGHT:
                    self.BOARD_CENTER_REFERENCE_POINT = (290, 1125)
                elif mode == GameMode.COOP:
                    self.BOARD_CENTER_REFERENCE_POINT = (290, 1025)

            case DisplayResolution.PIXEL_6A:
                self.SCREEN_MARGIN_V = 240  # = margin-top = margin-bottom
                self.BOARD_OFFSET_BETWEEN_MODES = (0, 96)
                self.SLOT_SIZE = 109
                self.SLOT_SPACING_H = 16
                self.SLOT_SPACING_V = 11
                self.SLOT_OFFSET_H = self.SLOT_SIZE + self.SLOT_SPACING_H
                self.SLOT_OFFSET_V = self.SLOT_SIZE + self.SLOT_SPACING_V
                # for reduced image(152x87) in dm
                self.REDUCED_SLOT_SIZE = 27
                self.REDUCED_SLOT_SPACING_H = 4
                self.REDUCED_SLOT_SPACING_V = 3
                self.REDUCED_SLOT_OFFSET_H = self.REDUCED_SLOT_SIZE + self.REDUCED_SLOT_SPACING_H
                self.REDUCED_SLOT_OFFSET_V = self.REDUCED_SLOT_SIZE + self.REDUCED_SLOT_SPACING_V

                self.WAVE_CIRCLE_ROI = (559, 300, 1, 1)  # wave circleの水平方向許容範囲: 552-565
                self.WAVE_PLUS_ROI = (697, 302, 1, 1)    # wave plusの水平方向許容範囲: 690-703

                if mode == GameMode.FIGHT:
                    self.BOARD_CORNER_REFERENCE_POINT = (236, 1309)
                    self.BOARD_CENTER_REFERENCE_POINT = (290, 1363)
                    self.BOARD_BOUNDARY_RECT = (236, 1309, 611, 349)  # w += 3 for monolith detection
                elif mode == GameMode.COOP:
                    self.BOARD_CORNER_REFERENCE_POINT = (236, 1213)
                    self.BOARD_CENTER_REFERENCE_POINT = (290, 1267)
                    self.BOARD_BOUNDARY_RECT = (236, 1213, 611, 349)  # w += 3 for monolith detection

            case DisplayResolution.PIXEL_2XL:
                self.SCREEN_MARGIN_V = 160  # = margin-top = margin-bottom
                self.BOARD_OFFSET_BETWEEN_MODES = (0, 128)
                self.SLOT_SIZE = 145      # horizontal: 146-21-145-21-146-21-145-21-146
                self.SLOT_SPACING_H = 21
                self.SLOT_SPACING_V = 15
                self.SLOT_OFFSET_H = self.SLOT_SIZE + self.SLOT_SPACING_H
                self.SLOT_OFFSET_V = self.SLOT_SIZE + self.SLOT_SPACING_V

                self.WAVE_CIRCLE_ROI = (745, 242, 1, 1)  # wave circleの水平方向許容範囲: 737-753
                self.WAVE_PLUS_ROI = (928, 243, 1, 1)    # wave plusの水平方向許容範囲: 919-936

                if mode == GameMode.FIGHT:
                    self.BOARD_CORNER_REFERENCE_POINT = (315, 1585)  # x += 1 for non-uniform slot size
                    self.BOARD_CENTER_REFERENCE_POINT = (387, 1657)  # += SLOT_SIZE//2
                    self.BOARD_BOUNDARY_RECT = (314, 1585, 812, 465)
                elif mode == GameMode.COOP:
                    self.BOARD_CORNER_REFERENCE_POINT = (315, 1457)  # x += 1 for non-uniform slot size
                    self.BOARD_CENTER_REFERENCE_POINT = (387, 1529)
                    self.BOARD_BOUNDARY_RECT = (314, 1457, 812, 465)



class Dice:
    def __init__(self, type):
        self.type = type

class MonolithDice(Dice):
    def __init__(self):
        super().__init__(type="monolith")



__all__ = [
    "GameMode",
    "DisplayResolution",
    "PixelProfile",
    "Dice",
]
