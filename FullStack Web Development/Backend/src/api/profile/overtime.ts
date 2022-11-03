import { IncomingMessage } from 'http'
import _  from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { selectDB } from '../../lib/database/query'
import { Overtime } from '../../modules/Overtime'

export const overtimeRequest = async (req: IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {dateAvailed:string, timeStarted:string, timeEnded:string, status:string}
            const queryData = getQueryParams(req)
            if(queryData.transNo === undefined){
                const model = new Overtime(result.dateAvailed,result.timeStarted, result.timeEnded, result.status, `${queryData.empID}`)
                //insert data to the database
                await model.insertData()
                return 'Successfully Added' 
            }else{
                const model = new Overtime(result.dateAvailed,result.timeStarted, result.timeEnded, result.status, `${queryData.empID}`, `${queryData.transNo}`)
                //update data to the database
                await model.updateData()
                return 'Successfully Updated'   
            }
        case 'GET':
            const data = getQueryParams(req)
            if(!data?.empID){
                //Retrieve All Data
                return await selectDB('Overtime')
            }else{
                if(!data?.transNo){
                    //Retrieve only data with specific empID
                    return await selectDB('Overtime',`empID = '${data.empID}'`)
                }else{
                    //Retrieve only data with specific empID and trans
                    return await selectDB('Overtime',`transNo='${data.transNo}' AND empID='${data.empID}'`)
                }
            }
        default:
            break;
    }
    return 'yes'
}