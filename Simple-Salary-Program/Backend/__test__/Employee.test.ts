import Employee from "../src/modules/Employee";
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"

test('new employee model', async () => {
    const model = new Employee('Rodel Ray','Boc','Apprentice Developer','20',"Fulltime","1","1")
    //await model.insertData()
    const  fetchedData = await selectDB('Employee',"accountID='1' AND compID='1'")
    expect(model.fname+" "+model.lname).toBe('Rodel Ray Boc'),
    expect(model.position).toBe("Apprentice Developer")
    expect(model.hourlyRate).toEqual('20')
    expect(model.employmentType).toBe("Fulltime")
    // await expect(model.insertData()).resolves.not.toThrow()
    // await expect(model.updateData()).resolves.not.toThrow()
    expect(fetchedData[0]).toStrictEqual({
        accountID: '1',
        empID: '71eece-8ad-5b2d-b808-aa5d25a7ee5',
        fname: 'Rodel Ray',
        lname: 'Boc',
        jobtitle: 'Apprentice Developer',
        compID: '1',
        employmentType: 'Fulltime',
        hourlyRate: '20'
      })
})