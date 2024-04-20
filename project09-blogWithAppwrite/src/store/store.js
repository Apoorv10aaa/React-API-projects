import {configureStore} from '@reduxjs/toolkit';
import blogReducers from './authSlice'
const store= configureStore({
    reducer:blogReducers
})

export default store;