import { fireEvent, queryByAttribute, render, screen} from '@testing-library/react'
import React from 'react'
import Login from '../pages/login.js'
import store from '../pages/store/index'
import { Provider } from 'react-redux'

describe("Login", () => {
    it("renders the login", () =>{
        const {loginpage} = render(<Provider store={store}><Login/></Provider>)
        expect(screen.getByTestId('username')).toBeInTheDocument;
        expect(screen.getByTestId('password')).toBeInTheDocument;
        expect(screen.getByTestId('loginButton')).toBeInTheDocument;
    })
})

describe("function Called", () =>{
    it("call the function", () => {
        render(<Provider store={store}><Login/></Provider>)
        expect(jest.mock(Login.checkAccount)).toBeCalled
        expect(jest.mock(Login.retreiveEmpID)).toBeCalled
        expect(jest.mock(Login.errorMessage)).toBeCalled
    })
})

test("to check is Account is true or false", () =>{
    console.log(Login)
    //const result = Login.Login.checkAccount('admin','admin')
    //expect(result).toBe(true)
})