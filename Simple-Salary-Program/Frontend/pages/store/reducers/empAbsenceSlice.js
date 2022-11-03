import { createSlice } from '@reduxjs/toolkit'
import {generateToken,decodeToken} from '../../util/config'
import _ from 'lodash'
import axios from 'axios'

export const empAbsenceSlice = createSlice({
    name:'empAbsences',
    initialState: {},
    reducers:{
        //To add new Employee Absent
        addEmpAbsences: (state, action) =>{
            const dataToken = generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/${action.payload.empID}/absent`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },

        //To delete Employee Absent
        deleteEmpAbsences: (state,action) =>{
            const dataToken = generateToken(action.payload)
            axios.delete(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/employer/${action.payload.empID}/absent`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))  
        }
    }
})

export const { addEmpAbsences, deleteEmpAbsences} = empAbsenceSlice.actions
export default empAbsenceSlice.reducer