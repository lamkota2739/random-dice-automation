timers.keepAlive();

// ===== constants.js =====
const GameMode = { FIGHT: "fight", COOP: "coop" };
const DisplayResolution = {
    BLUESTACKS: "540x960", PIXEL_6A: "1080x2400", PIXEL_2XL: "1440x2880",
    SD: "480x720", QUARTER_HD: "540x960", HD: "720x1280",
    FULL_HD: "1080x1920", QUAD_HD: "1440x2560"
};

let PixelProfile = {
    init: function (resolution, mode) {
        switch (resolution) {
            case DisplayResolution.BLUESTACKS:
            case DisplayResolution.QUARTER_HD:
                this.SLOT_OFFSET_H = 62.5; this.SLOT_OFFSET_V = 60;
                this.BOARD_CENTER_REFERENCE_POINT = mode === GameMode.FIGHT ? [145, 562.5] : [145, 512.5];
                break;
            case DisplayResolution.FULL_HD:
                this.SLOT_OFFSET_H = 125; this.SLOT_OFFSET_V = 120;
                this.BOARD_CENTER_REFERENCE_POINT = mode === GameMode.FIGHT ? [290, 1125] : [290, 1025];
                break;
            case DisplayResolution.PIXEL_6A:
                this.SCREEN_MARGIN_V = 240;
                this.BOARD_OFFSET_BETWEEN_MODES = [0, 96];
                this.SLOT_SIZE = 109; this.SLOT_SPACING_H = 16; this.SLOT_SPACING_V = 11;
                this.SLOT_OFFSET_H = this.SLOT_SIZE + this.SLOT_SPACING_H;
                this.SLOT_OFFSET_V = this.SLOT_SIZE + this.SLOT_SPACING_V;
                this.REDUCED_SLOT_SIZE = 27; this.REDUCED_SLOT_SPACING_H = 4; this.REDUCED_SLOT_SPACING_V = 3;
                this.REDUCED_SLOT_OFFSET_H = this.REDUCED_SLOT_SIZE + this.REDUCED_SLOT_SPACING_H;
                this.REDUCED_SLOT_OFFSET_V = this.REDUCED_SLOT_SIZE + this.REDUCED_SLOT_SPACING_V;
                this.WAVE_CIRCLE_ROI = [559, 300, 1, 1];
                this.WAVE_PLUS_ROI = [697, 302, 1, 1];
                if (mode === GameMode.FIGHT) {
                    this.BOARD_CORNER_REFERENCE_POINT = [236, 1309];
                    this.BOARD_CENTER_REFERENCE_POINT = [290, 1363];
                    this.BOARD_BOUNDARY_RECT = [236, 1309, 611, 349];
                } else {
                    this.BOARD_CORNER_REFERENCE_POINT = [236, 1213];
                    this.BOARD_CENTER_REFERENCE_POINT = [290, 1267];
                    this.BOARD_BOUNDARY_RECT = [236, 1213, 611, 349];
                }
                break;
            case DisplayResolution.PIXEL_2XL:
                this.SCREEN_MARGIN_V = 160;
                this.BOARD_OFFSET_BETWEEN_MODES = [0, 128];
                this.SLOT_SIZE = 145; this.SLOT_SPACING_H = 21; this.SLOT_SPACING_V = 15;
                this.SLOT_OFFSET_H = this.SLOT_SIZE + this.SLOT_SPACING_H;
                this.SLOT_OFFSET_V = this.SLOT_SIZE + this.SLOT_SPACING_V;
                this.WAVE_CIRCLE_ROI = [745, 242, 1, 1];
                this.WAVE_PLUS_ROI = [928, 243, 1, 1];
                if (mode === GameMode.FIGHT) {
                    this.BOARD_CORNER_REFERENCE_POINT = [315, 1585];
                    this.BOARD_CENTER_REFERENCE_POINT = [387, 1657];
                    this.BOARD_BOUNDARY_RECT = [314, 1585, 812, 465];
                } else {
                    this.BOARD_CORNER_REFERENCE_POINT = [315, 1457];
                    this.BOARD_CENTER_REFERENCE_POINT = [387, 1529];
                    this.BOARD_BOUNDARY_RECT = [314, 1457, 812, 465];
                }
                break;
            default:
                throw new Error("Unsupported resolution: " + resolution);
        }
        return this;
    }
};

// ===== Dice.js =====
let Dice = {
    init: function (type) {
        this.type = type;
        return this;
    }
};

let MonolithDice = Object.create(Dice);
MonolithDice.init = function () {
    Dice.init.call(this, "monolith");
    return this;
};

