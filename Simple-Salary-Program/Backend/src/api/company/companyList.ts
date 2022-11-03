import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { selectDB } from '../../lib/database/query'
import Company from '../../modules/Company'
import { generateToken,decodeToken } from '../../util/config'

export const companyListRequest = async (req:IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {token:string}
            const queryData = getQueryParams(req)
            if(queryData.compID === undefined){
                //Insert Data to the database
                const decodeData = await decodeToken(result.token)
                const model = new Company(decodeData.name,decodeData.address,decodeData.monthlyLeave,decodeData.monthlyOvertime)
                await model.insertData()
                return await generateToken({result:'Success'})
            }else{
                //Update Specific Data
                const decodeData = await decodeToken(result.token)
                const model = new Company(decodeData.name,decodeData.address,decodeData.monthlyLeave,decodeData.monthlyOvertime,`${queryData.compID}`)
                await model.updateData()
                return await generateToken({result:'Success'})
            }
        case 'GET':
            const data = getQueryParams(req)
            if(!data?.compID){
                const listing = await selectDB('Company')
                return await generateToken({list:listing})
            }
            else{
                const listing = await selectDB('Company',`compID='${data.compID}'`)
                return await generateToken({list:listing})
            }
        default: 
            break;
    }
    return 'yes'
}