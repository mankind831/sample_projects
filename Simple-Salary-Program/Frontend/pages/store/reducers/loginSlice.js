import { createSlice } from '@reduxjs/toolkit'
import {generateToken,decodeToken} from '../../util/config'
import _ from 'lodash'
import axios from 'axios'

export const loginSlice = createSlice({
    name:'login',
    initialState: {
        checkAccount: false,
        accountType: ""
    },
    reducers:{
        login: async (state, action) =>{
            const dataToken = generateToken(action.payload)
            var value = ""
            await axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/login`,{token:dataToken})
                .then((res) => {
                    console.log(res.data)
                    value = res.data
                })
                .catch(err => console.log(err))
                state.checkAccount = value
            console.log(state.checkAccount)
        }
    }
})

export const { login } = loginSlice.actions
export default loginSlice.reducer