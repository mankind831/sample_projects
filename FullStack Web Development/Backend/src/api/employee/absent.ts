import { IncomingMessage } from 'http'
import _  from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { Absent } from '../../modules/Absent'
import { deleteDB, selectDB } from '../../lib/database/query'
import { generateToken, decodeToken } from '../../util/config'

export const absentEmpRequest = async (req: IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {token:string}
            const decodedData = await decodeToken(result.token)
            const pathData = getPathParams(req.url as string, '/employer/:empID')
            const queryData = getQueryParams(req)
            if(queryData.transNo === undefined){
                const model = new Absent(decodedData.dateStarted, decodedData.dateEnded, decodedData.reason, decodedData.status, pathData.empID)
                //insert data to the database
                await model.insertData()
                return await generateToken({result:'Success'}) 
            }else{
                const model = new Absent(decodedData.dateStarted, decodedData.dateEnded, decodedData.reason, decodedData.status, pathData.empID, `${queryData.transNo}`)
                //update data to the database
                await model.updateData()
                return await generateToken({result:'Success'})   
            }
        case 'GET':
            const data = getQueryParams(req)
            const path = getPathParams(req.url as string, '/employer/:empID')
            if(!path?.empID){
                //Retrieve All Data
                return await selectDB('Absent')
            }else{
                if(!data?.transNo){
                    //Retrieve only data with specific empID
                    const absentDataArr = await selectDB('Absent',`empID='${path.empID}'`)
                    if(!data?.from && !data?.to){
                        return await generateToken({list:absentDataArr})
                    }else{
                        const filterAbsentData = _.filter(absentDataArr,(absentData) => { return new Date(absentData.dateStarted as string) >= new Date(data.from as string) && new Date(absentData.dateStarted as string) <= new Date(data.to as string)})
                        return await generateToken({list:filterAbsentData})
                    }
                }else{
                    //Retrieve only data with specific empID and trans
                    return await generateToken({list:await selectDB('Absent',`transNo='${data.transNo}' AND empID='${path.empID}'`)})
                }
            }
        case 'DELETE':
            const deleteParams = getQueryParams(req)
            const deletePathParams = getPathParams(req.url as string, '/employer/:empID')
            await deleteDB('Absent',`empID='${deletePathParams.empID}' AND transNo='${deleteParams.transNo}'`)
            return await generateToken({result:'Success'})
        default:
            break;
    }
    return 'yes'
}