export default class Board {
  constructor(uic, pxProfile) {
    this.uic = uic;
    this.pxProfile = pxProfile;
    this.rect = this.pxProfile.BOARD_BOUNDARY_RECT;

    this.swipeSlotDuration = 0.005;
    this.swipePointOffset = 50;
  }

  convertToImageCoords(slot) {
    const [x, y] = slot;
    const [refX, refY] = this.pxProfile.BOARD_CENTER_REFERENCE_POINT;
    return [
      refX + this.pxProfile.SLOT_OFFSET_H * x,
      refY + this.pxProfile.SLOT_OFFSET_V * y,
    ];
  }

  convertToReducedImageCoords(slot) {
    const [x, y] = slot;
    return [
      this.pxProfile.REDUCED_SLOT_OFFSET_H * x,
      this.pxProfile.REDUCED_SLOT_OFFSET_V * y,
    ];
  }

  swipeSlot(slot1, slot2) {
    const [imgX1, imgY1] = this.convertToImageCoords(slot1);
    const [imgX2, imgY2] = this.convertToImageCoords(slot2);

    const [x1, y1] = slot1;
    const [x2, y2] = slot2;

    const offsetX = x1 === x2 ? 0 : this.swipePointOffset;
    const offsetY = y1 === y2 ? 0 : this.swipePointOffset;

    const signX = x1 < x2 ? 1 : -1;
    const signY = y1 < y2 ? 1 : -1;

    this.uic.swipe(
      imgX1 + offsetX * signX,
      imgY1 + offsetY * signY,
      imgX2 - offsetX * signX,
      imgY2 - offsetY * signY,
      this.swipeSlotDuration
    );
  }
}
