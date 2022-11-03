//Needed import to run this class
import { insertDB, selectDB, updateDB } from "../lib/database/query"

export default class dbFunction{//Parent Class

    //Create an abstract function for child class
    tableName():string{
        throw new Error('Not Implemented')
    }

    //Create an abstract function for child class
    insertItems():string{
        throw new Error('Not Implemented')
    }

    //Create an abstract function for child class
    insertParams():any[]{
        throw new Error('Not Implemented')
    }

    //Create an abstract function for child class
    setData():string{
        throw new Error('Not Implemented')
    }

    //Create an abstract function for child class
    fieldName():string[]{
        throw new Error('Not Implemented')
    }

    //Create an abstract function for child class
    fieldValue():any[]{
        throw new Error('Not Implemented')
    }

    //Insert data to database base on the data of child class
    public async insertData(){
        try{
            await insertDB(this.tableName(), this.insertItems(), this.insertParams())
        } catch(err) {
            console.error(err)
            throw Error("Unable to save")
        }
    }

    //Update data to database base on the data of child class
    public async updateData(){
        try{
            await updateDB(this.tableName(),this.setData(),this.fieldName(),this.fieldValue())
        }catch(err){
            console.log(err)
            throw Error("Unable to save")
        }
    }

    //Retrieve Data from database
    public async getData():Promise<any>{
        return await selectDB(this.tableName())
    }

    //retreive data from database with parameters
    public async getDataWithCondition(condition:string):Promise<any>{
        return await selectDB(this.tableName(),condition)
    }
}