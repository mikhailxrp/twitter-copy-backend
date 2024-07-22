import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    if (!file) {
      return '';
    } else {
      try {
        const fileName = uuid.v4() + file.originalname;
        const filePath = path.resolve(__dirname, '..', 'static');

        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFileSync(path.join(filePath, fileName), file.buffer);
        return fileName;
      } catch (error) {
        throw new HttpException(
          'Произошла ошибка при записи файла',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
