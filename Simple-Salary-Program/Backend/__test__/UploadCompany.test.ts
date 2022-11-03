import { UploadCompany } from "../src/modules/UploadCompany";
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"

test("UploadCompany Model", async () =>{
    const model = new UploadCompany("1","urlImage.com")
    //await model.insertData()
    const fetchedData = await selectDB('UploadCompany',"compID='1'")
    expect(model.compID).toBeDefined
    expect(model.urlImage).toBeDefined
    expect(fetchedData[0]).toStrictEqual({compID:'1',urlImage:"urlImage.com"})
    // await expect(model.insertData()).resolves.not.toThrow()
    // await expect(model.updateData()).resolves.not.toThrow()
})