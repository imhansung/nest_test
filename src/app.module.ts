import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './res/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './res/article/article.module';
import { CommentModule } from './res/comment/comment.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/http-exception.filter';

console.log(`.env.${process.env.NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        retryAttempts: configService.get('NODE_ENV') === 'prod' ? 10 : 1,
        type: 'mariadb',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        database: String(configService.get('DB_NAME')),
        username: configService.get('DB_USER'),
        password: String(configService.get('DB_PASSWORD')),
        entities: [path.join(__dirname, '/entities/**/*.entity.{js, ts}')],
        synchronize: false,
        logging: true,
        timezone: 'local',
      }),
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {provide: APP_FILTER, useClass: HttpExceptionFilter, }, // GLOBAL 하게 의존성주입해서 필터 사용하는 방법. main.ts 에서 컨트롤러에 적용하는 대신 주로 사용
  ],
})
export class AppModule {}
