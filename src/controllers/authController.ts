import { User } from '@prisma/client';
import {Request, Response} from 'express';
import bcrypt from "bcrypt";
import {jwtGenerate} from '../utils/JWT';

// import service
import * as userService from '../services/userService';

export const register = async (req: Request, res: Response) => {
    const {firstname, lastname, username,password} = req.body;
    if(!firstname || !lastname || !username || !password){
        res.status(400).json(
            {
                message: "All input required"
            }
        )
    }

    const oldUser = await userService.getUserByUsername(username);
    if (oldUser){
        return res.status(401).json({
            message: "Already have username"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser:User = await userService.createUser(firstname, lastname,username, hashPassword);
    
    const token:string = jwtGenerate(newUser)
    
    const user: User = await userService.addToken(newUser.id, token);

    res.status(200).json({
        message: "Register complet",
        data: user
    })

}

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body

    if(!(username && password)){
        res.status(401).json({
            message: "All input required"
        })
    }
    
    const IsValidateuser:User = await userService.getUserByUsername(username);
    if(!IsValidateuser){
        res.status(404).json({
            message: "User not found"
        })
    }
    
    const decodePassword = await bcrypt.compare(password, IsValidateuser.hashPassword)
    if(!decodePassword){
       return res.status(401).json({
          message:  "Password not correct"
        })
    }
    const token = jwtGenerate(IsValidateuser);
    const user:User = await userService.addToken(IsValidateuser.id, token)
    res.status(200).json({
        message: "Login succesful",
        token: user.token
    })
}

export const logout = async (req: Request, res: Response) => {
    // @ts-ignore
    await userService.userLogout(req.payload.userId)
    res.status(200).json({
        //@ts-ignore
        message: `user: ${req.payload.username} Logout sucesful`

    })
}

