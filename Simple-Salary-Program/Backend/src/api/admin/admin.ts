import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { selectDB } from '../../lib/database/query'
import Admin from '../../modules/Admin'
import {generateToken } from '../../util/config'

export const adminRequest = async (req:IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {accountID:string}
            const queryData = getQueryParams(req)
            if(queryData.adminID === undefined){
                const model = new Admin(result.accountID)
                model.insertData()
                return 'Successfully Added'
            }else{
                const model = new Admin(result.accountID,`${queryData.adminID}`)
                model.updateData()
                return 'Successfully Updated'
            }
        case 'GET':
            const data = getQueryParams(req)
            if(!data?.adminID){
                return await generateToken(await selectDB('Admin'))
            }else{
                return await generateToken(await selectDB('Admin',`adminID='${data.adminID}'`))
            }
        default:
            break;
    }
    return 'yes'
}