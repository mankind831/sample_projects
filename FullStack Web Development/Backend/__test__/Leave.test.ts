import _ from "lodash";
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"
import { Leave } from "../src/modules/Leave";

test("Leave Model", async () =>{
    const model = new Leave("09/01/2020","09/07/2020","Headache","Pending","1")
    //await model.insertData()
    const fetchedData = await selectDB('Leave',"empID='1'")
    //console.log(fetchedData[0])
    expect(model.dateStarted).toBeDefined
    expect(model.dateEnded).toBeDefined
    expect(model.reason).toBeDefined
    expect(model.status).toBeDefined
    expect(model.transNo).toBeDefined
    // await expect(model.insertData()).resolves.not.toThrow()
    // await expect(model.updateData()).resolves.not.toThrow()
    expect(fetchedData[0]).toStrictEqual({
        empID: '1',
        reason: 'Headache',
        transNo: '54f3867-78a6-2d5f-315-f4ecbfdfd32',
        dateEnded: '09/07/2020',
        dateStarted: '09/01/2020',
        status: 'Pending'
      })
})