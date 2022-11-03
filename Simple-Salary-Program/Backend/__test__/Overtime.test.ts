import _ from "lodash";
import { Overtime } from "../src/modules/Overtime";
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"

test("Overtime Model", async () =>{
    const model = new Overtime("09/10/2020","06:00:00 PM","08:00:00 PM","Approved","1")
    //await model.insertData()
    const fetchedData = await selectDB('Overtime',"empID='1'")
    expect(model.date).toBeDefined
    expect(model.timeStarted).toBeDefined
    expect(model.timeEnded).toBeDefined
    expect(model.status).toBeDefined
    expect(model.transNo).toBeDefined
    expect(fetchedData[0]).toStrictEqual({
        transNo: '78cd2e6-b4-d625-b8ee-0116a7da7b4c',
        dateAvailed: '09/10/2020',
        timeStarted: '06:00:00 PM',
        timeEnded: '08:00:00 PM',
        status: 'Approved',
        empID: '1'
      })
})