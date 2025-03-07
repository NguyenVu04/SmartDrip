import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { TransformInterceptor } from './core/transorm.interceptor';
import { GardenInfoModule } from './modules/garden-info/garden-info.module';
import { HumidityRecordsModule } from './modules/humidity-records/humidity-records.module';
import { MoistureRecordsModule } from './modules/moisture-records/moisture-records.module';
import { PumpRecordsModule } from './modules/pump-records/pump-records.module';
import { TemperatureRecordsModule } from './modules/temperature-records/temperature-records.module';
@Module({
  imports: [
    MoistureRecordsModule,
    UsersModule,
    HumidityRecordsModule,
    PumpRecordsModule,
    TemperatureRecordsModule,
    ConfigModule.forRoot({isGlobal: true,}),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          ignoreTLS: true,
          secure: true, // true for 465, false for other ports
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        template: {
          dir: process.cwd() + '/src/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        }
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    GardenInfoModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard, // use this guard globally for all routes at another time
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransformInterceptor, // use this interceptor globally for all routes at another time
    }
  ],
})
export class AppModule {}
