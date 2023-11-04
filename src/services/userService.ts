import { PrismaClient, PrismaPromise,User } from '@prisma/client'

const prisma = new PrismaClient()


export const getAllUser = async () => {
  const alluser = await prisma.user.findMany();
  return alluser;
};

export const getUserById = async (_id: string) => {
    try{
      const user = await prisma.user.findUnique({
        where: {
          id: _id
        },
        include: {
          attractinReview: true,
          productReview: true,
          basket: true
        }
      });
      return user;
    }catch(err:any){
      return err.message;
    }
}

export const createUser = async (_firstname:string, _lastname:string, _username:string, _password:string):Promise<User> => {
    try{
      const user:User = await prisma.user.create({
        data: {
          firstname: _firstname,
          lastname: _lastname,
          username: _username,
          hashPassword: _password,
        }
      });
      return user;
    }catch(err:any){
      return err.message
    }
}

export const addToken = async (_id:string, _token:string):Promise<User> => {
  try{
    const user:User = await prisma.user.update({
      where: {
        id: _id,
      },
      data:{
        token: _token,
        isLogin: true,
      }
    });
    return user;
  }catch(err:any){
    return err.message
  }
}



export const getUserByUsername = async (_username: string) => {
    try{
      const user = await prisma.user.findFirst({
        where: {
          username: _username
        }
      })
      if (user == null)
        return null
      return user;
    }catch(err:any){
      return err.message;
    }
}

export const userLogout = async (_id: string) => {
  try{
    const user = await prisma.user.update({
      where: {
        id: _id
      },
      data:{
        isLogin: false
      }
    })
    if (user == null)
      return null
    return user;
  }catch(err:any){
    return err.message;
  }
}

export const updateUser = async (_id:string, _firstname:string, _lastname:string) => {
  
  try{
    const user = await prisma.user.update({
      where: {
        id: _id
      },
      data:{
        firstname: _firstname,
        lastname: _lastname,
      }
    })
    return user;  
  }catch(err:any){
    return err.message
  }

}

export const resetPassword = async (_id:string, newPassword:string) => {
  try{
      await prisma.user.update({
        where:{
          id: _id
        },
        data:{
          hashPassword: newPassword
        }
      })
  }catch(err:any){
    return err.message
  }
}

