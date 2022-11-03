//Needed Import to run the page
import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../util/getParameters'
import { deleteDB, selectDB } from '../lib/database/query'
import { VehicleType } from '../module/vehicleType'
import { generateToken,decodeToken } from '../../src/util/config'

export const vehicleTypeRequest = async (req:IncomingMessage) => {
    const queryData = getQueryParams(req)//retrieve if there is data in the slug or parameters
    switch(req.method){
        case 'POST'://POST Method
            const result = await getJSONDataFromRequestStream(req) as {token:string}//retrieve data from frontend
            const decodeData = await decodeToken(result.token)//decode token from front end
            //Checks if the data for update or insert new
            if(queryData.typeID === undefined){
                const vehicleType = new VehicleType(decodeData.vehicleType,decodeData.price)//Create VehicleType Class
                await vehicleType.insertData()//Insert New Data to the database
                return await generateToken({result:'success'})//Return success
            }else{
                const vehicleType = new VehicleType(decodeData.vehicleType,decodeData.price,`${queryData.id}`)//Create VehicleType Class with typeID
                await vehicleType.updateData()//Insert New Data to the database
                return await generateToken({result:'success'})//Return success
            }
        case 'GET'://GET Method
            const listing = await selectDB('VehicleType')//Retrieve Data from Vehicle Type table
            return await generateToken({list:listing})//forward generatedtoken from retrieved data to front end
        case 'DELETE':
            await deleteDB('VehicleType',`typeID='${queryData.typeID}'`)//Delete data to the database
            return await generateToken({result:'success'})//return sucess if action is complete
        default:
            break;
    }
    return 'yes'
}