import dbFunction from "./dbFunction";

export class Transaction extends dbFunction {
    transNo:string
    plateNo:string
    dateTimeIn:string
    dateTimeOut:string
    totalBill:string

    constructor(transNo:string, plateNo:string, dateTimeIn:string, dateTimeOut:string, totalBill:string){
        super()
        this.transNo = transNo
        this.plateNo = plateNo
        this.dateTimeIn = dateTimeIn
        this.dateTimeOut = dateTimeOut
        this.totalBill = totalBill
    }

    tableName(): string {
        return 'ParkingTransaction'
    }

    insertItems(): string {
        return "{'transNo':?,'plateNo':?,'dateTimeIn':?,'dateTimeOut':?,'totalBill':?}"
    }

    insertParams(): any[] {
        return [{S:this.transNo},{S:this.plateNo},{S:this.dateTimeIn},{S:this.dateTimeOut},{S:this.totalBill}]
    }

    setData(): string {
        return `plateNo='${this.plateNo}',dateTimeIn='${this.dateTimeIn}',dateTimeOut='${this.dateTimeOut}',totalBill='${this.totalBill}'`
    }

    fieldName(): string[] {
        return ['transNo']
    }

    fieldValue(): any[] {
        return [this.transNo]
    }
}