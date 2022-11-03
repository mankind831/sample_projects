//Needed import to run the functions
import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import _, { map } from "lodash";
import { document } from "./document"
import {itemToData   } from "dynamo-converters";

//function to execute SQL statement
export const execute = async (params :any) =>{
  try {
    const valuesResponse = await document.send(new ExecuteStatementCommand(params));
    console.log("Success.");
    return valuesResponse;
  } catch (err) {
    console.error(err);
    throw new Error("Unsuccess");
  }
}

//insert data to the database
export const insertDB = async (tableName: string, statement: string, parameters: any[]) => {
  const params = {
    Statement: `INSERT INTO ${tableName} VALUE ${statement}`,
    Parameters: parameters
  };
  await execute(params)
  return "Successfully Added"
};

//update data from database
export const updateDB = async (tableName:string, statement:string, fieldName:string[] = [], fieldValue:any[]=[]) => {
  var stringFormat:string = ""
  var fields:string =''
  _.each(fieldName, (field,index) => {
    fields = fields + ` ${field}='${fieldValue[index]}' `
    if(index >= 0 && index < (fieldName.length-1)){
      fields = fields + "AND"
    }})
  stringFormat = `UPDATE ${tableName} SET ${statement} WHERE ${fields}`
  const params = {
    Statement: stringFormat
  };
  await execute(params)
  return "Sucessfully Updated"
}

//retrieve data from database
export const selectDB = async (tableName: string, statement: string = '') => {
  const query = statement.length > 0 ? `SELECT * FROM  ${tableName} WHERE ${statement}` : `SELECT * FROM ${tableName}`
  const params = {
    Statement: query,
  };
  const resultList =  await execute(params)
  //console.log(map(resultList.Items, (obj) => (obj)))
  return map(resultList.Items, (obj) => itemToData(obj))
}

//Delete data from database
export const deleteDB = async (tableName:string, statement:string) => {
  const query = `DELETE FROM ${tableName} WHERE ${statement}`
  const params = {
    Statement:query,
  };
  await execute(params)
  return 'Successfully Deleted'
}