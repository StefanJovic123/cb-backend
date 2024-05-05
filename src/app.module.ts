import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configuration().database,
      type: 'postgres',
      entities: [],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_PORT: Joi.number().port().default(5432),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
    FilesModule,
    UsersModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
