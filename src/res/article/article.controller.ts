import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
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

  @Get('/:id')
  async readArticle(@Param('id') id) {
    const articleId = id;

    const article = await this.articleService.getArticle(articleId);

    return article;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateArticle(@Param('id') id, @Body() body, @User() user) {
    const userId = user.id;
    const articleId = id;

    const title = body.title;
    const content = body.content;

    const res = await this.articleService.modifyArticle(
      userId,
      articleId,
      title,
      content,
    );
    return res;
  }
}
