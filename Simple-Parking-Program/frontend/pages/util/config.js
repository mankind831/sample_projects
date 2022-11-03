//Needed import to run the function
import * as jose from 'jose'

//Generate Token
export const generateToken = async (bodyData) => {
    const token = await new jose.SignJWT({ data: bodyData })
        .setProtectedHeader({alg:'HS256', typ:'JWT'})
        .setIssuedAt()
        .setIssuer('lemondrop')
        .setAudience('mankind')
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET))
    return token
}

//Decode Token
export const decodeToken = async (token) => {
    const { payload, protectedHeader} = await jose.jwtVerify(token,new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET),{
        issuer:'lemondrop',
        audience:'mankind'
    })
    return payload.data
}