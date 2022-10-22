import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './userSlice';
export const rootReducer = combineReducers({
    userReducer: userSlice.reducer
})
export type RootState = ReturnType<typeof rootReducer>