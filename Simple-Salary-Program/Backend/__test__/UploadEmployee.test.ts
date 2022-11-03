import _ from "lodash";
import { UploadEmployee } from "../src/modules/UploadEmployee";
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"

test("UploadEmployee Model", async () =>{
    const model = new UploadEmployee("1","urlImage.com")
    //await model.insertData()
    const fetchedData = await selectDB('UploadEmployee',"empID='1'")
    expect(model.empID).toBeDefined
    expect(model.urlImage).toBeDefined
    expect(fetchedData[0]).toStrictEqual({empID:'1',urlImage:"urlImage.com"})
    // await expect(model.insertData()).resolves.not.toThrow()
    // await expect(model.updateData()).resolves.not.toThrow()
})