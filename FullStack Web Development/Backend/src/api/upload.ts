import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getFormDataFromRequestStream, getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../util/getParameters'
import { selectDB } from '../lib/database/query'
import { generateToken,decodeToken } from '../../src/util/config'

export const uploadRequest = async (req:IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getFormDataFromRequestStream(req)
            console.log(result.filename)
            // const decodedData = await decodeToken(result.token)
            // const listing = await selectDB('Account',`email='${decodedData.email}' AND password='${decodedData.password}'`)
            // if(listing.length > 0){
            //     return await generateToken({role:listing[0].role,accountID:listing[0].accountID,result:true})
            // }else{
            //     return await generateToken({result:false})
            // }
            return 'Success Uploaded'
        default:
            break;
    }
    return 'yes'
}