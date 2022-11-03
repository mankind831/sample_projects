import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { selectDB } from '../../lib/database/query'
import { UploadCompany } from '../../modules/UploadCompany'
import { generateToken,decodeToken } from '../../util/config'

export const uploadCompanyRequest = async (req:IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {token:string}
            const queryData = getQueryParams(req)
            const decodeData = await decodeToken(result.token)
            if(queryData.update === undefined){
                //Insert Data to the database
                const model = new UploadCompany(`${queryData.compID}`,decodeData.urlImage)
                await model.insertData()
                return await generateToken({result:'Success'})
            }else{
                //Update Specific Data
                const model = new UploadCompany(`${queryData.compID}`,decodeData.urlImage)
                await model.updateData()
                return await generateToken({result:'Success'})
            }
        case 'GET':
            const data = getQueryParams(req)
            const listing = await selectDB('UploadCompany',`compID='${data.compID}'`)
            return await generateToken({list:listing})
        default: 
            break;
    }
    return 'yes'
}