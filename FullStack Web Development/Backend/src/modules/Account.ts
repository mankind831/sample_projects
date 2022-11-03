import uuid from 'react-uuid'
import dbFunction from './dbFunctions'

export default class Account extends dbFunction{
    accountID:string
    fname:string
    lname:string
    email:string
    password:string
    role:string
    
    constructor(
       fname:string,lname:string,email:string,password:string,role:string, accountID:string|undefined = undefined
    ){
        super()
        this.accountID = accountID === undefined ? uuid() : accountID
        this.fname = fname
        this.lname = lname
        this.email = email
        this.password = password
        this.role = role
    }

    checkEmailandPassword(email:string, password:string):boolean{
        if(this.email === email && this.password === password){
            return true
        }
        return false
    }

    tableName():string{
        return 'Account'
    }

    insertItems():string{
        return "{'accountID':?,'fname':?,'lname':?,'email':?,'password':?,'role':?}"
    }

    insertParams():any[]{
        return [{S:this.accountID},{S:this.fname},{S:this.lname},{S:this.email},{S:this.password},{S:this.role}]
    }

    setData():string{
        return `fname='${this.fname}',lname='${this.lname}',password='${this.password}',role='${this.role}'`
    }

    fieldName():string[]{
        return ['accountID','email']
    }

    fieldValue():any[]{
       return [this.accountID,this.email]
    }
}