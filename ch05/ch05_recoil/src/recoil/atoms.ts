import {atom} from 'recoil'

export const countState = atom({
  key: 'countState', // 전역 상태 키
  default: 0 // 초기값
})
