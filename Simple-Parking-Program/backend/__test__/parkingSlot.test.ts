import { selectDB } from '../src/lib/database/query'
import { ParkingSlot } from '../src/module/parkingSlot'

test('VehicleType Class',async () =>{
    const module = new ParkingSlot('01','A','','','','','Vacant')
    expect(module.slot).toBeDefined
    expect(module.dateTimeIn).toBeDefined
    expect(module.gateway).toBeDefined
    expect(module.plateNo).toBeDefined
    expect(module.typeID).toBeDefined
    expect(module.dateTimeIn).toBeDefined
    expect(module.transNo).toBeDefined
    expect(module.status).toBeDefined
    const fetchedData = await selectDB(module.tableName(),"slot='25' AND gateway='A'")
    expect(fetchedData).toStrictEqual([{plateNo: '',slot: '25',transNo: '',dateTimeIn: '',gateway: 'A',vehicleType: '',status: 'Vacant'}])
})