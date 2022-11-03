import Computation from "../src/modules/Computation";
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"

test("Salary Computation", async () => {
    const empData = await selectDB("Employee",`empID='58104d8-6e40-047a-b2c-cb24d30f6f'`)
    const compData = await selectDB("Company",`compID='${empData[0].compID}'`)
    const leaveData = await selectDB("Leave", `empID='58104d8-6e40-047a-b2c-cb24d30f6f'`)
    const overtimeData = await selectDB("Overtime", `empID='58104d8-6e40-047a-b2c-cb24d30f6f'`)
    const absentData =  await selectDB("Absent", `empID='58104d8-6e40-047a-b2c-cb24d30f6f'`)
    const compu = new Computation()
    expect(compu.generateDailyWage(empData[0])).toBe(160)
    expect(compu.generateRemainingLeave('09','2022',leaveData,compData[0])).toBe(4)
    expect(compu.generateTotalOvertime('09','2022',overtimeData,compData[0])).toBe(24)
    expect(compu.generateTotalAbsences('09','2022',absentData)).toBe(12)
    expect(compu.generateMonthSalary('09','2022',compData[0],empData[0],leaveData,overtimeData,absentData)).toBe(2016)
})