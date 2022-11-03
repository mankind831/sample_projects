import { IncomingMessage } from 'http'
import _  from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { selectDB } from '../../lib/database/query'
import { Leave } from '../../modules/Leave'

export const leaveRequest = async (req: IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {dateStarted:string, dateEnded:string, reason:string, status:string}
            const queryData = getQueryParams(req)
            if(queryData.transNo === undefined){
                const model = new Leave(result.dateStarted, result.dateEnded, result.reason, result.status, `${queryData.empID}`)
                //insert data to the database
                console.log({S:model.transNo},{S:model.dateStarted},{S:model.dateEnded},{S:model.reason},{S:model.status},{S:model.empID})
                await model.insertData()
                return 'Successfully Added' 
            }else{
                const model = new Leave(result.dateStarted, result.dateEnded, result.reason, result.status, `${queryData.empID}`, `${queryData.transNo}`)
                //update data to the database
                console.log("Save")
                await model.updateData()
                return 'Successfully Updated'   
            }
        case 'GET':
            const data = getQueryParams(req)
            if(!data?.empID){
                //Retrieve All Data
                return await selectDB('Leave')
            }else{
                if(!data?.transNo){
                    //Retrieve only data with specific empID
                    return await selectDB('Leave',`empID = '${data.empID}'`)
                }else{
                    //Retrieve only data with specific empID and trans
                    return await selectDB('Leave',`transNo='${data.transNo}' AND empID='${data.empID}'`)
                }
            }
        default:
            break;
    }
    return "yes"
}