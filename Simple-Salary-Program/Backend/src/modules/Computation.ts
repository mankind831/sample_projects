import { differenceInDays, differenceInMinutes, format, subDays } from "date-fns";
import _ from "lodash";

export default class Computation{
    //function to generate Remaining Leave of the month
    generateRemainingLeave(month:string,year:string,queryLeave:any[],queryCompany:any):number{
        var value:number = _.sum(_.map(queryLeave,(leaveData) => {
            if(format(new Date(leaveData.dateStarted),"MM") === month && format(new Date(leaveData.dateStarted),"yyyy") === year){
                return differenceInDays(new Date(leaveData.dateEnded),subDays(new Date(leaveData.dateStarted),1))
            }
        }))
        if(value === undefined){
            value = 0
        }
        return value > parseInt(queryCompany.monthlyLeave)
            ? value : parseInt(queryCompany.monthlyLeave) - value
    }

    generateTotalLeave(month:string,year:string,queryLeave:any[],queryCompany:any):number{
        var value:number = _.sum(_.map(queryLeave,(leaveData) => {
            if(format(new Date(leaveData.dateStarted),"MM") === month && format(new Date(leaveData.dateStarted),"yyyy") === year){
                return differenceInDays(new Date(leaveData.dateEnded),subDays(new Date(leaveData.dateStarted),1))
            }
        }))
        if(value === undefined){
            value = 0
        }
        return value 
    }

    //function to generate Total Overtiem of the month
    generateTotalOvertime(month:string,year:string,queryOvertime:any[],queryCompany:any):number{
        var value:number = _.sum(_.map(queryOvertime,(oTime) => {
            if(format(new Date(oTime.dateAvailed),"MM") === month && format(new Date(oTime.dateAvailed),"yyyy") === year){
                return (differenceInMinutes(new Date(oTime.dateAvailed+" "+oTime.timeEnded),new Date(oTime.dateAvailed+" "+oTime.timeStarted)) / 60)
            }
        }))
        if(value === undefined){
            value = 0
        }
        return value < parseInt(queryCompany.monthlyOvertime) 
            ? value :  parseInt(queryCompany.monthlyOvertime) 
    }

    //function to generate Total Absent of the month
    generateTotalAbsences(month:string,year:string,queryAbsent:any[]):number{
        var value:number = _.sum(_.map(queryAbsent,(absentData) => {
            if(format(new Date(absentData.dateStarted),"MM") === month && format(new Date(absentData.dateStarted),"yyyy") === year){
                return differenceInDays(new Date(absentData.dateEnded),subDays(new Date(absentData.dateStarted),1))
            }
        }))
        if(value === undefined){
            value = 0
        }
        return value
    }
    
    //function to generate Daily Wage
    generateDailyWage(queryData:any):number {
        var dailyWage:number = 0
        if(queryData.employmentType === 'Fulltime'){
            dailyWage = parseInt(queryData.hourlyRate) * 8
        }else if(queryData.employmentType === 'Parttime'){
            dailyWage = parseInt(queryData.hourlyRate) * 4  
        }
        return dailyWage
    }

    //function to generate Monthly Salary
    generateMonthSalary(
        month:string,
        year:string,
        queryCompany:any,
        queryData:any,
        queryLeave:any[],
        queryOvertime:any[],
        queryAbsent:any[]):number{
        const value:number = (this.generateDailyWage(queryData) * 20) + (this.generateRemainingLeave(month,year,queryLeave,queryCompany) * this.generateDailyWage(queryData)) + 
            (this.generateTotalOvertime(month,year,queryOvertime,queryCompany) * (0.2 * parseInt(queryData.hourlyRate))) - (this.generateTotalAbsences(month,year,queryAbsent) * this.generateDailyWage(queryData)) 
        return value
    }
}