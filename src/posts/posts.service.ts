import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { createPostDto } from './dto/create-post-dto';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService
  ) {}

  async getPosts() {
    try {
      const posts = await this.postRepository.findAll();
      if (posts.length === 0) {
        throw new HttpException('Постов не найдено', HttpStatus.NOT_FOUND);
      }
      return posts;
    } catch (e) {
      console.log('Постов нет: ', e.message);
    }
  }

  async createPost(dto: createPostDto, image: any) {
    try {
      const fileName = await this.fileService.createFile(image);
      const post = await this.postRepository.create({
        ...dto,
        image: fileName,
      });
      return post;
    } catch (e) {
      console.log('Ошибка создания поста: ', e.message);
    }

    throw new HttpException(
      'Ошибка создания поста',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  async updatePost(id: number, dto: createPostDto) {
    try {
      const [post] = await this.postRepository.update(
        { ...dto },
        { where: { id } }
      );

      if (post === 0) {
        throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
      }
      return await this.postRepository.findAll();
    } catch (e) {
      console.log('Ошибка обновления поста: ', e.message);
    }
  }

  async deletePost(id: number) {
    try {
      const post = await this.postRepository.findByPk(id);

      if (!post) {
        throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
      }
      await this.postRepository.destroy({ where: { id } });
      return await this.postRepository.findAll();
    } catch (e) {
      console.log('Пост не был удален: ', e.message);
    }
  }
}
