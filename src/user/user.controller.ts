import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/jwt';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Get('me')
    me(){
        return "kamalaryal"
    }
}
