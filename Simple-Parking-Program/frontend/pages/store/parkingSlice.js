import { createSlice } from '@reduxjs/toolkit'
import parkingA from '../files/parkingA.json'
import parkingB from '../files/parkingB.json'
import parkingC from '../files/parkingC.json'
import _ from 'lodash'
import { format, differenceInMinutes } from 'date-fns'
import { Co2Sharp } from '@mui/icons-material'


export const parkingSlice  = createSlice({
    name:'parkingData',
    initialState:{
        parkingA: parkingA,
        parkingB: parkingB,
        parkingC: parkingC,
        vehicleData: [],
        vehicleSize: ['Small Vehicle', 'Medium Vehicle', 'Large Vehicle'],
        parkingAreaFull:"0" 
    },
    reducers: {
        //Check-In Vehicle
        checkInVehicle: (state, action) => {
            //Checking whether if the client have been Check-In and Check-Out between Same Day with less than 1 hour from the time of check out
            const filteredData = _.filter(state.vehicleData,
                (vehicle) => vehicle.plateNo === action.payload.vehicleCheckIn.vehiclePlate
                && format(new Date(vehicle.datetimeIn),"MM/dd/yyyy") === format(new Date(action.payload.vehicleCheckIn.dateTime),"MM/dd/yyyy") && differenceInMinutes(new Date(action.payload.vehicleCheckIn.dateTime),new Date(vehicle.datetimeOut)) <= 60)
            console.log(action.payload.vehicleCheckIn,filteredData)
            if(filteredData.length > 0){
                action.payload.vehicleCheckIn.dateTime = filteredData[0].datetimeIn
            }

            //To Check-In Vehicle depending on its vehicle type
            if(action.payload.size === "Small Vehicle"){
                if(_.filter(state.parkingA,{status:'Occupied'}).length < 10){
                    action.payload.vehicleCheckIn.slot = state.parkingA[_.findIndex(state.parkingA,{status:'Vacant'})].slot
                    state.parkingA[_.findIndex(state.parkingA,{status:'Vacant'})] = action.payload.vehicleCheckIn
                }else if(_.filter(state.parkingB,{status:'Occupied'}).length < 10){
                    action.payload.vehicleCheckIn.slot = state.parkingB[_.findIndex(state.parkingB,{status:'Vacant'})].slot
                    state.parkingB[_.findIndex(state.parkingB,{status:'Vacant'})] = action.payload.vehicleCheckIn
                }else if(_.filter(state.parkingC,{status:'Occupied'}).length < 10){
                    action.payload.vehicleCheckIn.slot = state.parkingC[_.findIndex(state.parkingC,{status:'Vacant'})].slot
                    state.parkingC[_.findIndex(state.parkingC,{status:'Vacant'})] = action.payload.vehicleCheckIn
                }else{
                    state.parkingAreaFull = "1"
                }
            }else if(action.payload.size === 'Medium Vehicle'){
                if(_.filter(state.parkingB,{status:'Occupied'}).length < 10){
                    action.payload.vehicleCheckIn.slot = state.parkingB[_.findIndex(state.parkingB,{status:'Vacant'})].slot
                    state.parkingB[_.findIndex(state.parkingB,{status:'Vacant'})] = action.payload.vehicleCheckIn
                }else if(_.filter(state.parkingC,{status:'Occupied'}).length < 10){
                    action.payload.vehicleCheckIn.slot = state.parkingC[_.findIndex(state.parkingC,{status:'Vacant'})].slot
                    state.parkingC[_.findIndex(state.parkingC,{status:'Vacant'})] = action.payload.vehicleCheckIn
                }else{
                    state.parkingAreaFull = "1"
                }
            }else if(action.payload.size === 'Large Vehicle'){
                if(_.filter(state.parkingC,{status:'Occupied'}).length < 10){
                    action.payload.vehicleCheckIn.slot = state.parkingC[_.findIndex(state.parkingC,{status:'Vacant'})].slot
                    state.parkingC[_.findIndex(state.parkingC,{status:'Vacant'})] = action.payload.vehicleCheckIn
                }else{
                    state.parkingAreaFull = "1"
                }
            }
        },
        //Add Transaction
        addTransaction: (state, action) =>{
            //Checking whether if the client have been Check-In and Check-Out between Same Day with less than 1 hour from the time of check out
            const filteredData = _.filter(state.vehicleData,
                (vehicle) => vehicle.plateNo === action.payload.plateNo 
                && format(new Date(vehicle.datetimeIn),"MM/dd/yyyy") === format(new Date(action.payload.datetimeIn),"MM/dd/yyyy") && differenceInMinutes(new Date(action.payload.datetimeIn),new Date(vehicle.datetimeOut)) <= 60)
            if(filteredData.length > 0){
                action.payload.datetimeIn = filteredData[0].datetimeIn
                state.vehicleData[_.findIndex(state.vehicleData,(vehicle) => vehicle.plateNo === action.payload.plateNo 
                    && format(new Date(vehicle.datetimeIn),"MM/dd/yyyy") === format(new Date(action.payload.datetimeIn),"MM/dd/yyyy"))].totalBill = 0
            }

            state.vehicleData.push(action.payload)
        },
        //Check-out Vehicle
        checkOutVehicle: (state,action) => {
            const emptyLot = {
                slot:action.payload.slot,
                status:"Vacant",
                vehicleSize:"",
                vehiclePlate:"",
                dateTime:"",
                transNo:""
            }
            if(action.payload.parkArea === "A"){
                state.parkingA[parseInt(action.payload.slot) - 1] = emptyLot
            }else if(action.payload.parkArea === "B") {
                state.parkingB[parseInt(action.payload.slot - 1)] = emptyLot
            }else if(action.payload.parkArea === "C") {
                state.parkingC[parseInt(action.payload.slot - 1)] = emptyLot
            }
        },
        //Compute Total Bill
        computeTotalBill: (state, action) => {
            const totalTime = Math.round(differenceInMinutes(new Date(action.payload.datetimeOut), 
                new Date(state.vehicleData[_.findIndex(state.vehicleData,{"transID":action.payload.transNo})].datetimeIn))/60)
            var rate = 0
            if(totalTime <= 3){
                state.vehicleData[_.findIndex(state.vehicleData,{"transID":action.payload.transNo})].datetimeOut = action.payload.datetimeOut
                state.vehicleData[_.findIndex(state.vehicleData,{"transID":action.payload.transNo})].totalBill = "40"
            }else if(totalTime > 3 && totalTime < 24){
                rate = action.payload.parkArea === "A" ? 20 : (action.payload.parkArea === "B" ? 60 : 100)
                state.vehicleData[_.findIndex(state.vehicleData,{"transID":action.payload.transNo})].datetimeOut = action.payload.datetimeOut
                state.vehicleData[_.findIndex(state.vehicleData,{"transID":action.payload.transNo})].totalBill = "" + (((totalTime - 3) * rate) + 40)
            }else{
                rate = action.payload.parkArea === "A" ? 20 : (action.payload.parkArea === "B" ? 60 : 100)
                state.vehicleData[_.findIndex(state.vehicleData,{"transID":action.payload.transNo})].datetimeOut = action.payload.datetimeOut
                state.vehicleData[_.findIndex(state.vehicleData,{"transID":action.payload.transNo})].totalBill = "" + (((totalTime - 24) * rate) + 5000)
            }
        }
    }
})

export const {checkInVehicle, addTransaction, checkOutVehicle, computeTotalBill } = parkingSlice.actions
export default parkingSlice.reducer