import { IncomingMessage } from 'http'
import _ from 'lodash'
import { getJSONDataFromRequestStream, getPathParams, getQueryParams } from '../../util/getParameters'
import { deleteDB, selectDB } from '../../lib/database/query'
import Account from '../../modules/Account'
import { generateToken,decodeToken } from '../../util/config'
import Admin from '../../modules/Admin'
import Employer from '../../modules/Employer'

export const adminListRequest = async (req:IncomingMessage) => {
    switch (req.method){
        case 'POST':
            const result = await getJSONDataFromRequestStream(req) as {token:string}
            const queryData = getQueryParams(req)
            if(queryData.accountID === undefined){
                //Insert Data to the database
                const decodeData = await decodeToken(result.token)
                const model = new Account(decodeData.fname,decodeData.lname,decodeData.email,decodeData.password,decodeData.role)
                await model.insertData()
                if(model.role === 'Administrator'){
                    const adminModel = new Admin(model.accountID)
                    await adminModel.insertData()
                }else if(model.role === 'Employer'){
                    const fetchedData = await selectDB('Company',`name='${decodeData.companyName}'`)
                    const employerModel = new Employer(model.accountID,`${fetchedData[0].compID}`)
                    await employerModel.insertData()
                }
                return await generateToken({result:'Success'}) 
            }else{
                //Update Specific Data
                const decodeData = await decodeToken(result.token)
                const prevRole = await selectDB('Account',`accountID='${queryData.accountID}'`)
                const model = new Account(decodeData.fname,decodeData.lname,decodeData.email,decodeData.password,decodeData.role,`${queryData.accountID}`)
                await model.updateData()
                console.log(queryData)
                if(!queryData?.changepassword){
                    if(prevRole[0].role === 'Administrator'){
                        const retAdminInfo = await selectDB('Admin',`accountID='${queryData.accountID}'`)
                        await deleteDB('Admin',`adminID='${retAdminInfo[0].adminID}'`)
                    }else if(prevRole[0].role === 'Employer'){
                        const retEmployerInfo = await selectDB('Employer',`accountID='${queryData.accountID}'`)
                        await deleteDB('Employer',`employerID='${retEmployerInfo[0].employerID}'`)
                    }
                    if(model.role === 'Administrator'){
                        const adminModel = new Admin(model.accountID)
                        await adminModel.insertData()
                    }else if(model.role === 'Employer'){
                        const fetchedData = await selectDB('Company',`name='${decodeData.companyName}'`)
                        const employerModel = new Employer(model.accountID,`${fetchedData[0].compID}`)
                        await employerModel.insertData()
                    }
                }
                return await generateToken({result:'Success'})
            }
        case 'GET':
            const data = getQueryParams(req)
            if(!data?.accountID && !data?.role && !data?.email){
                //return all data
                const listing = await selectDB('Account')
                return await generateToken({list:listing})
            }else{
                //return specific data
                const condition:string = !data?.accountID ? (!data?.role? `email='${data.email}'` : `role='${data.role}'` ) : `accountID='${data.accountID}'`  
                const listing = await selectDB('Account',condition)
                const fetchedEmployeeData = await selectDB('Employee')
                if(condition === `role='${data.role}'` && fetchedEmployeeData.length > 0){
                    var filterArr = listing
                    _.forEach(fetchedEmployeeData,(empData) => {
                        var filteringArr = _.remove(filterArr, (accntData) => {
                            return accntData.accountID !== empData.accountID
                        })
                        filterArr = filteringArr
                    })
                    return await generateToken({list:filterArr})
                }
                return await generateToken({list:listing})
            }
        default:
            break;
    }
    return 'yes'
}