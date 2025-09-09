import { Entity } from 'typeorm/decorator/entity/Entity';
import { CommonBigPKEntity } from './common.entity';
import { Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Article')
export class ArticleEntity extends CommonBigPKEntity {
  @ApiProperty({
    example: '게시글 제목입니다.',
    description: '게시글 제목',
    required: true,
  }) // swagger에서 사용할 property
  @Column('varchar', { unique: false, nullable: false })
  title: string;

  @ApiProperty({
    example: '게시글 내용입니다.',
    description: '게시글 내용',
    required: true,
  }) // swagger에서 사용할 property, body 타입 정의 후 추가로 설정 필요
  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];
}
