import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { undefinedToNullInterceptor } from 'src/interceptors/undefinedToNull.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    { provide: APP_INTERCEPTOR, useClass: undefinedToNullInterceptor }, // 의존성 주입으로 인터셉터 사용하기
  ],
})
export class ArticleModule {}
