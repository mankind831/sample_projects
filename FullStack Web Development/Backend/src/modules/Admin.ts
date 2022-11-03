import uuid from 'react-uuid'
import dbFunction from './dbFunctions';

export default class Admin extends dbFunction{
    adminID:string;
    accounID:string;
    constructor(
        accountID:string, 
        adminID:string|undefined = undefined
    ){
        super()
        this.adminID = adminID === undefined ? uuid() : adminID
        this.accounID = accountID
    }

    tableName():string{
        return 'Admin'
    }

    insertItems():string{
        return "{'adminID':?,'accountID':?}"
    }

    insertParams():any[]{
        return [{S:this.adminID},{S:this.accounID}]
    }

    setData():string{
        return `accountID='${this.accounID}'`
    }

    fieldName():string[]{
        return ['adminID']
    }

    fieldValue():any[]{
       return [this.adminID]
    }
}