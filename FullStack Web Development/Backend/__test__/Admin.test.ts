import Admin from "../src/modules/Admin";
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"

test("Admin Model", async () => {
    const model = new Admin("1")
    //await model.insertData()
    const fetchedData = await selectDB('Admin',"accountID='1'")
    // console.log(fetchedData[0])
    expect(model.adminID).toBeDefined
    // await expect(model.insertData()).resolves.not.toThrow()
    // await expect(model.updateData()).resolves.not.toThrow()
    expect(fetchedData[0]).toStrictEqual({ adminID: 'b6b5267-8073-4d84-8211-1bd6661a72f', accountID: '1' })
})