import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService
    ) { }

    editUser(userId: number, dto: EditUserDto) {
        const updateUser = this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
        })
        // @ts-ignore 
        delete updateUser.hash
        return updateUser
    }
}
