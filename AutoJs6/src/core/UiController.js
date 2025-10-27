export default class UiController {
  constructor() {
    if (!device.isScreenOn()) device.wakeUp();
    if (!requestScreenCapture()) throw new Error("Screen capture permission is required");
  }

  swipe(x1, y1, x2, y2, duration) {
    swipe(x1, y1, x2, y2, duration * 1000);
  }

  screencap() {
    const img = captureScreen();
    if (!img) throw new Error("Screenshot failed");
    return img;
  }

  roiScreencap(roiList, extractChannel = "rgb") {
    const img = this.screencap();
    if (!img) return null;

    const imgWidth = img.getWidth();
    const imgHeight = img.getHeight();
    const roiDataList = [];

    for (const roi of roiList) {
      let [x, y, w, h] = roi.map(Number);

      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x + w > imgWidth) w = imgWidth - x;
      if (y + h > imgHeight) h = imgHeight - y;
      if (w <= 0 || h <= 0) continue;

      const clip = images.clip(img, x, y, w, h);
      const roiPixels = [];

      for (let j = 0; j < h; j++) {
        const row = [];
        for (let i = 0; i < w; i++) {
          const colorVal = clip.pixel(i, j);
          const pixel = [];
          if (extractChannel.includes("r")) pixel.push(colors.red(colorVal));
          if (extractChannel.includes("g")) pixel.push(colors.green(colorVal));
          if (extractChannel.includes("b")) pixel.push(colors.blue(colorVal));
          row.push(pixel);
        }
        roiPixels.push(row);
      }
      roiDataList.push(roiPixels);
      clip.recycle();
    }

    img.recycle();
    return roiDataList;
  }
}
