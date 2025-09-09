import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() body, @User() user) {
    const userId = user.id;
    const content = body.content;
    const parentId = body?.parentId;
    const articleId = body.articleId;
    const comment = await this.commentService.createComment(
      userId,
      parentId,
      content,
      articleId,
    );
    return comment;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateComment(@Body() body, @User() user, @Param('id') id) {
    const userId = user.id;
    const commentId = id;
    const content = body.content;

    const comment = await this.commentService.modifyComment(
      commentId,
      userId,
      content,
    );
    return comment;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteComment(@Param('id') id, @User() user) {
    const commentId = id;
    const userId = user.id;

    const res = await this.commentService.removeComment(commentId, userId);

    return res;
  }
}