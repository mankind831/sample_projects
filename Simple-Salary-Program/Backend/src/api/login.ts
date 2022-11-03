import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../util/getParameters'
import { selectDB } from '../lib/database/query'
import { generateToken,decodeToken } from '../../src/util/config'

export const loginRequest = async (req:IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {token:string}
            const decodedData = await decodeToken(result.token)
            const listing = await selectDB('Account',`email='${decodedData.email}' AND password='${decodedData.password}'`)
            if(listing.length > 0){
                return await generateToken({role:listing[0].role,accountID:listing[0].accountID,result:true})
            }else{
                return await generateToken({result:false})
            }
        default:
            break;
    }
    return 'yes'
}