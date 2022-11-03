import dbFunction from './dbFunctions';

export class UploadCompany extends dbFunction {
     compID:string;
     urlImage:string;
     
    constructor(compID:string, urlImage:string){
        super()
        this.compID = compID
        this.urlImage = urlImage
    }

    tableName():string{
        return 'UploadCompany'
    }

    insertItems():string{
        return "{'compID':?,'urlImage':?}"
    }

    insertParams():any[]{
        return [{S:this.compID},{S:this.urlImage}]
    }

    setData():string{
        return `urlImage='${this.urlImage}'`
    }

    fieldName():string[]{
        return ['compID']
    }

    fieldValue():any[]{
       return [this.compID]
    }
}