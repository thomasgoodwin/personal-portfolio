// mappings 
// [
//  (0 - 1), Left or rightHand Hand
//  (0 - 4), Pinky to Thumb
//  (0 - 3), Top Row to Bottom
// ]

export const leftHand = 0;
export const rightHand = 1;

export const topRow = 0;
export const upperRow = 1;
export const homeRow = 2;
export const bottomRow = 3;

const keyboardSectionAssignment = {
  '1': [leftHand, topRow],
  '!': [leftHand, topRow],
  '2': [leftHand, topRow],
  '@': [leftHand, topRow],
  '3': [leftHand, topRow],
  '#': [leftHand, topRow],
  '4': [leftHand, topRow],
  '$': [leftHand, topRow],
  '5': [leftHand, topRow],
  '%': [leftHand, topRow],
  '6': [rightHand, topRow],
  '^': [rightHand, topRow],
  '7': [rightHand, topRow],
  '&': [rightHand, topRow],
  '8': [rightHand, topRow],
  '*': [rightHand, topRow],
  '9': [rightHand, topRow],
  '(': [rightHand, topRow],
  '0': [rightHand, topRow],
  ')': [rightHand, topRow],
  '-': [rightHand, topRow],
  '_': [rightHand, topRow],
  '=': [rightHand, topRow],
  '+': [rightHand, topRow],
  'q': [leftHand, upperRow],
  'w': [leftHand, upperRow],
  'e': [leftHand, upperRow],
  'r': [leftHand, upperRow],
  't': [leftHand, upperRow],
  'y': [rightHand, upperRow],
  'u': [rightHand, upperRow],
  'i': [rightHand, upperRow],
  'o': [rightHand, upperRow],
  'p': [rightHand, upperRow],
  '[': [rightHand, upperRow],
  '{': [rightHand, upperRow],
  ']': [rightHand, upperRow],
  '}': [rightHand, upperRow],
  'a': [leftHand, homeRow],
  's': [leftHand, homeRow],
  'd': [leftHand, homeRow],
  'f': [leftHand, homeRow],
  'g': [leftHand, homeRow],
  'h': [rightHand, homeRow],
  'j': [rightHand, homeRow],
  'k': [rightHand, homeRow],
  'l': [rightHand, homeRow],
  ';': [rightHand, homeRow],
  ':': [rightHand, homeRow],
  "'": [rightHand, homeRow],
  '"': [rightHand, homeRow],
  'z': [leftHand, bottomRow],
  'x': [leftHand, bottomRow],
  'c': [leftHand, bottomRow],
  'v': [leftHand, bottomRow],
  'b': [leftHand, bottomRow],
  'n': [rightHand, bottomRow],
  'm': [rightHand, bottomRow],
  ',': [rightHand, bottomRow],
  '<': [rightHand, bottomRow],
  '.': [rightHand, bottomRow],
  '>': [rightHand, bottomRow],
  '/': [rightHand, bottomRow],
  '?': [rightHand, bottomRow],
}

export default keyboardSectionAssignment;