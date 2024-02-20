import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

import { AuthDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService{
    constructor( private prisma :PrismaService){}
    
    async signup(dto:AuthDto){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(dto.password,salt)
        const User = await this.prisma.user.create({
            data:{
                email:dto.email,
                hash:hash
            }
        })
        return User
    }
    signin(dto:AuthDto){
        return {}
    }
}