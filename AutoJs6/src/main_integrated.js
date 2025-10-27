var async = (function(){ (function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):(e="undefined"==typeof globalThis?e||self:globalThis,t(e.async={}))})(this,function(e){"use strict";function t(e,...t){return(...n)=>e(...t,...n)}function n(e){return function(...t){var n=t.pop();return e.call(this,t,n)}}function a(e){setTimeout(e,0)}function i(e){return(t,...n)=>e(()=>t(...n))}function r(e){return d(e)?function(...t){const n=t.pop(),a=e.apply(this,t);return s(a,n)}:n(function(t,n){var a;try{a=e.apply(this,t)}catch(t){return n(t)}return a&&"function"==typeof a.then?s(a,n):void n(null,a)})}function s(e,t){return e.then(e=>{l(t,null,e)},e=>{l(t,e&&(e instanceof Error||e.message)?e:new Error(e))})}function l(e,t,n){try{e(t,n)}catch(e){_e(t=>{throw t},e)}}function d(e){return"AsyncFunction"===e[Symbol.toStringTag]}function u(e){return"AsyncGenerator"===e[Symbol.toStringTag]}function p(e){return"function"==typeof e[Symbol.asyncIterator]}function c(e){if("function"!=typeof e)throw new Error("expected a function");return d(e)?r(e):e}function o(e,t){function n(...n){return"function"==typeof n[t-1]?e.apply(this,n):new Promise((a,i)=>{n[t-1]=(e,...t)=>e?i(e):void a(1<t.length?t:t[0]),e.apply(this,n)})}if(t||(t=e.length),!t)throw new Error("arity is undefined");return n}function h(e){return function a(t,...n){const i=o(function(a){var i=this;return e(t,(e,t)=>{c(e).apply(i,n.concat(t))},a)});return i}}function f(e,t,n,a){t=t||[];var i=[],r=0,s=c(n);return e(t,(e,t,n)=>{var a=r++;s(e,(e,t)=>{i[a]=t,n(e)})},e=>{a(e,i)})}function y(e){return e&&"number"==typeof e.length&&0<=e.length&&0==e.length%1}function m(e){function t(...t){if(null!==e){var n=e;e=null,n.apply(this,t)}}return Object.assign(t,e),t}function g(e){return e[Symbol.iterator]&&e[Symbol.iterator]()}function k(e){var t=-1,n=e.length;return function a(){return++t<n?{value:e[t],key:t}:null}}function v(e){var t=-1;return function n(){var a=e.next();return a.done?null:(t++,{value:a.value,key:t})}}function S(e){var t=e?Object.keys(e):[],n=-1,a=t.length;return function i(){var r=t[++n];return"__proto__"===r?i():n<a?{value:e[r],key:r}:null}}function x(e){if(y(e))return k(e);var t=g(e);return t?v(t):S(e)}function L(e){return function(...t){if(null===e)throw new Error("Callback was already called.");var n=e;e=null,n.apply(this,t)}}function E(e,t,n,a){function i(){p>=t||u||l||(u=!0,e.next().then(({value:e,done:t})=>{if(!(d||l))return u=!1,t?(l=!0,void(0>=p&&a(null))):void(p++,n(e,c,r),c++,i())}).catch(s))}function r(e,t){return p-=1,d?void 0:e?s(e):!1===e?(l=!0,void(d=!0)):t===be||l&&0>=p?(l=!0,a(null)):void i()}function s(e){d||(u=!1,l=!0,a(e))}let l=!1,d=!1,u=!1,p=0,c=0;i()}function O(e,t,n){function a(e,t){!1===e&&(l=!0);!0===l||(e?n(e):(++r===s||t===be)&&n(null))}n=m(n);var i=0,r=0,{length:s}=e,l=!1;for(0===s&&n(null);i<s;i++)t(e[i],i,L(a))}function _(e,t,n){return Ie(e,1/0,t,n)}function b(){function e(e,...a){return e?n(e):void t(1<a.length?a:a[0])}let t,n;return e[Ce]=new Promise((e,a)=>{t=e,n=a}),e}function A(e,t,n){function a(e,t){k.push(()=>l(e,t))}function i(){if(!f){if(0===k.length&&0===h)return n(null,o);for(;k.length&&h<t;){var e=k.shift();e()}}}function r(e,t){var n=g[e];n||(n=g[e]=[]),n.push(t)}function s(e){var t=g[e]||[];t.forEach(e=>e()),i()}function l(e,t,n,a){function i(e,...t){return e?n?s(e):r():1>=t.length?r(t[0]):void r(t)}if(null!=a&&"function"!=typeof a)throw new Error("task callback must be a function");k.started=!0;var r,s,l=k._createTaskItem(e,n?i:a||i);if(t?k._tasks.unshift(l):k._tasks.push(l),y||(y=!0,_e(()=>{y=!1,k.process()})),n||!a)return new Promise((e,t)=>{r=e,s=t})}function d(){for(var e,t=0;v.length;)e=v.pop(),t++,u(e).forEach(e=>{0==--S[e]&&v.push(e)});if(t!==p)throw new Error("async.auto cannot execute tasks due to a recursive dependency")}function u(t){var n=[];return Object.keys(e).forEach(a=>{const i=e[a];Array.isArray(i)&&0<=i.indexOf(t)&&n.push(a)}),n}"number"!=typeof t&&(n=t,t=null),n=m(n||b());var p=Object.keys(e).length;if(!p)return n(null);t||(t=p);var o={},h=0,f=!1,y=!1,g=Object.create(null),k=[],v=[],S={};return Object.keys(e).forEach(t=>{var n=e[t];if(!Array.isArray(n))return a(t,[n]),void v.push(t);var i=n.slice(0,n.length-1),s=i.length;return 0===s?(a(t,n),void v.push(t)):void(S[t]=s,i.forEach(l=>{if(!e[l])throw new Error("async.auto task `"+t+"` has a non-existent dependency `"+l+"` in "+i.join(", "));r(l,()=>{s--,0===s&&a(t,n)})}))}),d(),i(),n[Ce]}function I(e){let t="",n=0,a=e.indexOf("*/");for(;n<e.length;)if("/"===e[n]&&"/"===e[n+1]){let t=e.indexOf("\n",n);n=-1===t?e.length:t}else if(-1!==a&&"/"===e[n]&&"*"===e[n+1]){let i=e.indexOf("*/",n);-1===i?(t+=e[n],n++):(n=i+2,a=e.indexOf("*/",n))}else t+=e[n],n++;return t}function M(e){const t=I(e.toString());let n=t.match(Pe);if(n||(n=t.match(Re)),!n)throw new Error("could not parse args in autoInject\nSource:\n"+t);let[,a]=n;return a.replace(/\s/g,"").split(ze).map(e=>e.replace(Ne,"").trim())}function j(e,t){var n={};return Object.keys(e).forEach(t=>{function a(e,t){var n=i.map(t=>e[t]);n.push(t),c(r)(...n)}var i,r=e[t],s=d(r),l=!s&&1===r.length||s&&0===r.length;if(Array.isArray(r))i=[...r],r=i.pop(),n[t]=i.concat(0<i.length?a:r);else if(l)n[t]=r;else{if(i=M(r),0===i.length&&!s&&0===i.length)throw new Error("autoInject task functions require explicit parameters.");s||i.pop(),n[t]=i.concat(a)}}),A(n,t)}function w(e,t){e.length=1,e.head=e.tail=t}function B(e,t,n){function a(e,t){f[e].push(t)}function i(e,t){const n=(...a)=>{r(e,n),t(...a)};f[e].push(n)}function r(e,t){return e?t?void(f[e]=f[e].filter(e=>e!==t)):f[e]=[]:Object.keys(f).forEach(e=>f[e]=[])}function s(e,...t){f[e].forEach(e=>e(...t))}function l(e,t,n,a){function i(e,...t){return e?n?s(e):r():1>=t.length?r(t[0]):void r(t)}if(null!=a&&"function"!=typeof a)throw new Error("task callback must be a function");k.started=!0;var r,s,l=k._createTaskItem(e,n?i:a||i);if(t?k._tasks.unshift(l):k._tasks.push(l),y||(y=!0,_e(()=>{y=!1,k.process()})),n||!a)return new Promise((e,t)=>{r=e,s=t})}function d(){for(var e,t=0;v.length;)e=v.pop(),t++,u(e).forEach(e=>{0==--S[e]&&v.push(e)});if(t!==p)throw new Error("async.auto cannot execute tasks due to a recursive dependency")}function u(t){var n=[];return Object.keys(e).forEach(a=>{const i=e[a];Array.isArray(i)&&0<=i.indexOf(t)&&n.push(a)}),n}"number"!=typeof t&&(n=t,t=null),n=m(n||b());var p=Object.keys(e).length;if(!p)return n(null);t||(t=p);var o={},h=0,f=!1,y=!1,g=Object.create(null),k=[],v=[],S={};return Object.keys(e).forEach(t=>{var n=e[t];if(!Array.isArray(n))return a(t,[n]),void v.push(t);var i=n.slice(0,n.length-1),s=i.length;return 0===s?(a(t,n),void v.push(t)):void(S[t]=s,i.forEach(l=>{if(!e[l])throw new Error("async.auto task `"+t+"` has a non-existent dependency `"+l+"` in "+i.join(", "));r(l,()=>{s--,0===s&&a(t,n)})}))}),d(),i(),n[Ce]}function I(e){let t="",n=0,a=e.indexOf("*/");for(;n<e.length;)if("/"===e[n]&&"/"===e[n+1]){let t=e.indexOf("\n",n);n=-1===t?e.length:t}else if(-1!==a&&"/"===e[n]&&"*"===e[n+1]){let i=e.indexOf("*/",n);-1===i?(t+=e[n],n++):(n=i+2,a=e.indexOf("*/",n))}else t+=e[n],n++;return t} /* minified code 全部続く */ })(); })();

