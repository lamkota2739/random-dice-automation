from utils import log
import asyncio
from concurrent.futures import ThreadPoolExecutor
import functools
from http.client import RemoteDisconnected
import numpy as np
import requests
import uiautomator2 as uia2



class UiController:
    def __init__(self):
        self.device = None
        self.connect()

    def connect(self):
        self.device = uia2.connect()

    @staticmethod
    def auto_reconnect(func):
        """Decorator: automatically reconnect when connection is lost"""
        @functools.wraps(func)
        def wrapper(self, *args, **kwargs):
            try:
                return func(self, *args, **kwargs)
            except (requests.exceptions.ConnectionError, RemoteDisconnected, uia2.DeviceError) as e:
                print(f"[auto_reconnect] Connection lost: {e}")
                try:
                    self.connect()
                    return func(self, *args, **kwargs)
                except Exception as e2:
                    print(f"[auto_reconnect] Recovery failed: {e2}")
                    raise
        return wrapper

    @auto_reconnect
    def swipe(self, x1, y1, x2, y2, seconds):
        self.device.swipe(int(x1), int(y1), int(x2), int(y2), seconds)

    @auto_reconnect
    def _screencap(self, extract_channel="rgb") -> np.ndarray:
        try:
            img = self.device.screenshot().convert("RGB")
            if img is None:
                raise RuntimeError("img is None")

            channels = {"r":0, "g":1, "b":2}
            channel_idcs = [channels[c] for c in extract_channel]
            img_arr = np.array(img)
            img_arr = img_arr[:, :, channel_idcs]

            return img_arr

        except (requests.exceptions.ConnectionError, RemoteDisconnected) as e:
            raise e
        except Exception as e:
            print("Screenshot error:", e)
            return None

    async def screencap(self, extract_channel="rgb"):
        loop = asyncio.get_running_loop()
        with ThreadPoolExecutor() as pool:
            return await loop.run_in_executor(
                pool,
                functools.partial(self._screencap, extract_channel)
            )

    async def roi_screencap(self, roi_list, extract_channel="rgb") -> list[np.ndarray]:
        img_arr = await self.screencap(extract_channel)
        if img_arr is None:
            return None

        roi_imgs = [img_arr[y:y+h, x:x+w] for (x, y, w, h) in roi_list]

        return roi_imgs

class DummyUiController:
    def __init__(self):
        pass

    def swipe(self, x1, y1, x2, y2, seconds):
        log(f"swipe ({int(x1)}, {int(y1)}) -> ({int(x2)}, {int(y2)}) in {seconds} seconds")

    def _screencap(self, extract_channel="rgb") -> np.ndarray:
        log(f"capture {extract_channel} channel image")

    async def screencap(self, extract_channel="rgb"):
        loop = asyncio.get_running_loop()
        with ThreadPoolExecutor() as pool:
            return await loop.run_in_executor(
                pool,
                functools.partial(self._screencap, extract_channel)
            )

    async def roi_screencap(self, roi_list, extract_channel="rgb") -> list[np.ndarray]:
        await self.screencap(extract_channel)
        for (x, y, w, h) in roi_list:
            log(f"crop ROI ({x}, {y}, {w}, {h}) from captured image")
        return []
