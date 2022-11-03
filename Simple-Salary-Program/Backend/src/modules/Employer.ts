import _ from 'lodash';
import uuid from 'react-uuid'
import dbFunction from './dbFunctions';

export default class Employer extends dbFunction{
    employerID:string;
    accountID:string;
    compID:string;
    constructor(accountID:string, compID:string,
      employerID:string|undefined = undefined){
        super()
        this.employerID = employerID === undefined ? uuid() : employerID
        this.accountID = accountID
        this.compID = compID
    }

    tableName():string{
      return 'Employer'
    }

    insertItems():string{
        return "{'employerID':?,'accountID':?,'compID':?}"
    }

    insertParams():any[]{
        return [{S:this.employerID},{S:this.accountID},{S:this.compID}]
    }

    setData():string{
        return `accountID='${this.accountID}',compID='${this.compID}'`
    }

    fieldName():string[]{
        return ['employerID']
    }

    fieldValue():any[]{
      return [this.employerID]
    }
}