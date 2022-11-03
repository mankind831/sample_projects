import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { selectDB } from '../../lib/database/query'
import { UploadEmployee } from '../../modules/UploadEmployee'
import { generateToken,decodeToken } from '../../util/config'

export const uploadEmployeeRequest = async (req:IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {token:string}
            const queryData = getQueryParams(req)
            const decodeData = await decodeToken(result.token)
            if(queryData.update === undefined){
                //Insert Data to the database
                const model = new UploadEmployee(`${queryData.empID}`,decodeData.urlImage)
                await model.insertData()
                return await generateToken({result:'Success'})
            }else{
                //Update Specific Data
                const model = new UploadEmployee(`${queryData.empID}`,decodeData.urlImage)
                await model.updateData()
                return await generateToken({result:'Success'})
            }
        case 'GET':
            const data = getQueryParams(req)
            const listing = await selectDB('UploadEmployee',`empID='${data.empID}'`)
            return await generateToken({list:listing})
        default: 
            break;
    }
    return 'yes'
}