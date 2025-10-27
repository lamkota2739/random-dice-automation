from .constants import *



class SlotDice:
    def __init__(self, type: Dice, face_value: int):
        self.type = type
        self.face_value = face_value
