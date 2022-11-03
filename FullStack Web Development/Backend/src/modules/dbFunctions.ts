import { insertDB, selectDB, updateDB } from "../lib/database/query"

export default class dbFunction{

    tableName():string{
        throw new Error('Not Implemented')
    }

    insertItems():string{
        throw new Error('Not Implemented')
    }

    insertParams():any[]{
        throw new Error('Not Implemented')
    }

    setData():string{
        throw new Error('Not Implemented')
    }

    fieldName():string[]{
        throw new Error('Not Implemented')
    }

    fieldValue():any[]{
        throw new Error('Not Implemented')
    }

    public async insertData(){
        try{
            await insertDB(this.tableName(), this.insertItems(), this.insertParams())
        } catch(err) {
            console.error(err)
            throw Error("Unable to save")
        }
    }

    public async updateData(){
        try{
            await updateDB(this.tableName(),this.setData(),this.fieldName(),this.fieldValue())
        }catch(err){
            console.log(err)
            throw Error("Unable to save")
        }
    }

    public async getData():Promise<any>{
        return await selectDB(this.tableName())
    }

    public async getDataWithCondition(condition:string):Promise<any>{
        return await selectDB(this.tableName(),condition)
    }
}