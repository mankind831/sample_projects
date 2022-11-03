import { createSlice } from '@reduxjs/toolkit'
import {generateToken,decodeToken} from '../../util/config'
import _ from 'lodash'
import axios from 'axios'

export const employeeSlice = createSlice({
    name:'employeeData',
    initialState: {},
    reducers:{
        //To  add new employee data
        addEmployee: (state, action) =>{
            const dataToken = generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/employee`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },
        //To delete employee data
        deleteEmployee: (state,action) =>{
            const dataToken = generateToken(action.payload)
            axios.delete(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/employee?empID=${action.payload.empID}`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },
        updateEmployee: (state, action) => {
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/employee?empID=${action.payload.empID}`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },
    }
})

export const { addEmployee, deleteEmployee, updateEmployee} = employeeSlice.actions
export default employeeSlice.reducer