// ===== constants.js =====
var GameMode = { FIGHT: "fight", COOP: "coop" };
var DisplayResolution = {
    BLUESTACKS: "540x960", PIXEL_6A: "1080x2400", PIXEL_2XL: "1440x2880",
    SD: "480x720", QUARTER_HD: "540x960", HD: "720x1280",
    FULL_HD: "1080x1920", QUAD_HD: "1440x2560"
};

// ===== PixelProfile.js =====
function PixelProfile(resolution, mode) {
    switch(resolution) {
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
            if(mode === GameMode.FIGHT){
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
            if(mode === GameMode.FIGHT){
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
}

// ===== Dice.js =====
function Dice(type){ this.type = type; }
function MonolithDice(){ Dice.call(this, "monolith"); }
MonolithDice.prototype = Object.create(Dice.prototype);
MonolithDice.prototype.constructor = MonolithDice;

// ===== DiceSlot.js =====
function DiceSlot(slot){
    if(typeof slot === "string") this.coords = DiceSlot._parseSlotString(slot);
    else if(Array.isArray(slot)) this.coords = slot;
    else throw new TypeError("DiceSlot must be string or array");
    Object.freeze(this.coords);
}
DiceSlot._yMap = { a:0, b:1, c:2 };
DiceSlot._parseSlotString = function(slotStr){
    if(slotStr.length !== 2) throw new Error();
    var yChar = slotStr[0].toLowerCase(), xChar = slotStr[1];
    var x = parseInt(xChar)-1;
    if(isNaN(x)||x<0||x>4||!(yChar in this._yMap)) throw new Error();
    var y = this._yMap[yChar]; return [x, y];
};
DiceSlot.prototype.repr = function(){ return "DiceSlot(" + this.coords + ")"; };

// ===== Board.js =====
function Board(uic, pxProfile){
    this.uic = uic;
    this.pxProfile = pxProfile;
    this.rect = pxProfile.BOARD_BOUNDARY_RECT;
    this.swipeSlotDuration = 0.005;
    this.swipePointOffset = 50;
}
Board.prototype.convertToImageCoords = function(slot){
    var x = slot[0], y = slot[1];
    var refX = this.pxProfile.BOARD_CENTER_REFERENCE_POINT[0];
    var refY = this.pxProfile.BOARD_CENTER_REFERENCE_POINT[1];
    return [refX + this.pxProfile.SLOT_OFFSET_H*x, refY + this.pxProfile.SLOT_OFFSET_V*y];
};
Board.prototype.convertToReducedImageCoords = function(slot){
    return [this.pxProfile.REDUCED_SLOT_OFFSET_H*slot[0], this.pxProfile.REDUCED_SLOT_OFFSET_V*slot[1]];
};
Board.prototype.swipeSlot = function(slot1, slot2){
    var coords1 = this.convertToImageCoords(slot1);
    var coords2 = this.convertToImageCoords(slot2);
    var x1 = slot1[0], y1 = slot1[1], x2 = slot2[0], y2 = slot2[1];
    var offsetX = x1===x2?0:this.swipePointOffset;
    var offsetY = y1===y2?0:this.swipePointOffset;
    var signX = x1<x2?1:-1, signY=y1<y2?1:-1;
    this.uic.swipe(coords1[0]+offsetX*signX, coords1[1]+offsetY*signY,
                   coords2[0]-offsetX*signX, coords2[1]-offsetY*signY, this.swipeSlotDuration);
};

// ===== Field.js =====
function Field(pxProfile){
    this.pxProfile = pxProfile;
    this.imgs = {};
    this.isBossWave = false;
}
Field.prototype.updateScreencaps = function(roiList, imgs){
    for(var i=0;i<roiList.length;i++) this.imgs[JSON.stringify(roiList[i])] = imgs[i];
};
Field.prototype.waveProgressionDetected = function(){
    var roiKey = JSON.stringify(this.pxProfile.WAVE_CIRCLE_ROI);
    var img = this.imgs[roiKey];
    if(!img){ console.warn("ROI not found:", roiKey); return false; }
    var value = img[0][0][0];
    var waveCircleIsLight = value>=255;
    var detected = false;
    if(waveCircleIsLight && !this.isBossWave){ this.isBossWave=true; detected=true; }
    else if(!waveCircleIsLight) this.isBossWave=false;
    return detected;
};

// ===== UiController.js =====
function UiController(){
    if(!device.isScreenOn()) device.wakeUp();
    if(!requestScreenCapture()) throw new Error("Screen capture permission required");
}
UiController.prototype.swipe = function(x1,y1,x2,y2,duration){
    swipe(x1,y1,x2,y2,duration*1000);
};
UiController.prototype.screencap = function(){
    var img = captureScreen();
    if(!img) throw new Error("Screenshot failed");
    return img;
};
UiController.prototype.roiScreencap = function(roiList, extractChannel){
    extractChannel = extractChannel || "rgb";
    var img = this.screencap();
    if(!img) return null;
    var imgWidth = img.getWidth(), imgHeight = img.getHeight();
    var roiDataList = [];
    for(var r=0;r<roiList.length;r++){
        var roi = roiList[r];
        var x = roi[0], y = roi[1], w = roi[2], h = roi[3];
        if(x<0) x=0;
        if(y<0) y=0;
        if(x+w>imgWidth) w=imgWidth-x;
        if(y+h>imgHeight) h=imgHeight-y;
        if(w<=0||h<=0) continue;
        var clip = images.clip(img,x,y,w,h);
        var roiPixels = [];
        for(var j=0;j<h;j++){
            var row=[];
            for(var i=0;i<w;i++){
                var colorVal = clip.pixel(i,j);
                var pixel=[];
                if(extractChannel.includes("r")) pixel.push(colors.red(colorVal));
                if(extractChannel.includes("g")) pixel.push(colors.green(colorVal));
                if(extractChannel.includes("b")) pixel.push(colors.blue(colorVal));
                row.push(pixel);
            }
            roiPixels.push(row);
        }
        roiDataList.push(roiPixels);
        clip.recycle();
    }
    img.recycle();
    return roiDataList;
};

// ===== Task.js =====
function Task(uic){ this.uic = uic; }
Task.prototype.run = function(args){};

// ===== CoopDistortionMonolith.js =====
function CoopDistortionMonolith(uic){
    Task.call(this,uic);
    this.pxProfile = new PixelProfile(DisplayResolution.PIXEL_2XL, GameMode.COOP);
    this.field = new Field(this.pxProfile);
    this.board = new Board(this.uic, this.pxProfile);
    this.boardState = [
        [new DiceSlot("a5"), new DiceSlot("b5")],
        [new DiceSlot("b4"), new DiceSlot("c5")],
        [new DiceSlot("c3"), new DiceSlot("c4")]
    ];
    this.numMonolithGroup = this.boardState.length;
    this.numMonolithsInGroup = this.boardState[0].length;
    this.numBlueMonolithsInGroup = this.numMonolithsInGroup-1;
    this.numBlueMonoliths = this.numMonolithGroup * this.numBlueMonolithsInGroup;
    this.groupIdxs = cycle(Array.from({length:this.numMonolithGroup},(_,i)=>i));
    this.swipeSlotIdcsOnFire = [[0,1],[1,0]];
    this.monolithCooldown = 3.0;
    this.monolithFireInterval = this.monolithCooldown / this.numBlueMonoliths;
    this.monolithFireCount = 0;
    this.monolithLock = {value:false};
    this.barrierSlot = new DiceSlot("b2");
    this.jokerSlots = [new DiceSlot("a2"), new DiceSlot("b1"), new DiceSlot("b3"), new DiceSlot("c2")];
    this.shortBreakTimeAfterBarrierCopy = 1.8;
    this.maxWaveCount = null;
}
CoopDistortionMonolith.prototype = Object.create(Task.prototype);
CoopDistortionMonolith.prototype.constructor = CoopDistortionMonolith;

CoopDistortionMonolith.prototype.run = function(args){
    var self = this;
    this.maxWaveCount = args.max_wave_count;

    async.forever(
        function(next){
            var groupIdx = self.groupIdxs.next().value;
            async.eachSeries(self.swipeSlotIdcsOnFire, function(pair, cb){
                self.acquireLock(self.monolithLock, function(){
                    var slot1 = self.boardState[groupIdx][pair[0]];
                    var slot2 = self.boardState[groupIdx][pair[1]];
                    self.board.swipeSlot(slot1, slot2);
                    self.releaseLock(self.monolithLock);
                    cb();
                });
            }, function(err){
                self.monolithFireCount += 1;
                if(self.monolithFireCount % self.numMonolithGroup === 0){
                    self.monitorWaveProgression(function(){ next(); });
                } else {
                    setTimeout(next, self.monolithFireInterval*1000);
                }
            });
        },
        function(err){
            console.log("All tasks stopped gracefully.");
        }
    );
};

CoopDistortionMonolith.prototype.acquireLock = function(lock, cb){
    async.whilst(
        function(){ return lock.value; },
        function(next){ setTimeout(next, 10); },
        function(){ lock.value = true; cb(); }
    );
};

CoopDistortionMonolith.prototype.releaseLock = function(lock){ lock.value=false; };

CoopDistortionMonolith.prototype.updateScreencap = function(cb){
    var imgs = this.uic.roiScreencap([this.pxProfile.WAVE_CIRCLE_ROI],"r");
    this.field.updateScreencaps([this.pxProfile.WAVE_CIRCLE_ROI], imgs);
    cb();
};

CoopDistortionMonolith.prototype.monitorWaveProgression = function(cb){
    var self = this;
    setTimeout(function(){
        self.updateScreencap(function(){
            if(self.field.waveProgressionDetected()){
                self.acquireLock(self.monolithLock, function(){
                    self.copyBarrier();
                    setTimeout(function(){
                        self.releaseLock(self.monolithLock);
                        cb();
                    }, self.shortBreakTimeAfterBarrierCopy*1000);
                });
            } else cb();
        });
    }, 500);
};

CoopDistortionMonolith.prototype.copyBarrier = function(){
    for(var i=0;i<this.jokerSlots.length;i++){
        this.board.swipeSlot(this.jokerSlots[i], this.barrierSlot);
    }
};

// ===== utils.js =====
function* cycle(arr){ var i=0; while(true) yield arr[i++%arr.length]; }

// ===== Tasks index =====
var Tasks = { CoopDistortionMonolith };

// ===== main.js =====
function parseArgs(){
    var args={task:null,current_wave_count:100,max_wave_count:10000};
    var argv=engines.myEngine().execArgv||[];
    for(var i=0;i<argv.length;i++){
        var arg = argv[i];
        switch(arg){
            case "--task": case "-t": i++; args.task=argv[i]; break;
            case "--current_wave_count": case "-c": i++; args.current_wave_count=parseInt(argv[i]); break;
            case "--max_wave_count": case "-m": i++; args.max_wave_count=parseInt(argv[i]); break;
        }
    }
    return args;
}
function mapToTask(abbr){ var mapping={dm:"CoopDistortionMonolith"}; return mapping[abbr]; }

function main(){
    var args=parseArgs();
    var uic=new UiController();
    var taskName=mapToTask(args.task);
    var TaskClass=Tasks[taskName];
    var taskInstance=new TaskClass(uic);
    taskInstance.run(args);
}

main();
