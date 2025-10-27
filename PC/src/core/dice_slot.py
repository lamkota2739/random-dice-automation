class DiceSlot(tuple):
    _y_map = {"a": 0, "b": 1, "c": 2}

    def __new__(cls, slot):
        if isinstance(slot, str):
            coords = cls._parse_slot_string(slot)
        elif isinstance(slot, (tuple, list)):
            coords = tuple(slot)
        else:
            raise TypeError(f"{cls.__name__} must be initialized with str, tuple, or list, not {type(slot).__name__}")
        return super().__new__(cls, coords)

    @classmethod
    def _parse_slot_string(cls, slot_str: str) -> tuple[int, int]:
        try:
            if len(slot_str) != 2:
                raise ValueError

            y_char, x_char = slot_str[0].lower(), slot_str[1]
            x = int(x_char) - 1
            if not (0 <= x <= 4):
                raise ValueError
            if y_char not in cls._y_map or not x_char.isdigit():
                raise ValueError
            y = cls._y_map[y_char]

            return (x, y)
        except Exception:
            raise ValueError(f"Invalid slot name '{slot_str}'. Must be one of a1–a5, b1–b5, or c1–c5.")

    def __repr__(self):
        return f"{self.__class__.__name__}{tuple(self)}"
