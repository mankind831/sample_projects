import { createSlice } from '@reduxjs/toolkit'
import {generateToken,decodeToken} from '../../util/config'
import _ from 'lodash'
import axios from 'axios'

export const adminSlice = createSlice({
    name:'adminData',
    initialState: {},
    reducers:{
        //To add new admin
        addAdmin: (state, action) =>{
            const dataToken = generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/admin`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },

        //To delete admin
        deleteAdmin: (state,action) =>{
            const dataToken = generateToken(action.payload)
            axios.delete(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/admin?adminID=${action.payload.adminID}`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },

        //To update admin
        updateAdmin: (state, action) => {
            const dataToken =  generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/admint?adminID=${action.payload.adminID}`,{ token: dataToken })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        },
    }
})

export const { addAdmin, deleteAdmin, updateAdmin} = adminSlice.actions
export default adminSlice.reducer