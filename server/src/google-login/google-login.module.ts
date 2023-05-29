import { Module } from "@nestjs/common";
import { GoogleLoginController } from "./google-login.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "../users/users.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [GoogleLoginController],
  providers: [],
})
export class GoogleLoginModule {}
