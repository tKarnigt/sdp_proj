import Jwt from 'jsonwebtoken';

export const jwtGenerate = (user:any) => {
    const accesToken = Jwt.sign(
        {
            userId: user.id,
            username: user.username
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: '2h'
        }
    )
    return accesToken;
}