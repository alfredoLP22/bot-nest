import { Injectable, Logger } from '@nestjs/common';
const fs = require('fs');
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { AwsS3Service } from '../Aws/AwsS3.service';

@Injectable()
export class UploadLocalFileService {
  private readonly logger = new Logger('FileService');
  constructor(private readonly awsService: AwsS3Service) {}

  async uploadFile(file) {
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${uuid()}.${fileExtension}`;
    const directory = './participations/tickets';

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    await fs.writeFile(
      join(__dirname, `../../.${directory}`, fileName),
      file.buffer,
      (err) => {
        if (err) console.log(err);
        else {
          this.logger.log(
            `El archivo se subio corretcamente en la carpeta /participations/ticktes con el nomnbre ${fileName}`,
          );
        }
      },
    );

    try {
      await this.awsService.uploadFIleS3(file);
      this.logger.log(
        `file was succesfully upload to s3 with name of ${fileName}`,
      );
    } catch (error) {
      this.logger.error(error);
    }
    return fileName;
  }
}
