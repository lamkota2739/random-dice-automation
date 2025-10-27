export default class DiceSlot {
  static _yMap = { a: 0, b: 1, c: 2 };

  constructor(slot) {
    if (typeof slot === "string") {
      this.coords = DiceSlot._parseSlotString(slot);
    } else if (Array.isArray(slot)) {
      this.coords = slot;
    } else {
      throw new TypeError(
        `DiceSlot must be initialized with string or array, not ${typeof slot}`
      );
    }
    Object.freeze(this.coords);
  }

  static _parseSlotString(slotStr) {
    try {
      if (slotStr.length !== 2) throw new Error();

      const yChar = slotStr[0].toLowerCase();
      const xChar = slotStr[1];
      const x = parseInt(xChar) - 1;

      if (isNaN(x) || x < 0 || x > 4) throw new Error();
      if (!(yChar in this._yMap)) throw new Error();

      const y = this._yMap[yChar];
      return [x, y];
    } catch (e) {
      throw new Error(
        `Invalid slot name '${slotStr}'. Must be one of a1–a5, b1–b5, or c1–c5.`
      );
    }
  }

  repr() {
    return `DiceSlot(${this.coords})`;
  }
}
