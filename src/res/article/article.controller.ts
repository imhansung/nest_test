import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CreateArticleDto } from 'src/dtos/article/create-article.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('게시글API') // ApiTag를 통해 Article Controller가 무슨 역할을 하는지 태그를 달아줍니다.
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({
    summary: '게시글 생성 API',
    description: '유저가 게시글을 작성한다.',
  }) //createArticle이 어떻게 작동하는지 설명합니다.
  @ApiBody({
    type: CreateArticleDto,
  }) //createArticle의 인자로 들어가는 Body값에 어떤 값이 들어가는지 설명합니다.
  @ApiBearerAuth() // 로그인이 필요한 API라는 것을 표현
  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(@Body() body: CreateArticleDto, @User() user) {
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

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteArticle(@Param('id') id, @User() user) {
    const userId = user.id;
    const articleId = id;

    const res = await this.articleService.removeArticle(userId, articleId);
    return res;
  }
}
