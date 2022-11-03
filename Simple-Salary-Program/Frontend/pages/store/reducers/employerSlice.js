import { createSlice } from '@reduxjs/toolkit'
import {generateToken,decodeToken} from '../../util/config'
import _ from 'lodash'
import axios from 'axios'

export const employerSlice = createSlice({
    name:'employerSlice',
    initialState: {},
    reducers:{
        //To add new employer
        addEmployer: (state, action) =>{
            const dataToken = generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },

        //To delete employer
        deleteEmployer: (state,action) =>{
            const dataToken = generateToken(action.payload)
            axios.delete(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer?employerID=${action.payload.employerID}`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },

        //To update employer
        updateEmployer: (state, action) => {
            const dataToken =  generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer?employerID=${action.payload.employerID}`,{ token: dataToken })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        },
    }
})

export const { addEmployer, deleteEmployer, updateEmployer} = employerSlice.actions
export default employerSlice.reducer