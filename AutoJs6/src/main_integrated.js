// main.js (AutoJs6用に統合)

// ===== constants.js =====
const GameMode = { FIGHT: "fight", COOP: "coop" };
const DisplayResolution = {
    BLUESTACKS: "540x960", PIXEL_6A: "1080x2400", PIXEL_2XL: "1440x2880",
    SD: "480x720", QUARTER_HD: "540x960", HD: "720x1280",
    FULL_HD: "1080x1920", QUAD_HD: "1440x2560"
};

class PixelProfile {
    constructor(resolution, mode) {
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
                throw new Error(`Unsupported resolution: ${resolution}`);
        }
    }
}

// ===== Dice.js =====
class Dice { constructor(type) { this.type = type; } }
class MonolithDice extends Dice { constructor() { super("monolith"); } }

// ===== DiceSlot.js =====
class DiceSlot {
    static _yMap = { a: 0, b: 1, c: 2 };
    constructor(slot) {
        if (typeof slot === "string") this.coords = DiceSlot._parseSlotString(slot);
        else if (Array.isArray(slot)) this.coords = slot;
        else throw new TypeError(`DiceSlot must be string or array, not ${typeof slot}`);
        Object.freeze(this.coords);
    }
    static _parseSlotString(slotStr) {
        if (slotStr.length !== 2) throw new Error();
        const yChar = slotStr[0].toLowerCase(), xChar = slotStr[1];
        const x = parseInt(xChar) - 1;
        if (isNaN(x) || x < 0 || x > 4 || !(yChar in this._yMap)) throw new Error();
        const y = this._yMap[yChar]; return [x, y];
    }
    repr() { return `DiceSlot(${this.coords})`; }
}

// ===== Board.js =====
class Board {
    constructor(uic, pxProfile) {
        this.uic = uic;
        this.pxProfile = pxProfile;
        this.rect = pxProfile.BOARD_BOUNDARY_RECT;
        this.swipeSlotDuration = 0.005;
        this.swipePointOffset = 50;
    }
    convertToImageCoords(slot) {
        const [x, y] = slot;
        const [refX, refY] = this.pxProfile.BOARD_CENTER_REFERENCE_POINT;
        return [refX + this.pxProfile.SLOT_OFFSET_H * x, refY + this.pxProfile.SLOT_OFFSET_V * y];
    }
    convertToReducedImageCoords(slot) {
        const [x, y] = slot;
        return [this.pxProfile.REDUCED_SLOT_OFFSET_H * x, this.pxProfile.REDUCED_SLOT_OFFSET_V * y];
    }
    swipeSlot(slot1, slot2) {
        const [imgX1, imgY1] = this.convertToImageCoords(slot1);
        const [imgX2, imgY2] = this.convertToImageCoords(slot2);
        const [x1, y1] = slot1, [x2, y2] = slot2;
        const offsetX = x1 === x2 ? 0 : this.swipePointOffset;
        const offsetY = y1 === y2 ? 0 : this.swipePointOffset;
        const signX = x1 < x2 ? 1 : -1, signY = y1 < y2 ? 1 : -1;
        this.uic.swipe(imgX1 + offsetX * signX, imgY1 + offsetY * signY, imgX2 - offsetX * signX, imgY2 - offsetY * signY, this.swipeSlotDuration);
    }
}

// ===== Field.js =====
class Field {
    constructor(pxProfile) {
        this.pxProfile = pxProfile;
        this.imgs = {};
        this.isBossWave = false;
    }
    updateScreencaps(roiList, imgs) {
        for (let i = 0; i < roiList.length; i++) this.imgs[JSON.stringify(roiList[i])] = imgs[i];
    }
    clickLevelUp(deckIdx, times = 1) {}
    clickEmote(emoteNo) {}
    waveProgressionDetected() {
        const roiKey = JSON.stringify(this.pxProfile.WAVE_CIRCLE_ROI);
        const img = this.imgs[roiKey];
        if (!img) { console.warn("ROI not found:", roiKey); return false; }
        const value = img[0][0][0]; // assuming ColorChannel.R=0
        const waveCircleIsLight = value >= 255;
        let detected = false;
        if (waveCircleIsLight && !this.isBossWave) { this.isBossWave = true; detected = true; }
        else if (!waveCircleIsLight) this.isBossWave = false;
        return detected;
    }
}

