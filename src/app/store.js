import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import foodReducer from '../features/foods/foodSlice'
import authReducer from '../features/auth/authSlice'
import requestReducer from '../features/request/requestSlice'
export const store = configureStore({
    reducer:{
        product: productReducer,
        auth: authReducer,
        food: foodReducer,
        request: requestReducer,
    }
})