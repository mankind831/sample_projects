import axios from 'axios'
import { generateToken, decodeToken } from '../util/config'

export const fetchData = async (tableName, condition = "") =>{
    var returnData
    if(condition !== "" && condition !== " "){
        await axios.get(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/${tableName}?${condition}`)
            .then(async res => {
                returnData = await decodeToken(res.data)
            })
            .catch(err => console.log(err))
    }
    else{
        await axios.get(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/${tableName}`)
            .then(async res => {
                returnData = await decodeToken(res.data)
            })
            .catch(err => console.log(err))
    }
    return returnData.list
}

export const postData = async (tableName, bodyData ,condition="") => {
    var returnData
    if(condition !== ""){
        await axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/${tableName}?${condition}`,{token:await generateToken(bodyData)})
            .then(async res => {
                returnData = await decodeToken(res.data)
            })
            .catch(err => console.log(err))
    }else{
        await axios.post(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/${tableName}`,{token:await generateToken(bodyData)})
            .then(async res => {
                returnData = await decodeToken(res.data)
            })
            .catch(err => console.log(err))
    }
    return returnData
}

export const deleteData = async (tableName,condition="") => {
    var returnData
    if(condition !== ""){
        console.log(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/${tableName}?${condition}`)
        await axios.delete(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/${tableName}?${condition}`)
            .then(async res => {
                console.log(res.data)
                returnData = await decodeToken(res.data)
            })
            .catch(err => console.log(err))
    }else{
        await axios.delete(`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/${tableName}`)
            .then(async res => {
                returnData = await decodeToken(res.data)
            })
            .catch(err => console.log(err))
    }
    return returnData
}