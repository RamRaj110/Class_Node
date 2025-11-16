import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import feedReducer from './feedSlice'

export const appStore =configureStore({
    reducer:{
        userInfo : userReducer,
        feed:feedReducer
    }
})