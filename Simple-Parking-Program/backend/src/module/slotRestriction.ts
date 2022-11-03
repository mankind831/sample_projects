import uuid from "react-uuid";
import dbFunction from "./dbFunction";

export class SlotRestriction extends dbFunction {
    slot:string
    restriction:string
    typeID:string

    constructor(slot:string, restriction:string, typeID:string){
        super()
        this.slot = slot
        this.restriction = restriction
        this.typeID = typeID
    }

    tableName(): string {
        return 'SlotRestriction'
    }

    insertItems(): string {
        return "{'slot':?,'restriction':?,'typeID':?}"
    }

    insertParams(): any[] {
        return [{S:this.slot},{S:this.restriction},{S:this.typeID}]
    }

    setData(): string {
        return `restriction='${this.restriction}',typeID='${this.typeID}'`
    }

    fieldName(): string[] {
        return ['slot']
    }

    fieldValue(): any[] {
        return [this.slot]
    }
}