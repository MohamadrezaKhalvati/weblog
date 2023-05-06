import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { PostModule } from '../post/post.module'
import { PrismaModule } from '../prisma/prisma.module'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'

@Module({
	controllers: [CommentController],
	providers: [CommentService],
	imports: [PrismaModule, AuthModule, PostModule],
})
export class CommentModule {}