// ===== DiceSlot.js =====
let DiceSlot = {
    _yMap: { a: 0, b: 1, c: 2 },
    init: function (slot) {
        if (typeof slot === "string") this.coords = this._parseSlotString(slot);
        else if (Array.isArray(slot)) this.coords = slot;
        else throw new TypeError("DiceSlot must be string or array");
        Object.freeze(this.coords);
        return this;
    },
    _parseSlotString: function (slotStr) {
        if (slotStr.length !== 2) throw new Error();
        const yChar = slotStr[0].toLowerCase(), xChar = slotStr[1];
        const x = parseInt(xChar) - 1;
        if (isNaN(x) || x < 0 || x > 4 || !(yChar in this._yMap)) throw new Error();
        const y = this._yMap[yChar]; return [x, y];
    },
    repr: function () { return "DiceSlot(" + this.coords + ")"; }
};

// ===== Board.js =====
let Board = {
    init: function (uic, pxProfile) {
        this.uic = uic;
        this.pxProfile = pxProfile;
        this.rect = pxProfile.BOARD_BOUNDARY_RECT;
        this.swipeSlotDuration = 0.005;
        this.swipePointOffset = 50;
        return this;
    },
    convertToImageCoords: function (slot) {
        const [x, y] = slot;
        const [refX, refY] = this.pxProfile.BOARD_CENTER_REFERENCE_POINT;
        return [refX + this.pxProfile.SLOT_OFFSET_H * x, refY + this.pxProfile.SLOT_OFFSET_V * y];
    },
    convertToReducedImageCoords: function (slot) {
        const [x, y] = slot;
        return [this.pxProfile.REDUCED_SLOT_OFFSET_H * x, this.pxProfile.REDUCED_SLOT_OFFSET_V * y];
    },
    swipeSlot: function (slot1, slot2) {
        const [imgX1, imgY1] = this.convertToImageCoords(slot1);
        const [imgX2, imgY2] = this.convertToImageCoords(slot2);
        const [x1, y1] = slot1, [x2, y2] = slot2;
        const offsetX = x1 === x2 ? 0 : this.swipePointOffset;
        const offsetY = y1 === y2 ? 0 : this.swipePointOffset;
        const signX = x1 < x2 ? 1 : -1, signY = y1 < y2 ? 1 : -1;
        this.uic.swipe(imgX1 + offsetX * signX, imgY1 + offsetY * signY, imgX2 - offsetX * signX, imgY2 - offsetY * signY, this.swipeSlotDuration);
    }
};

// ===== Field.js =====
let Field = {
    init: function (pxProfile) {
        this.pxProfile = pxProfile;
        this.imgs = {};
        this.isBossWave = false;
        return this;
    },
    updateScreencaps: function (roiList, imgs) {
        for (let i = 0; i < roiList.length; i++) this.imgs[JSON.stringify(roiList[i])] = imgs[i];
    },
    waveProgressionDetected: function () {
        const roiKey = JSON.stringify(this.pxProfile.WAVE_CIRCLE_ROI);
        const img = this.imgs[roiKey];
        if (!img) return false;
        const value = img[0][0][0];
        const waveCircleIsLight = value >= 255;
        let detected = false;
        if (waveCircleIsLight && !this.isBossWave) { this.isBossWave = true; detected = true; }
        else if (!waveCircleIsLight) this.isBossWave = false;
        return detected;
    }
};

// ===== UiController.js =====
let UiController = {
    init: function () {
        if (!device.isScreenOn()) device.wakeUp();
        if (!requestScreenCapture()) throw new Error("Screen capture permission required");
        return this;
    },
    swipe: function (x1, y1, x2, y2, duration) { swipe(x1, y1, x2, y2, duration * 1000); sleep(50); },
    screencap: function () { const img = captureScreen(); if (!img) throw new Error("Screenshot failed"); return img; },
    roiScreencap: function (roiList, extractChannel) {
        const img = this.screencap(); if (!img) return null;
        const imgWidth = img.getWidth(), imgHeight = img.getHeight();
        const roiDataList = [];
        for (let i = 0; i < roiList.length; i++) {
            const roi = roiList[i];
            let [x, y, w, h] = roi.map(Number);
            if (x < 0) x = 0; if (y < 0) y = 0;
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
            roiDataList.push(roiPixels); clip.recycle();
        }
        img.recycle(); return roiDataList;
    }
};

// ===== utils.js =====
function sleepAsync(sec) { return new Promise(r => setTimeout(r, sec * 1000)); }
function periodic(func, intervalSec) {
    let nextTime = Date.now() / 1000 + intervalSec;

    function schedule() {
        const now = Date.now() / 1000;
        const sleepTime = nextTime - now;
        if (sleepTime < 0) {
            nextTime = now;
            sleepTime = 0;
        }

        sleepAsync(sleepTime).then(() => {
            func();
            nextTime += intervalSec;
            schedule();
        });
    }

    schedule();
}

