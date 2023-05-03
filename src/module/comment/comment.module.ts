import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { PrismaModule } from '../prisma/prisma.module'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'

@Module({
	controllers: [CommentController],
	providers: [CommentService],
	imports: [PrismaModule, AuthModule],
})
export class CommentModule {}
