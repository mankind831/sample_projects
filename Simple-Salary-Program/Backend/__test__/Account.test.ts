import _ from 'lodash'
import Account from '../src/modules/Account'
import { insertDB, selectDB, updateDB } from "../src/lib/database/query"

test("Account Model", async () => {
    const model = new Account("Rodel Ray", "Boc", "rodel.boc@gmail.com", "password", "Administrator")
    //await model.insertData()
    const fetchedData = await selectDB('Account',"email='rodel.boc@gmail.com'")
    //console.log(fetchedData[0])
    expect(model.fname).toBeDefined
    expect(model.lname).toBeDefined
    expect(model.email).toBeDefined
    expect(model.password).toBeDefined
    expect(model.role).toBeDefined
    expect(model.checkEmailandPassword("rodel.boc@gmail.com","password")).toBe(true)
    expect(model.checkEmailandPassword("admin@admin.com","admin")).toBe(false)
    // await expect(model.insertData()).resolves.not.toThrow()
    // await expect(model.updateData()).resolves.not.toThrow()
    expect(fetchedData[0]).toStrictEqual({
        accountID: 'e167060-0fdf-63d0-0d5e-d267f77661a3',
        fname: 'Rodel Ray',
        lname: 'Boc',
        password: 'password',
        role: 'Administrator',
        email: 'rodel.boc@gmail.com'
      })
})

