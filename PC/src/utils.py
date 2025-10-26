import asyncio
import numpy as np



async def periodic(func, interval):
    next_time = asyncio.get_running_loop().time() + interval
    while True:
        now = asyncio.get_running_loop().time()
        sleep_time = next_time - now
        if sleep_time > 0:
            await asyncio.sleep(sleep_time)
        else:
            # print(round(sleep_time, 3))
            next_time -= sleep_time

        if asyncio.iscoroutinefunction(func):
            await func()
        else:
            func()

        next_time += interval



class ColorChannel:
    R = 0
    G = 1
    B = 2



class ImageUtils:
    @classmethod
    def is_pixel_color(self, img: np.ndarray, x, y, rgb: tuple):
        if y < 0 or y >= img.shape[0] or x < 0 or x >= img.shape[1]:
            raise ValueError("The specified coordinates (x, y) are outside the image boundaries.")
        pixel_value = img[y, x]

        return np.array_equal(pixel_value, np.array(rgb, dtype=np.uint8))

    @classmethod
    def compute_roi_similarity_ratio(self, img: np.ndarray, ref_img: np.ndarray, roi_rect: tuple, diff_tolerance=10):
        """
        Compare rectangular ROIs (no blur) and compute the ratio of matching pixels.

        Parameters:
            ref_img: Reference image for matching
            roi_rect: (x, y, w, h) rectangle specifying the region to compare
            diff_tolerance: Max per-channel difference to consider a pixel "matching" (0–255)
        """
        match_sum = self.compute_roi_match_sum(img, ref_img, roi_rect, diff_tolerance)
        match_ratio = match_sum / match_sum.size
        return round(match_ratio, 3)

    @classmethod
    def compute_roi_match_sum(self, img: np.ndarray, ref_img: np.ndarray, roi_rect: tuple, diff_tolerance=10):
        (x, y, w, h) = roi_rect
        roi1 = img[y:y+h, x:x+w]
        roi2 = ref_img[y:y+h, x:x+w]
        diff = np.abs(roi1.astype(np.int16) - roi2.astype(np.int16))
        match_mask = np.all(diff <= diff_tolerance, axis=2)
        match_sum = np.sum(match_mask)
        return match_sum
