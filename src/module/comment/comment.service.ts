import { Injectable } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { PostService } from '../post/post.service'
import { PrismaService } from '../prisma/prisma.service'
import CreateCommentInput from './dto/create-comment.input'
import DeleteCommentInput from './dto/delete-comment.input'
import UpdateCommentInput from './dto/update-comment.input'

@Injectable()
export class CommentService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
		private PostService: PostService,
	) {}

	async createComment(input: CreateCommentInput) {}

	async readComment(input: CreateCommentInput) {}

	async updateComment(input: UpdateCommentInput) {}

	async deleteComment(input: DeleteCommentInput) {}
}
