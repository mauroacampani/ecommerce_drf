// src/store.jsx
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/reducers'

const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

export default store