import _ from "lodash";
import Company from "../src/modules/Company";
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"

test("Company Model", async () => {
    const model = new Company("Lemondrop","Metro Manila","10","20")
    // await model.insertData()
    const fetchedData = await selectDB('Company',"name='Lemondrop'")
    // console.log(fetchedData[0])
    expect(model.name).toBeDefined
    expect(model.monthlyLeave).toBeDefined
    expect(model.monthlyOvertime).toBeDefined
    // await expect(model.insertData()).resolves.not.toThrow()
    // await expect(model.updateData()).resolves.not.toThrow()
    expect(fetchedData[0]).toStrictEqual({
        name: 'Lemondrop',
        address: 'Metro Manila',
        monthlyLeave: '10',
        compID: '8d7ab3-08a8-0bde-33b0-d42882fa2f6',
        monthlyOvertime: '20'
      })
})