// ===== Task.js =====
let Task = {
    init: function (uic) { this.uic = uic; return this; },
    run: function (args) { }
};

// ===== CoopDistortionMonolith.js =====
let CoopDistortionMonolith = Object.create(Task);
CoopDistortionMonolith.init = function (uic) {
    Task.init.call(this, uic);
    this.pxProfile = Object.create(PixelProfile).init(DisplayResolution.PIXEL_2XL, GameMode.COOP);
    this.field = Object.create(Field).init(this.pxProfile);
    this.board = Object.create(Board).init(this.uic, this.pxProfile);
    this.boardState = [
        [Object.create(DiceSlot).init("a4"), Object.create(DiceSlot).init("b4")],
        [Object.create(DiceSlot).init("b5"), Object.create(DiceSlot).init("c5")],
        [Object.create(DiceSlot).init("c3"), Object.create(DiceSlot).init("c4")]
    ];
    this.numMonolithGroup = this.boardState.length;
    this.numMonolithsInGroup = this.boardState[0].length;
    this.numBlueMonolithsInGroup = this.numMonolithsInGroup - 1;
    this.numBlueMonoliths = this.numMonolithGroup * this.numBlueMonolithsInGroup;
    this.groupIdx = 0;
    this.monolithCooldown = 3.0;
    this.monolithFireInterval = this.monolithCooldown / this.numBlueMonoliths;
    this.monolithFireCount = 0;
    this.barrierCooldown = 21.0;
    this.lastBarrierCopyTime = Date.now() / 1000 - this.barrierCooldown;
    this.barrierSlot = Object.create(DiceSlot).init("b2");
    this.jokerSlots = ["a2", "b1", "b3", "c2"].map(s => Object.create(DiceSlot).init(s));
    return this;
};

CoopDistortionMonolith.run = function (args) {
    this.maxWaveCount = args.max_wave_count;
    periodic(() => this.runFireMonolith(), this.monolithFireInterval);
    sleepAsync((this.maxWaveCount / 250) * 3600).then(() => {
        console.log("All tasks stopped gracefully.");
    });
};

CoopDistortionMonolith.runFireMonolith = function () {
    const slot1 = this.boardState[this.groupIdx][0];
    const slot2 = this.boardState[this.groupIdx][1];
    this.board.swipeSlot(slot1.coords, slot2.coords);
    this.board.swipeSlot(slot2.coords, slot1.coords);

    this.groupIdx = (this.groupIdx + 1) % this.numMonolithGroup;

    if (this.monolithFireCount % this.numMonolithGroup === 0) {
        this.monolithFireCount = 0;
        this.monitorWaveProgression();
    }
    this.monolithFireCount += 1;
};

CoopDistortionMonolith.updateScreencap = function () {
    const roiList = [this.pxProfile.WAVE_CIRCLE_ROI];
    const imgs = this.uic.roiScreencap(roiList, "r");
    this.field.updateScreencaps(roiList, imgs);
};

CoopDistortionMonolith.monitorWaveProgression = function () {
    const now = Date.now() / 1000;
    if (now - this.lastBarrierCopyTime < this.barrierCooldown) return;

    this.updateScreencap();
    if (this.field.waveProgressionDetected()) {
        this.copyBarrier();
        this.lastBarrierCopyTime = now;
    }
};

CoopDistortionMonolith.copyBarrier = function () {
    this.board.swipeSlot(this.jokerSlots[0].coords, this.barrierSlot.coords);
    this.board.swipeSlot(this.jokerSlots[1].coords, this.barrierSlot.coords);
    this.board.swipeSlot(this.jokerSlots[2].coords, this.barrierSlot.coords);
    this.board.swipeSlot(this.jokerSlots[3].coords, this.barrierSlot.coords);
    console.log("barrier!");
};

// ===== Tasks index =====
const Tasks = { CoopDistortionMonolith };

// ===== main.js =====
function parseArgs() {
    const args = { task: "dm", current_wave_count: 100, max_wave_count: 10000 };
    const argv = engines.myEngine().execArgv || [];
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        switch (arg) {
            case "--task": case "-t": i++; args.task = argv[i]; break;
            case "--current_wave_count": case "-c": i++; args.current_wave_count = parseInt(argv[i]); break;
            case "--max_wave_count": case "-m": i++; args.max_wave_count = parseInt(argv[i]); break;
        }
    }
    return args;
}

function mapToTask(abbr) { const mapping = { dm: "CoopDistortionMonolith" }; return mapping[abbr]; }

function main() {
    const args = parseArgs();
    const uic = Object.create(UiController).init();
    const taskName = mapToTask(args.task);
    const TaskClass = Tasks[taskName];
    const taskInstance = Object.create(TaskClass).init(uic);
    taskInstance.run(args);
}

main();
