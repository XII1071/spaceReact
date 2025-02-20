export const makeArray = function (length: number) {
  return new Array(length).fill(null)
}
export const range = function (min: number, max: number): number[] {
  return makeArray(max - min).map((notUsed, index) => index + min)
}
export const random = function (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min
}
