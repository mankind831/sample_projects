import Employee from './Employee'
import Company from './Company'
import Account from './Account'
import Employer from './Employer'
import  Admin from './Admin'
import _ from 'lodash'

export default class StoreDB{
    employee: Employee[] = [];
    company: Company[] = [];
    account: Account[] = [];
    employer: Employer[] = [];
    admin: Admin[] =[];

    constructor(){}

    //Add new data to Employee Array
    addEmployee(employee:Employee):void{
        this.employee.push(employee)
    }

    //Retrieve all data from Employee Array
    getEmployeeList():Employee[]{
        return this.employee
    }

    //Retrieve specific data from Employee Array
    getEmployee(empID:string):Employee{
        return this.employee[_.findIndex(this.employee,{"empID":empID})]
    }
    
    //Update data from Employee Array
    updateEmployee(empID:string, employee:Employee):void{
        this.employee[_.findIndex(this.employee,{"empID":empID})] = employee 
    }
 
    //Add new data to Company Array
    addCompany(company:Company):void{
        this.company.push(company)
    }

    //Retrieve all data from Company Array
    getCompanyList():Company[]{
        return this.company
    }

    //Retrieve specific data from Company Array
    getCompany(compID:string):Company{
        return this.company[_.findIndex(this.company,{"compID":compID})]
    }

    //Update data from Company Array
    updateCompany(compID:string, company:Company):void{
        this.company[_.findIndex(this.company,{"compID":compID})] = company
    }

    //Add new data to Account Array
    addAccount(account:Account):void{
        this.account.push(account)
    }

    //Retrieve all data from Account Array
    getAccountList():Account[]{
        return this.account
    }

    //Retrieve specific data from Account Array
    getAccount(accountID:string):Account{
        return this.account[_.findIndex(this.account,{"accountID":accountID})]
    }

    //Update data from Account Array
    updateAccount(accountID:string, account:Account):void{
        this.account[_.findIndex(this.account,{"accountID":accountID})] = account
    }

    //Add new data to Employer Array
    addEmployer(employer:Employer):void{
        this.employer.push(employer)
    }

    //Retrieve all data from Employer Array
    getEmployerList():Employer[]{
       return this.employer 
    }

    //Retrueve specific data from Employer Array 
    getEmployer(employerID:string):Employer{
        return this.employer[_.findIndex(this.employer,{"employerID":employerID})]
    }

    //Update data from Employer Array
    updateEmployer(employerID:string, employer:Employer):void{
        this.employer[_.findIndex(this.employer,{"employerID":employerID})] = employer
    }

    //Add new data to Admin Array
    addAdmin(admin:Admin):void{
        this.admin.push(admin)
    }

    //Retrieve all data from Admin Array
    getAdminList():Admin[]{
        return this.admin
    }

    //Retrieve specific data from Admin Array
    getAdmin(adminID:string):Admin{
        return this.admin[_.findIndex(this.admin,{"adminID":adminID})]
    }

    //Update data from Admin Array
    updateAdmin(adminID:string,admin:Admin):void{
        this.admin[_.findIndex(this.admin,{"adminID":adminID})] = admin
    }
}