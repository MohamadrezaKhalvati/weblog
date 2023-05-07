import { Injectable } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import CreatePostInput from './dto/create-post.input'
import DeletePostInput from './dto/delete-post.input'
import ReadPostInput from './dto/read-post.input'
import UpdatePostInput from './dto/update-post.input'

@Injectable()
export class PostService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
	) {}

	async createPost(input: CreatePostInput) {}

	async updatePost(input: UpdatePostInput) {}

	async readPost(input: ReadPostInput) {}

	async deletePost(input: DeletePostInput, requesterId: string) {
		const { data } = input

		await this.verifyIsPostExistance(data.id)
		await this.authService.verifyIfUserAdmin(requesterId)
	}

	async verifyIsPostExistance(id: string) {
		const post = await this.prisma.post.findFirst({
			where: { id },
		})
		if (!post) {
			console.log('error in verifyIsPostExistance')
		}
		return post
	}
}
