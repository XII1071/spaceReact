import * as U from './util'
export const picsumUrl = function (width: number, height: number): string {
  return `https://picsum.photos/${width}/${height}`
}
export const randomAvatar = () => {
  const size = U.random(200, 400)
  return picsumUrl(size, size)
}

export const randomImage = (
  w: number = 1000,
  h: number = 800,
  delta: number = 200
): string => picsumUrl(U.random(w, w + delta), U.random(h, h + delta))
