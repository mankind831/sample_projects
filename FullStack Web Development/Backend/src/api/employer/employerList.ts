import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { selectDB } from '../../lib/database/query'
import Employer from '../../modules/Employer'
import { generateToken } from '../../util/config'


export const employerRequest = async (req:IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {accountID:string, compID:string}
            const queryData = getQueryParams(req)
            if(queryData.employerID === undefined){
                //Insert Data to the database
                const model = new Employer(result.accountID,result.compID)
                await model.insertData()
                return 'Successfully Added' 
            }else{
                //Update Specific Data
                const model = new Employer(result.accountID,result.compID,`${queryData.employerID}`)
                await model.updateData()
                return 'Successfully Updated'
            }
        case 'GET':
            const data = getQueryParams(req)
            if(!data?.employerID && !data?.accountID){
                const listing = await selectDB('Employer')
                return await generateToken({list:listing})
            }else{
                const conditions: string = !data?.employerID ? `accountID='${data.accountID}'` : `employerID='${data.employerID}'`
                const listing = await selectDB('Employer', conditions)
                return await generateToken({list:listing})
            }
        default:
            break;
    }
    return 'yes'
}