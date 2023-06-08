// import { ConfigService } from '@nestjs/config';
// import { JwtModuleOptions } from '@nestjs/jwt';
//
// export const getJwtConfig = async (
//   configService: ConfigService,
// ): Promise<JwtModuleOptions> => {
//   console.log(configService.get('JWT_SECRET'));
//   return {
//     secretOrKeyProvider: "test123", // замените "secret" на "secretOrPrivateKey"
//     signOptions: { expiresIn: configService.get('EXPIRES_IN') },
//   }
// };
