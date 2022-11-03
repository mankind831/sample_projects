import { selectDB } from '../src/lib/database/query'
import {VehicleType } from '../src/module/vehicleType'

test('VehicleType Class',async () =>{
    const module = new VehicleType('Small Vehicle','20')
    expect(module.typeID).toBeDefined
    expect(module.vehicleType).toBeDefined
    expect(module.price).toBeDefined
    const fetchedData = await selectDB(module.tableName(),"typeID='c296ed89-f953-5bd2-c75c-cd93b8124e6a'")
    expect(fetchedData).toStrictEqual( [{
          price: '5000',
          typeID: 'c296ed89-f953-5bd2-c75c-cd93b8124e6a',
          vehicleType: 'Whole Day'
        },])
})