import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
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
	async createPost(@Body() input: CreatePostInput) {
		return await this.postService.createPost(input)
	}

	@Post('updatePost')
	@ApiOperation({ operationId: 'updatePost' })
	@ApiBody({ type: UpdatePostInput })
	async updatePost(@Body() input: UpdatePostInput) {
		return await this.postService.updatePost(input)
	}

	@Post('deletePost')
	@ApiOperation({ operationId: 'deletePost' })
	@ApiBody({ type: DeletePostInput })
	async deletePost(@Body() input: DeletePostInput) {
		return await this.postService.deletePost(input)
	}

	@Get('readPost')
	@ApiOperation({ operationId: 'readPost' })
	@ApiBody({ type: ReadPostInput })
	async readPost(@Body() input: ReadPostInput) {
		return await this.postService.readPost(input)
	}
}
