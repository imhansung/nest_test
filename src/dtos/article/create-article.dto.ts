import { PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ArticleEntity } from 'src/entities/article.entity';

export class CreateArticleDto extends PickType(ArticleEntity, [
  'title',
  'content',
] as const) {
  //@IsNumber()
  title: string;

  //@IsNumber()
  content: string;
}

// dto를 사용하고 Unsafe assignment of an `any` value. 에러도 사라짐
