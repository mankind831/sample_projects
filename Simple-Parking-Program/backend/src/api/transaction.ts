//Needed Import to run the page
import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../util/getParameters'
import { ParkingSlot } from '../module/parkingSlot'
import { Transaction } from '../module/transaction'
import { selectDB } from '../lib/database/query'
import { generateToken, decodeToken, computeBill } from '../../src/util/config'

export const parkingTransactionRequest = async (req:IncomingMessage) => {
    const queryData = getQueryParams(req) //retrieve if there is data in the slug or parameters
    switch(req.method){
        case 'POST'://POST METHOD
               const result = await getJSONDataFromRequestStream(req) as {token:string}//retrieve data from frontend
               const decodeData = await decodeToken(result.token)//decode token
               const fetchedType = await selectDB('VehicleType',`typeID='${decodeData.typeID}'`)//Fetched vehicle type base on typeID
               const totalBilled = await computeBill(`${fetchedType[0].vehicleType}`,decodeData.dateTimeIn,decodeData.dateTimeOut)//Calculate Total Bill
               const transaction = new Transaction(decodeData.transNo, decodeData.plateNo,decodeData.dateTimeIn,decodeData.dateTimeOut,totalBilled)//Create a ParkingTransaction Class
               await transaction.updateData()//Update the transaction with dateTimeOut and totalBill
               const parkingSlot = new ParkingSlot(decodeData.slot, decodeData.gateway, '', '', '', '', 'Vacant')//Create a ParkingSlot Class
               await parkingSlot.updateData()//Update the slot to vacant after client checkout
               return await generateToken({result:'success',totalBill:totalBilled})//Return Success and totalBill after a success transaction
        case 'GET'://GET Method
            const listing = await selectDB('ParkingTransaction')//Fetched Data from ParkingTransaction Table
            return await generateToken({list:listing})//Sent Data to Frontend
        default:
            break;
    }
    return 'yes'
}