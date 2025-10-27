export async function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

export async function periodic(func, intervalSec) {
  let nextTime = performance.now() / 1000 + intervalSec;
  while (true) {
    const now = performance.now() / 1000;
    let sleepTime = nextTime - now;
    if (sleepTime > 0) {
      await sleep(sleepTime);
    } else {
      nextTime -= sleepTime;
    }
    const result = func();
    if (result instanceof Promise) {
      await result;
    }
    nextTime += intervalSec;
  }
}

export function* cycle(arr) {
  while (true) {
    for (const item of arr) yield item;
  }
}

export async function acquireLock(lockRef) {
  while (lockRef.value) {
    await sleep(0.01);
  }
  lockRef.value = true;
}

export function releaseLock(lockRef) {
  lockRef.value = false;
}

export const ColorChannel = {
  R: 0,
  G: 1,
  B: 2
};
