import dbFunction from './dbFunctions';

export class UploadEmployee extends dbFunction {
     empID:string;
     urlImage:string;
     
    constructor(empID:string, urlImage:string){
        super()
        this.empID = empID
        this.urlImage = urlImage
    }

    tableName():string{
        return 'UploadEmployee'
    }

    insertItems():string{
        return "{'empID':?,'urlImage':?}"
    }

    insertParams():any[]{
        return [{S:this.empID},{S:this.urlImage}]
    }

    setData():string{
        return `urlImage='${this.urlImage}'`
    }

    fieldName():string[]{
        return ['empID']
    }

    fieldValue():any[]{
       return [this.empID]
    }
}