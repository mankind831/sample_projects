import { IncomingMessage } from 'http'
import _  from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { selectDB } from '../../lib/database/query'
import Employee from '../../modules/Employee'
import Computation from '../../modules/Computation'

export const profileRequest = async (req: IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {fname:string,lname:string,jobtitle:string,accountID:string,houlyRate:string,employmentType:string,compID:string}
            const queryData = getQueryParams(req)
            const model = new Employee(result.fname,result.lname,result.jobtitle,result.houlyRate,result.employmentType,result.compID,result.accountID)
            model.updateData()
            return "Successfully Updated"
        case 'GET':
            const data = getQueryParams(req)
            if(!data?.column){
                return await selectDB("Employee",`empID='${data.empID}'`)
            }else{
                const empData = await selectDB("Employee",`empID='${data.empID}'`)
                const compData = await selectDB("Company",`compID='${empData[0].compID}'`)
                const leaveData = await selectDB("Leave", `empID='${data.empID}'`)
                const overtimeData = await selectDB("Overtime", `empID='${data.empID}'`)
                const absentData =  await selectDB("Absent", `empID='${data.empID}'`)
                const compu = new Computation()
                var value:number=0
                switch(data.column){
                    case 'dailyWage':
                        return compu.generateDailyWage(empData[0])
                    case 'monthlySalary':
                        return compu.generateMonthSalary(`${data.month}`,`${data.year}`,compData[0],empData[0],leaveData,overtimeData,absentData)
                    case 'totalAbsent':
                        return compu.generateTotalAbsences(`${data.month}`,`${data.year}`,absentData)
                    case 'totalOvertime':
                        return compu.generateTotalOvertime(`${data.month}`,`${data.year}`,overtimeData,compData[0])
                    case 'totalLeave':
                        return compu.generateRemainingLeave(`${data.month}`,`${data.year}`,leaveData,compData[0])
                    default:
                        break;
                }
                return value
            }
        default:
            break;
    }
    return 'yes'
}