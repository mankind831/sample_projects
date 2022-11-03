import uuid from 'react-uuid'
import dbFunction from './dbFunctions';

export class Overtime extends dbFunction {
     transNo:string;
     date:string;
     timeStarted:string;
     timeEnded:string;
     status:string;
     empID:string;
     
    constructor(
         date:string,timeStarted:string,timeEnded:string,status:string, empID:string,transNo:string|undefined = undefined,
    ){
        super()
        this.transNo = transNo === undefined ? uuid() : transNo
        this.date = date
        this.timeStarted = timeStarted
        this.timeEnded = timeEnded
        this.status = status
        this.empID = empID
    }

    tableName():string{
        return 'Overtime'
    }

    insertItems():string{
        return "{'transNo':?,'dateAvailed':?,'timeStarted':?,'timeEnded':?,'status':?,'empID':?}"
    }

    insertParams():any[]{
        return [{S:this.transNo},{S:this.date},{S:this.timeStarted},{S:this.timeEnded},{S:this.status},{S:this.empID}]
    }

    setData():string{
        return `dateAvailed='${this.date}',timeStarted='${this.timeStarted}',timeEnded='${this.timeEnded}',status='${this.status}'`
    }

    fieldName():string[]{
        return ['transNo','empID']
    }

    fieldValue():any[]{
       return [this.transNo,this.empID]
    }
}