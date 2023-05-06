import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { GetUserId } from '../auth/decorator/get-user-id.decorator'
import { IsAdmin } from '../auth/guards/is-admin.guard'
import { IsLoggedIn } from '../auth/guards/is-logged-in.guard'
import CreatePostInput from './dto/create-post.input'
import DeletePostInput from './dto/delete-post.input'
import ReadPostInput from './dto/read-post.input'
import UpdatePostInput from './dto/update-post.input'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
	constructor(private postService: PostService) {}

	@Post('createPost')
	@ApiOperation({ operationId: 'createPost' })
	@ApiBody({ type: CreatePostInput })
	@UseGuards(IsLoggedIn)
	async createPost(@Body() input: CreatePostInput) {
		return await this.postService.createPost(input)
	}

	@Post('updatePost')
	@ApiOperation({ operationId: 'updatePost' })
	@ApiBody({ type: UpdatePostInput })
	@UseGuards(IsAdmin)
	async updatePost(@Body() input: UpdatePostInput) {
		return await this.postService.updatePost(input)
	}

	@Post('deletePost')
	@ApiOperation({ operationId: 'deletePost' })
	@ApiBody({ type: DeletePostInput })
	@UseGuards(IsAdmin)
	async deletePost(
		@Body() input: DeletePostInput,
		@GetUserId() requesterId: string,
	) {
		return await this.postService.deletePost(input, requesterId)
	}

	@Get('readPost')
	@ApiOperation({ operationId: 'readPost' })
	@ApiBody({ type: ReadPostInput })
	@UseGuards(IsLoggedIn)
	async readPost(@Body() input: ReadPostInput) {
		return await this.postService.readPost(input)
	}
}
