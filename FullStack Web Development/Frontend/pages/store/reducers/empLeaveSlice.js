import { createSlice } from '@reduxjs/toolkit'
import {generateToken,decodeToken} from '../../util/config'
import _ from 'lodash'
import axios from 'axios'

export const empLeaveSlice = createSlice({
    name:'empLeave',
    initialState: {},
    reducers:{
        //To add new Employee Leave
        addEmpLeave: (state, action) =>{
            const dataToken = generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/${action.payload.empID}/leave`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },

        //To delete Employee Leave
        deleteEmpLeave: (state,action) =>{
            const dataToken = generateToken(action.payload)
            axios.delete(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/${action.payload.empID}/leave`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))  
        },

        //To update status of Employee Leave
        updateLeaveStatus: (state, action) => {
            const dataToken =  generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/${action.payload.empID}/leave?transNo=${action.payload.transNo}`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },
    }
})

export const { addEmpLeave, deleteEmpLeave, updateLeaveStatus} = empLeaveSlice.actions
export default empLeaveSlice.reducer