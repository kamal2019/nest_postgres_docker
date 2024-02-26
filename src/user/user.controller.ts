import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/jwt';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Get('me')
    getMe(@GetUser() user:User){
        return user
    }

    @Patch('edit')
    editUser(
        @GetUser('id') userId:number,
        @Body() dto:EditUserDto
    ){
        return this.userService.editUser(userId , dto)
    }
}
