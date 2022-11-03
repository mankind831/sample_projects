import { createSlice } from '@reduxjs/toolkit'
import {generateToken,decodeToken} from '../../util/config'
import _ from 'lodash'
import axios from 'axios'

export const accountSlice = createSlice({
    name:'accountData',
    initialState: {},
    reducers:{
        //To add new account
        addAccount: (state, action) =>{
            const dataToken = generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/adminlist`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },

        //To delete account
        deleteAccount: (state,action) =>{
            const dataToken = generateToken(action.payload)
            axios.delete(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/adminlist?accountID=${action.payload.accountID}`,{ token: dataToken })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },

        //To update account
        updateAccount: (state, action) => {
            const dataToken =  generateToken(action.payload)
            axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/adminlist?accountID=${action.payload.accountID}`,{ token: dataToken })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        },
    }
})

export const { addAccount, deleteAccount, updateAccount} = accountSlice.actions
export default accountSlice.reducer