// any의 특징 : 모든 타입을 허용, 타입체크 기능이 비활성해서 모든 연산을 해도 오류가 발생하지 않음
// 주의 : 타입스크립트를 사용하는 의미가 무색해지며, 예상치 못한 오류가 발생 가능
// any는 꼭 필요한 경우에만 사용하고, 가능하면 정확한 타입을 지정하는 것이 좋다.

// 아래는 cache라는 변수를 함수 밖에서 선언하여 전역변수화해서 마치 캐쉬처럼 사용함.
// 하지만, 리액트 프레임워크는 캐시로 선언된 전역변수를 탐지하기 어려움.
const cache: Record<string, any> = {}

export const userOrCreate = function <T>(key: string, callback: () => T): T {
  if (!cache[key]) cache[key] = callback()
  return cache[key] as T
}
