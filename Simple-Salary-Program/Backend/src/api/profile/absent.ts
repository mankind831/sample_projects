import { IncomingMessage } from 'http'
import _  from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { Absent } from '../../modules/Absent'
import { selectDB } from '../../lib/database/query'

export const absentRequest = async (req: IncomingMessage) => {
    switch (req.method){
        case 'GET':
            const data = getQueryParams(req)
            return await selectDB('Absent',`empID='${data.empID}'`)
        default:
            break;
    }
    return 'yes'
}