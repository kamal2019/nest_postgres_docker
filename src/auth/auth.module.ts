import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports:[
        ConfigModule.forRoot({
            envFilePath:".env"
        }),
        JwtModule.register({
            global:true,
            secret:jwtConstants.secret,
            signOptions:{expiresIn:'60min'}
        })
    ],
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy]
})
export class AuthModule{}