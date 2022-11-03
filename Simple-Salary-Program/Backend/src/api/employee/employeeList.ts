import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { selectDB } from '../../lib/database/query'
import Employee from '../../modules/Employee'
import Computation from '../../modules/Computation'
import { generateToken,decodeToken } from '../../util/config'


export const employeeListRequest = async (req: IncomingMessage) => {
    switch(req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {token:string}
            const fetchedData = await decodeToken(result.token)
            const queryData = getQueryParams(req)
            if(queryData.empID === undefined){
                const model = new Employee(fetchedData.fname, fetchedData.lname, fetchedData.jobtitle, fetchedData.hourlyRate, fetchedData.employmentType, fetchedData.compID, fetchedData.accountID)
                //insert data to the database
                await model.insertData()
                return await generateToken({result:'Success'}) 
            }else{
                const model = new Employee(fetchedData.fname, fetchedData.lname, fetchedData.jobtitle, fetchedData.hourlyRate, fetchedData.employmentType, fetchedData.compID, fetchedData.accountID, `${queryData.empID}`)
                //update data to the database
                await model.updateData()
                return await generateToken({result:'Success'})   
            }
        case 'GET':
            const data = getQueryParams(req)
            if(!data?.column){
                const condition:string = !data?.empID ? (!data?.compID ? `accountID='${data.accountID}'` : `compID='${data.compID}'`) : `empID='${data.empID}'` 
                const listing = await selectDB('Employee',condition)
                return await generateToken({list:listing})
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
                        return await generateToken({list:`${compu.generateDailyWage(empData[0])}`})
                    case 'monthlySalary':
                        return await generateToken({list:`${compu.generateMonthSalary(`${data.month}`,`${data.year}`,compData[0],empData[0],leaveData,overtimeData,absentData)}`})
                    case 'totalAbsent':
                        return await generateToken({list:`${compu.generateTotalAbsences(`${data.month}`,`${data.year}`,absentData)}`})
                    case 'totalOvertime':
                        return await generateToken({list:`${compu.generateTotalOvertime(`${data.month}`,`${data.year}`,overtimeData,compData[0])}`})
                    case 'payableLeave':
                        return await generateToken({list:`${compu.generateRemainingLeave(`${data.month}`,`${data.year}`,leaveData,compData[0])}`})
                    case 'totalLeave':
                        return await generateToken({list:`${compu.generateTotalLeave(`${data.month}`,`${data.year}`,leaveData,compData[0])}`})
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