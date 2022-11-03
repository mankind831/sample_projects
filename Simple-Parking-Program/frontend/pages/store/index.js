import {configureStore} from '@reduxjs/toolkit'
import parkingReducer from '../store/parkingSlice'


export default configureStore({
    reducer:{
        parkingData: parkingReducer
    },
})