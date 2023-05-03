import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { PrismaModule } from '../prisma/prisma.module'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
	controllers: [PostController],
	providers: [PostService],
	imports: [AuthModule, PrismaModule],
})
export class PostModule {}
