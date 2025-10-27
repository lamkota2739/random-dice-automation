import { ColorChannel } from "../utils.js";

export default class Field {
  constructor(pxProfile) {
    this.pxProfile = pxProfile;
    this.imgs = {};
    this.isBossWave = false;
  }

  updateScreencaps(roiList, imgs) {
    for (let i = 0; i < roiList.length; i++) {
      const roi = roiList[i];
      const img = imgs[i];
      this.imgs[JSON.stringify(roi)] = img;
    }
  }

  clickLevelUp(deckIdx, times = 1) {
    for (let i = 0; i < times; i++) {
      // TODO
    }
  }

  clickEmote(emoteNo) {
    // TODO
  }

  waveProgressionDetected() {
    const roiKey = JSON.stringify(this.pxProfile.WAVE_CIRCLE_ROI);
    const img = this.imgs[roiKey];
    if (!img) {
      console.warn("ROI not found in imgs:", roiKey);
      return false;
    }

    const value = img[0][0][ColorChannel.R];
    const threshold = 255;
    const waveCircleIsLight = value >= threshold;

    let waveProgressionDetected = false;

    if (waveCircleIsLight) {
      if (!this.isBossWave) {
        this.isBossWave = true;
        waveProgressionDetected = true;
      }
    } else {
      this.isBossWave = false;
    }

    return waveProgressionDetected;
  }
}
