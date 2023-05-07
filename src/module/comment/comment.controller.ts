import { Body, Controller, Get, Post } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { IsAdmin } from '../auth/guards/is-admin.guard'
import { IsLoggedIn } from '../auth/guards/is-logged-in.guard'
import { CommentService } from './comment.service'
import CreateCommentInput from './dto/create-comment.input'
import DeleteCommentInput from './dto/delete-comment.input'
import ReadCommentInput from './dto/read-comment.input'
import UpdateCommentInput from './dto/update-comment.input'
@Controller('comment')
export class CommentController {
	constructor(private commentService: CommentService) {}

	@Post('createComment')
	@ApiOperation({ operationId: 'createComment' })
	@ApiBody({ type: CreateCommentInput })
	@UseGuards(IsLoggedIn)
	@ApiResponse({ status: 200 })
	async createComment(@Body() input: CreateCommentInput) {
		return await this.commentService.createComment(input)
	}

	@Post('updateComment')
	@ApiOperation({ operationId: 'updateComment' })
	@ApiBody({ type: UpdateCommentInput })
	@UseGuards(IsAdmin)
	@ApiResponse({ status: 200 })
	async updateComment(@Body() input: UpdateCommentInput) {
		return await this.commentService.updateComment(input)
	}

	@Get('readComment')
	@ApiOperation({ operationId: 'readComment' })
	@ApiBody({ type: ReadCommentInput })
	@UseGuards(IsAdmin)
	@ApiResponse({ status: 200 })
	async readComment(@Body() input: ReadCommentInput) {
		return await this.commentService.readComment(input)
	}

	@Post('deleteComment')
	@ApiOperation({ operationId: 'deleteComment' })
	@ApiBody({ type: DeleteCommentInput })
	@UseGuards(IsAdmin)
	@ApiResponse({ status: 200 })
	async deleteComment(@Body() input: DeleteCommentInput) {
		return await this.commentService.deleteComment(input)
	}
}
