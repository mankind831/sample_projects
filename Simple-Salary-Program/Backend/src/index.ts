import { createServer, IncomingMessage, ServerResponse } from 'http'
import { profileRequest } from './api/profile/profile'
import { leaveRequest } from './api/profile/leave'
import { overtimeRequest } from './api/profile/overtime'
import { absentRequest } from './api/profile/absent'
import { adminRequest } from './api/admin/admin'
import { adminListRequest } from './api/admin/account'
import { companyListRequest } from './api/company/companyList'
import { employerRequest } from './api/employer/employerList'
import { employeeListRequest } from './api/employee/employeeList'
import { leaveEmpRequest } from './api/employee/leave'
import { absentEmpRequest } from './api/employee/absent'
import { overtimeEmpRequest } from './api/employee/overtime'
import { loginRequest } from './api/login'
import { uploadEmployeeRequest } from './api/upload/upload_employee'
import { uploadCompanyRequest } from './api/upload/upload_company'

const listener = async (req: IncomingMessage, res: ServerResponse) => {
    const headers = {
        "Access-control-allow-origin": "*",
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
        "Access-Control-Max-Age": 2592000, // 30 days
        /** add other headers as per requirement */
        "Content-Type": "application/json"
      }

    if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
    }
    
    try{
        let result: string | object = ''
        if((req.url as string).match('/profile/leave(.*?)')){
            result = await leaveRequest(req) as string | object
        }
        else if((req.url as string).match('/profile/overtime(.*?)')){
            result = await overtimeRequest(req) as string | object
        }
        else if((req.url as string).match('/profile/absent(.*?)')){
            result = await absentRequest(req) as string | object
        }
        else if((req.url as string).match('/profile(.*?)')){
            result = await profileRequest(req) as string | object
        }
        else if((req.url as string).match('/adminlist(.*?)')){
            result = await adminListRequest(req) as string | object
        }
        else if((req.url as string).match('/admin(.*?)')){
            result = await adminRequest(req) as string | object
        }
        else if((req.url as string).match('/company(.*?)')){
            result = await companyListRequest(req) as string | object
        }
        else if((req.url as string).match('/employer/(.*?)/leave(.*?)')){
            result = await leaveEmpRequest(req) as string | object
        }
        else if((req.url as string).match('/employer/(.*?)/absent(.*?)')){
            result = await absentEmpRequest(req) as string | object
        }
        else if((req.url as string).match('/employer/(.*?)/overtime(.*?)')){
            result = await overtimeEmpRequest(req) as string | object
        }
        else if((req.url as string).match('/employer/employee(.*?)')){
            result = await employeeListRequest(req) as string | object
        }
        else if((req.url as string).match('/employer(.*?)')){
            result = await employerRequest(req) as string | object
        }
        else if((req.url as string).match('/login(.*?)')){
            result = await loginRequest(req) as string | object
        }
        else if ((req.url as string).match('/upload_employee(.*?)')){
            result = await uploadEmployeeRequest(req) as string | object
        }
        else if ((req.url as string).match('/upload_company(.*?)')){
            result = await uploadCompanyRequest(req) as string | object
        }
        res.writeHead(200,headers)
        res.end(JSON.stringify(result))
    } catch (error) {
        res.writeHead(400,headers)
        res.end(JSON.stringify(error))
    }
}

const server = createServer(listener)
server.listen(8080)