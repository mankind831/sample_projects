import Employer from "../src/modules/Employer";
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"

test("Employer Model", async () => {
    const model:Employer = new Employer("1","1")
    //await model.insertData()
    const fetchedData = await selectDB('Employer',"accountID='1' AND compID ='1'")
    expect(model.employerID).toBeDefined
    expect(model.accountID).toBeDefined
    // await expect(model.insertData()).resolves.not.toThrow()
    // await expect(model.updateData()).resolves.not.toThrow()
    expect(fetchedData[0]).toStrictEqual({
        accountID: '1',
        compID: '1',
        employerID: '16068f7-642a-3c81-852-d63f10d8f0f8'
      })
})