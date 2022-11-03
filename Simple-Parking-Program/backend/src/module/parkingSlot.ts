import dbFunction from "./dbFunction";

export class ParkingSlot extends dbFunction {
    slot: string;
    gateway:string;
    plateNo:string;
    typeID:string;
    dateTimeIn:string;
    transNo:string;
    status:string;

    constructor(slot:string, gateway:string, plateNo:string, typeID:string,dateTimeIn:string,transNo:string,status:string){
        super()
        this.slot = slot;
        this.gateway = gateway;
        this.plateNo = plateNo;
        this.typeID = typeID;
        this.dateTimeIn = dateTimeIn;
        this.transNo = transNo;
        this.status = status
    }

    tableName(): string {
        return 'ParkingSlot'
    }

    insertItems(): string {
        return "{'slot':?,'gateway':?,'plateNo':?,'vehicleType':?,'dateTimeIn':?,'transNo':?,'status':?}"
    }

    insertParams(): any[] {
        return [{S:this.slot},{S:this.gateway},{S:this.plateNo},{S:this.typeID},{S:this.dateTimeIn},{S:this.transNo},{S:this.status}]
    }

    setData(): string {
        return `plateNo='${this.plateNo}',typeID='${this.typeID}',dateTimeIn='${this.dateTimeIn}',transNo='${this.transNo}',status='${this.status}'`
    }

    fieldName(): string[] {
        return ['slot','gateway']
    }

    fieldValue(): any[] {
        return [this.slot,this.gateway]
    }


}