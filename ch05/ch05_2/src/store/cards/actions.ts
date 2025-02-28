import type * as T from './types'

export const addCard = function (payload: T.Card) {
  return {type: '@cards/addCard', payload}
}

export const removeCard = function (payload: string) {
  return {type: '@cards/removeCard', payload}
}
