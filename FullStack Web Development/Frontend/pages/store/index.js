import { configureStore, combineReducers } from '@reduxjs/toolkit'
import empOvertimeSlice  from './reducers/empOvertimeSlice'
import employeeSlice from './reducers/employeeSlice'
import empAbsenceSlice from './reducers/empAbsenceSlice'
import empLeaveSlice from './reducers/empLeaveSlice'
import accountSlice from './reducers/accountSlice'
import companySlice from './reducers/companySlice'
import adminSlice from './reducers/adminSlice'
import employerSlice from './reducers/employerSlice'
import loginSlice from './reducers/loginSlice'

export default configureStore({
  reducer: {
      employeeData: employeeSlice,
      accountData: accountSlice,
      companyData: companySlice,
      adminData: adminSlice,
      employerData: employerSlice,
      leaveData: empLeaveSlice,
      absentData: empAbsenceSlice,
      overtimeData: empOvertimeSlice,
      login: loginSlice
  },
})    