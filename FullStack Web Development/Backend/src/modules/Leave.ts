import uuid from 'react-uuid'
import dbFunction from './dbFunctions';

export class Leave extends dbFunction{
    transNo:string;
    dateStarted:string;
    dateEnded:string;
    reason:string;
    status:string;
    empID:string

    constructor(
        dateStarted:string, dateEnded:string, reason:string, status:string, empID:string, transNo:string|undefined = undefined
    ){
        super()
        this.transNo = transNo === undefined ? uuid() : transNo
        this.dateStarted = dateStarted
        this.dateEnded = dateEnded
        this.reason = reason
        this.status = status
        this.empID = empID
    }

    tableName():string{
        return 'Leave'
    }

    insertItems():string{
        return "{'transNo':?,'dateStarted':?,'dateEnded':?,'reason':?,'status':?,'empID':?}"
    }

    insertParams():any[]{
        return [{S:this.transNo},{S:this.dateStarted},{S:this.dateEnded},{S:this.reason},{S:this.status},{S:this.empID}]
    }

    setData():string{
        return `dateStarted='${this.dateStarted}',dateEnded='${this.dateEnded}',reason='${this.reason}',status='${this.status}'`
    }

    fieldName():string[]{
        return ['transNo','empID']
    }

    fieldValue():any[]{
       return [this.transNo,this.empID]
    }
}