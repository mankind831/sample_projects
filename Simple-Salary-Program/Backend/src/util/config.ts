import * as jose from 'jose'
require('dotenv').config()

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

export const decodeToken = async (token:string):Promise<any> => {
    const { payload, protectedHeader} = await jose.jwtVerify(token,new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET),{
        issuer:'lemondrop',
        audience:'mankind'
    })
    return payload.data
}