// ===== UiController.js =====
class UiController {
    constructor() { if (!device.isScreenOn()) device.wakeUp(); if (!requestScreenCapture()) throw new Error("Screen capture permission required"); }
    swipe(x1, y1, x2, y2, duration) { swipe(x1, y1, x2, y2, duration * 1000); }
    screencap() { const img = captureScreen(); if (!img) throw new Error("Screenshot failed"); return img; }
    roiScreencap(roiList, extractChannel = "rgb") {
        const img = this.screencap(); if (!img) return null;
        const imgWidth = img.getWidth(), imgHeight = img.getHeight();
        const roiDataList = [];
        for (const roi of roiList) {
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
}

// ===== Task.js =====
class Task { constructor(uic) { this.uic = uic; } run(args) {} }

// ===== CoopDistortionMonolith.js =====
class CoopDistortionMonolith extends Task {
    constructor(uic) {
        super(uic);
        this.pxProfile = new PixelProfile(DisplayResolution.PIXEL_2XL, GameMode.COOP);
        this.field = new Field(this.pxProfile);
        this.board = new Board(this.uic, this.pxProfile);
        this.boardState = [[new DiceSlot("a5"), new DiceSlot("b5")],[new DiceSlot("b4"), new DiceSlot("c5")],[new DiceSlot("c3"), new DiceSlot("c4")]];
        this.numMonolithGroup = this.boardState.length;
        this.numMonolithsInGroup = this.boardState[0].length;
        this.numBlueMonolithsInGroup = this.numMonolithsInGroup - 1;
        this.numBlueMonoliths = this.numMonolithGroup * this.numBlueMonolithsInGroup;
        this.groupIdxs = (function*(){for(let i=0;i<this.numMonolithGroup;i++) yield i;}).call(this);
        this.swipeSlotIdcsOnFire = [[0,1],[1,0]];
        this.monolithCooldown = 3.0;
        this.monolithFireInterval = this.monolithCooldown / this.numBlueMonoliths;
        this.monolithFireCount = 0;
        this.monolithLock = { value: false };
        this.barrierSlot = new DiceSlot("b2");
        this.jokerSlots = [new DiceSlot("a2"), new DiceSlot("b1"), new DiceSlot("b3"), new DiceSlot("c2")];
        this.shortBreakTimeAfterBarrierCopy = 1.8;
        this.maxWaveCount = null;
    }

    run(args) { this._run(args); }

    async _run(args) {
        periodic(()=>this.runFireMonolith(), this.monolithFireInterval);
        this.maxWaveCount = args.max_wave_count;
        try { await sleep((this.maxWaveCount / 250) * 3600); }
        catch(e){ if(e.name==="AbortError") console.warn("[!] Task aborted"); }
        finally{ console.log("All tasks stopped gracefully."); }
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
        if(this.monolithFireCount % this.numMonolithGroup === 0){ this.monolithFireCount=0; (async()=>{await this.monitorWaveProgression();})(); }
        this.monolithFireCount+=1;
    }

    async updateScreencap() {
        const roiList = [this.pxProfile.WAVE_CIRCLE_ROI];
        const imgs = await this.uic.roiScreencap(roiList, "r");
        this.field.updateScreencaps(roiList, imgs);
    }

    async monitorWaveProgression() {
        await sleep(0.5);
        await this.updateScreencap();
        if(this.field.waveProgressionDetected()){
            await acquireLock(this.monolithLock);
            this.copyBarrier();
            await sleep(this.shortBreakTimeAfterBarrierCopy);
            releaseLock(this.monolithLock);
        }
    }

    copyBarrier() {
        for(const jokerSlot of this.jokerSlots) this.board.swipeSlot(jokerSlot, this.barrierSlot);
    }
}

// ===== utils.js =====
function sleep(sec){ return new Promise(r=>setTimeout(r, sec*1000)); }
async function periodic(func, intervalSec){
    let nextTime = Date.now()/1000 + intervalSec;
    while(true){
        const now = Date.now()/1000;
        let sleepTime = nextTime-now;
        if(sleepTime>0) await sleep(sleepTime);
        else nextTime -= sleepTime;
        const result = func(); if(result instanceof Promise) await result;
        nextTime += intervalSec;
    }
}
async function acquireLock(lock){ while(lock.value) await sleep(0.01); lock.value=true; }
function releaseLock(lock){ lock.value=false; }
function* cycle(arr){ let i=0; while(true) yield arr[i++%arr.length]; }

// ===== Tasks index =====
const Tasks = { CoopDistortionMonolith };

// ===== main.js =====
function parseArgs() {
    const args={task:null,current_wave_count:100,max_wave_count:10000};
    const argv=engines.myEngine().execArgv||[];
    for(let i=0;i<argv.length;i++){
        const arg=argv[i];
        switch(arg){
            case "--task": case "-t": i++; args.task=argv[i]; break;
            case "--current_wave_count": case "-c": i++; args.current_wave_count=parseInt(argv[i]); break;
            case "--max_wave_count": case "-m": i++; args.max_wave_count=parseInt(argv[i]); break;
        }
    }
    return args;
}

function mapToTask(abbr){ const mapping={dm:"CoopDistortionMonolith"}; return mapping[abbr]; }

async function main(){
    const args=parseArgs();
    const uic=new UiController();
    const taskName=mapToTask(args.task);
    const TaskClass=Tasks[taskName];
    const taskInstance=new TaskClass(uic);
    taskInstance.run(args);
}

main();
