import { NextFunction, Response,Request } from "express";
import Jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyJWT = (req: Request, res:Response, next:NextFunction) => {
    
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
        return res.status(403).json({
            message: "Unauthenicate"
        });
    }
    const token: string = authHeader
        
    if(!token) {
        res.status(403).json({
                message: "Unauthenicate"
        });
    }
    Jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err, payload) => {
            if(err) {
                return res.status(403).json({
                    message: "Token invalid"
                })
            }
            
            // @ts-ignore
            req.payload = payload
            next();
        }
    )
}