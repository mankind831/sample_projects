import { fireEvent, queryByAttribute, render, screen} from '@testing-library/react'
import React from 'react'
import EmployeeInfo from '../pages/employee'
import store from '../pages/store/index'
import { Provider } from 'react-redux'

describe("Employee Page", () => {
    it("renders the Employee header", () =>{
        render(<Provider store={store}><EmployeeInfo /></Provider>)
        expect(screen.getByTestId('empId')).toBeInTheDocument;
        expect(screen.getByTestId('fname')).toBeInTheDocument;
        expect(screen.getByTestId('lname')).toBeInTheDocument;
        expect(screen.getByTestId('position')).toBeInTheDocument;
        expect(screen.getByTestId('salary')).toBeInTheDocument;
        expect(screen.getByTestId('type')).toBeInTheDocument;
        expect(screen.getByTestId('payableLeave')).toBeInTheDocument;
    })
    it("renders the Employee Tables", () => {
        render(<Provider store={store}><EmployeeInfo /></Provider>)
        expect(screen.getByTestId('leave')).toBeInTheDocument;
        expect(screen.getByTestId('absent')).toBeInTheDocument;
        expect(screen.getByTestId('overtime')).toBeInTheDocument;
        expect(screen.getByTestId('monthSalary')).toBeInTheDocument;
        expect(screen.getByTestId('overtimeTable')).toBeInTheDocument;
        expect(screen.getByTestId('overtimeBtn')).toBeInTheDocument;
    })
    it("checks if the Display Table is called", () =>{
        render(<Provider store={store}><EmployeeInfo /></Provider>)
        expect(jest.mock(EmployeeInfo.DispayOT)).toHaveBeenCalled
        expect(jest.mock(EmployeeInfo.DispayLeave)).toHaveBeenCalled
        expect(jest.mock(EmployeeInfo.DispayAbsent)).toHaveBeenCalled
    })
})