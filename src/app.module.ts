import { Module } from '@nestjs/common'
import { AuthModule } from './module/auth/auth.module'
import { CommentModule } from './module/comment/comment.module'
import { PostModule } from './module/post/post.module'
import { PrismaModule } from './module/prisma/prisma.module'

@Module({
	imports: [AuthModule, PostModule, CommentModule, PrismaModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
