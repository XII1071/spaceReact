import {configureStore} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {rootReducer} from './rootReducer'

const initializeStore = function () {
  // configureStore :: store를 구성하는 명령
  const store = configureStore({
    reducer: rootReducer,
    middleware: function (getDefaultMiddleware) {
      return getDefaultMiddleware({serializableCheck: false})
    }
  })
  return store
}

export function useStore() {
  const store = useMemo(() => initializeStore(), [])
  return store
}
