import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { computeDailyWage, computeSalary } from './store/reducers/employeeSlice'
import { computeEmployeeAbsence } from './store/reducers/empAbsenceSlice'
import { computeLeave } from './store/reducers/empLeaveSlice'
import { computeOvertime} from './store/reducers/empOvertimeSlice'
import { Button, TextField } from '@mui/material'


const Sample = () => {
    const dispatch = useDispatch()
    const empSampleData = useSelector(state => state.employeeData.value)
    const companySampleData = useSelector(state => state.companiesData.value)
    var employeeName = empSampleData[0].fname+" "+empSampleData[0].lname
    var companyName = companySampleData[0].companyName
    const leaveData = useSelector((state) => state.empLeave.totalPayableLeave)
    const overtimeDate = useSelector((state) => state.empOvertime.totalOvertime)
    const absentData = useSelector((state) => state.empAbsences.totalAbsents)
    const wageData = useSelector((state) => state.employeeData.dailySalary)
    const salaryData = useSelector((state) => state.employeeData.monthSalary)
    const empData = useSelector((state) => state.employeeData)
    const [leaveValue, setLeaveValue] = useState(0)
    const [overtimeValue, setOvertimeValue] = useState(0)
    const [absentValue, setAbsentValue] = useState(0)
    const [wageValue, setWageValue] = useState(0)
    const [salaryValue, setSalaryValue] = useState(0)
    
    const handleButtonClick = () => {
      dispatchAll()
    }

    const dispatchAll = () => {
      dispatch(computeOvertime([empSampleData[0].empID,"09",companySampleData[0].companyOTLimit]))
      dispatch(computeDailyWage(empSampleData[0].empID))
      dispatch(computeLeave([empSampleData[0].empID,"09",companySampleData[0].companyLeaves]))
      dispatch(computeEmployeeAbsence([empSampleData[0].empID,"09",leaveValue]))
      dispatch(computeSalary([empSampleData[0].empID,wageValue,overtimeValue,leaveValue,absentValue]))
    }

    useEffect(() => {
        setLeaveValue(leaveData)
        setWageValue(wageData)
        setOvertimeValue(overtimeDate)
        setAbsentValue(absentData)
        setSalaryValue(salaryData)
    },[leaveData, overtimeDate, absentData, wageData, salaryData])

  return (
    <div>
        <div>Employee:&nbsp;{employeeName}</div> 
        <br/>
        <div>Company:&nbsp;{companyName}</div>
        <br />
        <div>Payable Leave Credits:{leaveValue}</div>
        <br />
        <div>Total Absent:{absentValue}</div>
        <br />
        <div>Total Overtime:{overtimeValue}</div>
        <br />
        <div>Daily Wage:${wageValue}</div>
        <br />
        <div>Total Salary:${salaryValue}</div>
        <br />
        <Button 
            id='btnClick' 
            name='btnClick' 
            onClick={handleButtonClick} variant='contained'>Click Me</Button>
    </div>
  )
}

export default Sample