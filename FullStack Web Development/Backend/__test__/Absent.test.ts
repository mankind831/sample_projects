import _ from "lodash";
import { Absent } from "../src/modules/Absent";
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"

test("Absent Model", async () => {
    const model = new Absent("09/01/2020","09/07/2020","Headache","Approved","1")
    //await model.insertData()
    const fetchedData = await selectDB('Absent',"empID='1'")
    console.log(fetchedData[0])
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
        transNo: '0cc0ec6-ced6-7121-00f0-87884c14bda',
        dateEnded: '09/07/2020',
        dateStarted: '09/01/2020',
        status: 'Approved'
      })
})
