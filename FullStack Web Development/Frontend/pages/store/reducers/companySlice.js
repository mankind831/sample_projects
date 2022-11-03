import { createSlice } from '@reduxjs/toolkit'
import {generateToken,decodeToken} from '../../util/config'
import _ from 'lodash'
import axios from 'axios'

export const companySlice = createSlice({
    name:'companiesData',
    initialState: {},
    reducers:{
        //To add new company data
        addCompany: (state, action) =>{ 
            const dataToken = generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/company`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },
        
        //To delete company data
        deleteCompany: (state,action) =>{
            const dataToken = generateToken(action.payload)
            axios.delete(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/company?compID=${action.payload.accountID}`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },

        //To update company data
        updateCompany: (state, action) => {
            const dataToken =  generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/adminlist?accountID=${action.payload.accountID}`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },
    }
})

export const { addCompany, deleteCompany, updateCompany } = companySlice.actions
export default companySlice.reducer