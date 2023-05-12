import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import cleanDeep from 'clean-deep'
import { createPaginationResult } from 'src/common/input/pagination.input'
import { AuthService } from '../auth/auth.service'
import { PostService } from '../post/post.service'
import { PrismaService } from '../prisma/prisma.service'
import CreateCommentInput from './dto/create-comment.input'
import DeleteCommentInput from './dto/delete-comment.input'
import ReadCommentInput from './dto/read-comment.input'
import UpdateCommentInput from './dto/update-comment.input'

@Injectable()
export class CommentService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
		private PostService: PostService,
	) {}

	async createComment(input: CreateCommentInput) {
		const { data } = input

		await this.authService.verifyUserExistance(data.authorId)
		await this.PostService.verifyIsPostExistance(data.relatedPostId)

		const comment = await this.prisma.comment.create({
			data: {
				content: data.content,
				postId: data.relatedPostId,
				authorId: data.authorId,
			},
		})

		return comment
	}

	async readComment(input: ReadCommentInput) {
		const rawClause = input.data || {}

		let whereClause: Prisma.CommentWhereInput = {
			authorId: rawClause.authorId,
			content: rawClause.content,
			postId: rawClause.relatedPostId,
			id: rawClause.id,
		}

		whereClause = cleanDeep(whereClause)

		const count = this.prisma.comment.count({ where: whereClause })
		const entity = this.prisma.comment.findMany({
			where: whereClause,
			...input?.pagination.convertToPrismaFilter(),
			...input?.sortBy.convertToPrismaFilter(),
		})

		return createPaginationResult({ count, entity })
	}

	async updateComment(input: UpdateCommentInput) {
		const { data, id } = input

		await this.verifyIfCommentExistance(id)

		let myauthorId = data.authorId
		let relatedPostId = data.relatedPostId

		if (data.authorId) {
			myauthorId = await this.authService.verifyUserExistance(
				data.authorId,
			)
		}

		if (data.relatedPostId) {
			relatedPostId = await this.PostService.verifyIsPostExistance(
				data.relatedPostId,
			)
		}

		const dataClause: Prisma.CommentWhereInput = {
			authorId: myauthorId,
			content: data.content,
			postId: relatedPostId,
		}

		const comment = await this.prisma.comment.update({
			where: {
				id: id,
			},
			data: dataClause,
		})

		return comment
	}

	async deleteComment(input: DeleteCommentInput) {
		const { data } = input

		await this.verifyIfCommentExistance(data.id)

		const deletedComment = await this.prisma.comment.delete({
			where: {
				id: data.id,
			},
		})

		return deletedComment
	}

	private async verifyIfCommentExistance(id) {
		const comment = await this.prisma.comment.findUnique({
			where: {
				id: id,
			},
		})
		if (!comment) console.log("comment doesn't exist")

		return comment
	}
}
