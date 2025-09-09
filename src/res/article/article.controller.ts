import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(@Body() body, @User() user) {
    const userId = user.id;

    const title = body.title;
    const content = body.content;
    
    const article = await this.articleService.createArticle(
      title,
      content,
      userId,
    );
    return article;
  }
}
