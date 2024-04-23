import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
export const store = configureStore({
    reducer: {
        issue: userReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
