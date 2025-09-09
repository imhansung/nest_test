import { PickType } from '@nestjs/swagger';
import { ArticleEntity } from 'src/entities/article.entity';

export class CreateArticleDto extends PickType(ArticleEntity, [
  'title',
  'content',
]) {}

// dto를 사용하고 Unsafe assignment of an `any` value. 에러도 사라짐
