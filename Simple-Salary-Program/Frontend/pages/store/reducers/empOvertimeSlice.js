import { createSlice } from '@reduxjs/toolkit'
import {generateToken,decodeToken} from '../../util/config'
import _ from 'lodash'
import axios from 'axios'

export const empOvertimeSlice = createSlice({
    name:'empOvertime',
    initialState: {},
    reducers:{
        //To add new Employee overtime
        addEmpOvertime: (state, action) =>{
            const dataToken = generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/${action.payload.empID}/overtime`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },

        //To delete Employee overtime
        deleteEmpOvertime: (state,action) =>{
            const dataToken = generateToken(action.payload)
            axios.delete(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/${action.payload.empID}/overtime`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))  
        },

        //To update status of Employee Overtime
        updateOvertimeStatus: (state, action) => {
            const dataToken =  generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/${action.payload.empID}/overtimne?transNo=${action.payload.transNo}`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },
    }
})

export const { addEmpOvertime, deleteEmpOvertime, updateOvertimeStatus} = empOvertimeSlice.actions
export default empOvertimeSlice.reducer