import { configureStore } from '@reduxjs/toolkit'
import snippetReducer from "../snippetSlice"

export const store = configureStore({
  reducer: {
    snippet : snippetReducer
  },
})