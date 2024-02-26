import { ForbiddenException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { AuthDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService{
    constructor( private prisma :PrismaService){}
    async signup(dto:AuthDto){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(dto.password,salt);
        try{
            const User = await this.prisma.user.create({
                data:{
                    email:dto.email,
                    hash:hash
                }
            })
            delete User.hash
            return User
        }
        catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === "P2002"){
                    throw new ForbiddenException("Credentials already used")
                }
            }
        }
    }
    async signin(dto:AuthDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if(!user){
            throw new ForbiddenException("Incorrect credentials")
        }
        const passwordMatched = await bcrypt.compare(dto.password ,user.hash)
        if(!passwordMatched){
            throw new ForbiddenException("Credentials incorrect")
        }
        // console.log(user , 'user')
        delete user.hash
        return user
    }
}