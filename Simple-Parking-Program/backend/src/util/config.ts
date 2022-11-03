//Need imports to run this functions
import * as jose from 'jose'
import _ from 'lodash'
import { selectDB } from '../lib/database/query'
import {differenceInMinutes} from 'date-fns'
require('dotenv').config()

//Generate Token
export const generateToken = async (bodyData:{}):Promise<any> => {
    const token = await new jose.SignJWT({ data: bodyData })
        .setProtectedHeader({alg:'HS256', typ:'JWT'})
        .setIssuedAt()
        .setIssuer('lemondrop')
        .setAudience('mankind')
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET))
    return token
}

//Decode token
export const decodeToken = async (token:string):Promise<any> => {
    const { payload, protectedHeader} = await jose.jwtVerify(token,new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET),{
        issuer:'lemondrop',
        audience:'mankind'
    })
    return payload.data
}

//Check availability of Parking Slot
export const checkSlot = async (vehicleType:string,gateway:string):Promise<any> =>{
    const slotsData = _.sortBy(await selectDB('ParkingSlot'),['gateway','slot'])//retrieve all data on the parking slot
    var arrSlot = Array(9).fill(null).map(() => Array(10)) //Create a mutlidimension Array
    var index = 0;
    for(var i=0; i<9; i++){//Slice list to multiple array
        for(var j=0; j<10; j++){
            arrSlot[i][j] = slotsData[index]
            index++
        }
    }

    var loopVal = true
    var gateWayValue = gateway
    var gateValue, slotValue = ''
    var counter = 0

    //Check where to park the car
    while(loopVal){
        if(gateWayValue === 'A'){//Check if the gateway of client is within A
            if(vehicleType === 'Small Vehicle'){//Check if the size of the vehicle is small
                if(_.filter(arrSlot[0],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[0],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[0],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else if(_.filter(arrSlot[1],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[1],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[1],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else if(_.filter(arrSlot[2],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[2],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[2],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else{
                    gateWayValue = 'B'//gateway change if the parkingslot A is fullybooked
                    counter++//counter checking if the parkingslot A is fullyBooked
                }
            }else if(vehicleType === 'Medium Vehicle'){//Check if the size of the vehicle is medium
                if(_.filter(arrSlot[1],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[1],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[1],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else if(_.filter(arrSlot[2],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[2],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[2],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else{
                    gateWayValue = 'B'//gateway change if the parkingslot A is fullybooked
                    counter++//counter checking if the parkingslot A is fullyBooked
                }
            }else if(vehicleType === 'Large Vehicle'){//Check if the size of the vehicle is large
                if(_.filter(arrSlot[2],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[2],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[2],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else{
                    gateWayValue = 'B'//gateway change if the parkingslot A is fullybooked
                    counter++//counter checking if the parkingslot A is fullyBooked
                }
            }
        }else if(gateWayValue === 'B'){//Check if the gateway of client is within B
            if(vehicleType === 'Small Vehicle'){//Check if the size of the vehicle is small
                if(_.filter(arrSlot[3],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[3],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[3],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else if(_.filter(arrSlot[4],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[4],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[4],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else if(_.filter(arrSlot[5],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[5],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[5],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else{
                    gateWayValue = 'C'//gateway change if the parkingslot B is fullybooked
                    counter++//counter checking if the parkingslot B is fullyBooked
                }
            }else if(vehicleType === 'Medium Vehicle'){//Check if the size of the vehicle is medium
                if(_.filter(arrSlot[4],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[4],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[4],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else if(_.filter(arrSlot[5],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[5],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[5],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else{
                    gateWayValue = 'C'//gateway change if the parkingslot B is fullybooked
                    counter++//counter checking if the parkingslot B is fullyBooked
                }
            }else if(vehicleType === 'Large Vehicle'){//Check if the size of the vehicle is large
                if(_.filter(arrSlot[5],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[5],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[5],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else{
                    gateWayValue = 'C'//gateway change if the parkingslot B is fullybooked
                    counter++//counter checking if the parkingslot B is fullyBooked
                }
            }
        }else if(gateWayValue === 'C'){//Check if the gateway of client is within B
            if(vehicleType === 'Small Vehicle'){//Check if the size of the vehicle is small
                if(_.filter(arrSlot[6],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[6],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[6],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else if(_.filter(arrSlot[7],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[7],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[7],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else if(_.filter(arrSlot[8],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[8],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[8],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else{
                    gateWayValue = 'A'//gateway change if the parkingslot C is fullybooked
                    counter++//counter checking if the parkingslot B is fullyBooked
                }
            }else if(vehicleType === 'Medium Vehicle'){//Check if the size of the vehicle is medium
                if(_.filter(arrSlot[7],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[7],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[7],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else if(_.filter(arrSlot[8],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[8],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[8],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else{
                    gateWayValue = 'A'//gateway change if the parkingslot C is fullybooked
                    counter++//counter checking if the parkingslot B is fullyBooked
                }
            }else if(vehicleType === 'Large Vehicle'){//Check if the size of the vehicle is medium
                if(_.filter(arrSlot[8],{status:'Occupied'}).length < 10){//check if the slots are fully occupied or vacant
                    gateValue = _.filter(arrSlot[8],{status:'Vacant'})[0].gateway
                    slotValue = _.filter(arrSlot[8],{status:'Vacant'})[0].slot
                    loopVal = false//to break the loop
                }else{
                    gateWayValue = 'A'//gateway change if the parkingslot C is fullybooked
                    counter++//counter checking if the parkingslot B is fullyBooked
                }
            }
        }

        if(counter === 3){//Checks if the counter is equal to 3 it means the parking area is fullybooked
            loopVal = false//to break the loop
        }
    }

    if(gateValue !== '' && slotValue !=''){//Checks if the data in the variable is not empty 
        return {gateway:gateValue,slot:slotValue}//return variable with data
    }

    return {results:'Fully Book'}//return if the parkingarea is fullybook
}

export const computeBill = async (vehicleType:string,dateTimeIn:string,dateTimeOut:string):Promise<string> => {
    const totalTime = Math.round(differenceInMinutes(new Date(dateTimeOut),new Date(dateTimeIn))/60)//Compute time difference from datetimeCheckIn and datetiemCheckOut rounded to hours
    const typePrice = await selectDB('VehicleType')//retrieve data from VehicleType
    if(totalTime <= 3){//Checks if totaltime is equal or less than 3 hours
        const totalBill = _.filter(typePrice,{'vehicleType':'Default'})[0].price //totalbill equals to default price for equal or less than 3 hours
        return `${totalBill}` //return total bill
    }else if(totalTime > 3 && totalTime < 24){//Checks if total time is more than 3 hours but equal or less than 24 hours
        const rate = _.filter(typePrice,{'vehicleType':vehicleType})[0].price//retrieve rate base on the vehicle type
        const defaultRate = _.filter(typePrice,{'vehicleType':'Default'})[0].price//retrieve the default rate
        const totalBill = ((totalTime - 3) * parseInt(rate as string)) + parseInt(defaultRate as string)//compute total bill from total time
        return `${totalBill}`//return total bill
    }else if(totalTime >= 24){//Checks if total time is equal or morethan 24 hours
        const rate = _.filter(typePrice,{'vehicleType':vehicleType})[0].price//retrieve rate base on the vehicle type
        const defaultRate = _.filter(typePrice,{'vehicleType':'Whole Day'})[0].price//retrieve rate of whole day
        const totalBill = ((totalTime - 24) * parseInt(rate as string)) + parseInt(defaultRate as string)//compute total bill from total time
        return `${totalBill}`//return total bill
    }
    return '0.00'//return default 0.00 if no other data to be return
}