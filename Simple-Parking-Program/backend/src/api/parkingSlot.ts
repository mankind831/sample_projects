//Needed Import to run the page
import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../util/getParameters'
import { ParkingSlot } from '../module/parkingSlot'
import { Transaction } from '../module/transaction'
import { deleteDB, selectDB, updateDB } from '../lib/database/query'
import { generateToken, decodeToken, checkSlot } from '../../src/util/config'
import {differenceInMinutes, format} from 'date-fns'
import uuid from 'react-uuid'

export const parkingSlotRequest = async (req:IncomingMessage) => {
    const queryData = getQueryParams(req)//retrieve if there is data in the slug or parameters
    switch(req.method){
        case 'POST'://POST method
            const result = await getJSONDataFromRequestStream(req) as {token:string} //retrieve data from frontend
            const decodeData = await decodeToken(result.token)//decode token from front end
            //checks whether the data is for checkin or entry another slot to the table
            if(queryData.checkIn === undefined){
                const parkingSlot = new ParkingSlot(decodeData.slot, decodeData.gateway, '', '', '', '','Vacant')
                await parkingSlot.insertData()
                return await generateToken({result:'success'})
            }else{
                const fetchedData = await selectDB('VehicleType',`vehicleType='${decodeData.vehicleType}'`)//fetched data from VehicleType Data
                //Check whether the client is checkOut and want to checkIn into the same day
                const filteredTransactionData = _.filter(await selectDB('ParkingTransaction',`plateNo='${decodeData.plateNo}'`),
                    obj => format(new Date(obj.dateTimeOut as string),'MM/dd/yyyy') === format(new Date(decodeData.dateTimeIn as string),'MM/dd/yyyy') 
                    && differenceInMinutes(new Date(decodeData.dateTimeIn as string),new Date(obj.dateTimeOut as string)) <= 60)
                var DTIn:string = decodeData.dateTimeIn
                if(filteredTransactionData.length > 0){
                    DTIn = `${filteredTransactionData[0].dateTimeIn}`
                    await updateDB('ParkingTransaction',`totalBill='0'`,['transNo'],[`${filteredTransactionData[0].transNo}`]) 
                }
                const transNo:string = uuid()//generate unique id through react-uuid
                const checkedSlot = await checkSlot(decodeData.vehicleType, decodeData.gateway) //check the available slot or the parking area is full
                if(!checkedSlot?.results){
                    //Create a parkingSlot Class
                    const parkingSlot = new ParkingSlot(
                        checkedSlot.slot, 
                        checkedSlot.gateway, 
                        decodeData.plateNo, 
                        `${fetchedData[0].typeID}`, 
                        `${format(new Date(DTIn),'MM/dd/yyyy p')}`, 
                        transNo,
                        'Occupied')
                    await parkingSlot.updateData()//Update Class data to the database
                    const transaction = new Transaction(transNo,decodeData.plateNo,`${format(new Date(DTIn),'MM/dd/yyyy p')}`,'','0.00')//Create New Transaction Class
                    await transaction.insertData()//Insert Class Data to the database
                    return await generateToken({result:'success'})//return success if the client is successfully checkin
                }else{
                    return await generateToken({result:'full'})//return full if the parking area is full
                }
            }
        case 'GET'://GET Method
            const listing = await selectDB('ParkingSlot') //Retrieve Data from ParkingSlot table
            return await generateToken({list:listing})//Sent data to the front end
        case 'DELETE'://DELETE Method
            await deleteDB('ParkingSlot',`slot='${queryData.slot}' AND gateway='${queryData.gateway}'`)//Delete Data from ParkingSlot Table
            return await generateToken({reuslt:'success'})//Return sucess after delete the data
        default:
            break;//break the switch
    }
    return 'yes'//Return default yes if No other return
}