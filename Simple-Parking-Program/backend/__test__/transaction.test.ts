import { selectDB } from '../src/lib/database/query'
import { Transaction } from '../src/module/transaction'

test('Transaction Class',async () =>{
    const module = new Transaction('','','','','')
    expect(module.transNo).toBeDefined
    expect(module.dateTimeIn).toBeDefined
    expect(module.dateTimeOut).toBeDefined
    expect(module.plateNo).toBeDefined
    expect(module.totalBill).toBeDefined
    const fetchedData = await selectDB(module.tableName(),"transNo='19f73f54-0cd0-e659-22f6-80bbfa684a91'")
    expect(fetchedData).toStrictEqual([{dateTimeOut: '11/02/2022 10:18 PM',totalBill: '440',transNo: '19f73f54-0cd0-e659-22f6-80bbfa684a91',
        plateNo: 'SDAS-2392',dateTimeIn: '11/02/2022 3:11 PM'},])
})