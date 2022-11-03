import uuid from 'react-uuid'
import dbFunction from './dbFunctions';

export default class Company extends dbFunction{
    compID:string;
    name:string;
    address:string;
    monthlyLeave:string;
    monthlyOvertime:string;
    constructor(name:string, address:string, monthlyLeave:string, monthlyOvertime:string, compID:string|undefined = undefined,){
        super()
        this.compID = compID === undefined ? uuid() : compID
        this.name = name
        this.address = address
        this.monthlyLeave = monthlyLeave
        this.monthlyOvertime = monthlyOvertime
    }

    tableName():string{
        return 'Company'
    }

    insertItems():string{
        return "{'compID':?,'name':?,'address':?,'monthlyLeave':?,'monthlyOvertime':?}"
    }

    insertParams():any[]{
        return [{S:this.compID},{S:this.name},{S:this.address},{S:this.monthlyLeave},{S:this.monthlyOvertime}]
    }

    setData():string{
        return `name='${this.name}',address='${this.address}',monthlyLeave='${this.monthlyLeave}',monthlyOvertime='${this.monthlyOvertime}'`
    }

    fieldName():string[]{
        return ['compID']
    }

    fieldValue():any[]{
       return [this.compID]
    }

}