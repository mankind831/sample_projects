import { differenceInDays, differenceInMinutes, format, subDays } from "date-fns";
import _ from "lodash";
import uuid from 'react-uuid'
import dbFunction from "./dbFunctions";

export default class Employee extends dbFunction{
    empID:string;
    fname:string;
    lname:string;
    position:string;
    hourlyRate:string;
    employmentType:string;
    accountID: string;
    compID:string;

    constructor(fname:string, lname:string, position:string, hourlyRate:string, employmentType:string, 
        compID:string, accountID:string, empID:string|undefined = undefined){
        super()
        this.empID = empID === undefined ? uuid() : empID
        this.fname = fname
        this.lname = lname
        this.position = position
        this.hourlyRate = hourlyRate
        this.employmentType = employmentType
        this.compID = compID
        this.accountID = accountID
    }

    tableName():string{
        return 'Employee'
    }

    insertItems():string{
        return "{'empID':?,'fname':?,'lname':?,'jobtitle':?,'hourlyRate':?,'employmentType':?,'compID':?,'accountID':?}"
    }

    insertParams():any[]{
        return [{S:this.empID},{S:this.fname},{S:this.lname},{S:this.position},{N:this.hourlyRate},{S:this.employmentType},{S:this.compID},{S:this.accountID}]
    }

    setData():string{
        return `fname='${this.fname}',lname='${this.lname}',hourlyRate='${this.hourlyRate}',employmentType='${this.employmentType}',compID='${this.compID}',jobtitle='${this.position}'`
    }

    fieldName():string[]{
        return ['empID','accountID']
    }

    fieldValue():any[]{
       return [this.empID,this.accountID]
    }
}