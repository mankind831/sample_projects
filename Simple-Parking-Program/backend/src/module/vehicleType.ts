import uuid from "react-uuid";
import dbFunction from "./dbFunction";

export class VehicleType extends dbFunction {
    typeID:string
    vehicleType:string
    price:string

    constructor(vehicleType:string, price:string, typeID:string = ''){
        super()
        this.typeID = typeID != '' ? typeID: uuid()
        this.vehicleType = vehicleType
        this.price = price
    }

    tableName(): string {
        return 'VehicleType'
    }

    insertItems(): string {
        return "{'typeID':?,'vehicleType':?,'price':?}"
    }

    insertParams(): any[] {
        return [{S:this.typeID},{S:this.vehicleType},{S:this.price}]
    }

    setData(): string {
        return `vehicleType='${this.vehicleType}',price='${this.price}'`
    }

    fieldName(): string[] {
        return ['typeID']
    }

    fieldValue(): any[] {
        return [this.typeID]
    }
}