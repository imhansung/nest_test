import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async createComment(
    content: string,
    parentId: string,
    userId: string,
    articleId: string,
  ) {
    const comment = await this.commentRepository.save({
      content: content,
      userId: userId,
      parentId: parentId,
      articleId: articleId,
    });
    return comment;
  }

  async modifyComment(commentId: string, userId: string, content: string) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        userId: userId,
      },
    });

    if (!comment) {
      throw new UnauthorizedException('댓글을 수정할 권한이 없습니다.');
    }
    const updateResult = await this.commentRepository.update(
      { id: commentId },
      { content: content },
    );
    return { affected: updateResult?.affected };
  }

  async removeComment(commentId: string, userId: string) {
    const deleteResult = await this.commentRepository.softDelete({
      id: commentId,
      userId: userId,
    });

    return { affected: deleteResult?.affected };
  }
}
