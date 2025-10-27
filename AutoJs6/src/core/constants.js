const GameMode = {
  FIGHT: "fight",
  COOP: "coop",
};

const DisplayResolution = {
  BLUESTACKS: "540x960",
  PIXEL_6A: "1080x2400",
  PIXEL_2XL: "1440x2880",
  SD: "480x720",
  QUARTER_HD: "540x960",
  HD: "720x1280",
  FULL_HD: "1080x1920",
  QUAD_HD: "1440x2560",
};

class PixelProfile {
  constructor(resolution, mode) {
    switch (resolution) {
      case DisplayResolution.BLUESTACKS:
      case DisplayResolution.QUARTER_HD:
        this.SLOT_OFFSET_H = 62.5;
        this.SLOT_OFFSET_V = 60;
        if (mode === GameMode.FIGHT) {
          this.BOARD_CENTER_REFERENCE_POINT = [145, 562.5];
        } else if (mode === GameMode.COOP) {
          this.BOARD_CENTER_REFERENCE_POINT = [145, 512.5];
        }
        break;

      case DisplayResolution.FULL_HD:
        this.SLOT_OFFSET_H = 125;
        this.SLOT_OFFSET_V = 120;
        if (mode === GameMode.FIGHT) {
          this.BOARD_CENTER_REFERENCE_POINT = [290, 1125];
        } else if (mode === GameMode.COOP) {
          this.BOARD_CENTER_REFERENCE_POINT = [290, 1025];
        }
        break;

      case DisplayResolution.PIXEL_6A:
        this.SCREEN_MARGIN_V = 240;
        this.BOARD_OFFSET_BETWEEN_MODES = [0, 96];
        this.SLOT_SIZE = 109;
        this.SLOT_SPACING_H = 16;
        this.SLOT_SPACING_V = 11;
        this.SLOT_OFFSET_H = this.SLOT_SIZE + this.SLOT_SPACING_H;
        this.SLOT_OFFSET_V = this.SLOT_SIZE + this.SLOT_SPACING_V;

        this.REDUCED_SLOT_SIZE = 27;
        this.REDUCED_SLOT_SPACING_H = 4;
        this.REDUCED_SLOT_SPACING_V = 3;
        this.REDUCED_SLOT_OFFSET_H = this.REDUCED_SLOT_SIZE + this.REDUCED_SLOT_SPACING_H;
        this.REDUCED_SLOT_OFFSET_V = this.REDUCED_SLOT_SIZE + this.REDUCED_SLOT_SPACING_V;

        this.WAVE_CIRCLE_ROI = [559, 300, 1, 1];
        this.WAVE_PLUS_ROI = [697, 302, 1, 1];

        if (mode === GameMode.FIGHT) {
          this.BOARD_CORNER_REFERENCE_POINT = [236, 1309];
          this.BOARD_CENTER_REFERENCE_POINT = [290, 1363];
          this.BOARD_BOUNDARY_RECT = [236, 1309, 611, 349];
        } else if (mode === GameMode.COOP) {
          this.BOARD_CORNER_REFERENCE_POINT = [236, 1213];
          this.BOARD_CENTER_REFERENCE_POINT = [290, 1267];
          this.BOARD_BOUNDARY_RECT = [236, 1213, 611, 349];
        }
        break;

      case DisplayResolution.PIXEL_2XL:
        this.SCREEN_MARGIN_V = 160;
        this.BOARD_OFFSET_BETWEEN_MODES = [0, 128];
        this.SLOT_SIZE = 145;
        this.SLOT_SPACING_H = 21;
        this.SLOT_SPACING_V = 15;
        this.SLOT_OFFSET_H = this.SLOT_SIZE + this.SLOT_SPACING_H;
        this.SLOT_OFFSET_V = this.SLOT_SIZE + this.SLOT_SPACING_V;

        this.WAVE_CIRCLE_ROI = [745, 242, 1, 1];
        this.WAVE_PLUS_ROI = [928, 243, 1, 1];

        if (mode === GameMode.FIGHT) {
          this.BOARD_CORNER_REFERENCE_POINT = [315, 1585];
          this.BOARD_CENTER_REFERENCE_POINT = [387, 1657];
          this.BOARD_BOUNDARY_RECT = [314, 1585, 812, 465];
        } else if (mode === GameMode.COOP) {
          this.BOARD_CORNER_REFERENCE_POINT = [315, 1457];
          this.BOARD_CENTER_REFERENCE_POINT = [387, 1529];
          this.BOARD_BOUNDARY_RECT = [314, 1457, 812, 465];
        }
        break;

      default:
        throw new Error(`Unsupported resolution: ${resolution}`);
    }
  }
}

class Dice {
  constructor(type) {
    this.type = type;
  }
}

class MonolithDice extends Dice {
  constructor() {
    super("monolith");
  }
}

export {
  GameMode,
  DisplayResolution,
  PixelProfile,
  Dice,
};
