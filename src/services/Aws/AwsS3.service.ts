import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import {
  CreateBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class AwsS3Service {
  private readonly logger = new Logger('AwsS3Service');
  constructor(private readonly configService: ConfigService) {}

  async uploadFIleS3(file: Express.Multer.File) {
    const s3 = new S3Client({
      region: this.configService.get('AWS_REGIOM'),
    });

    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${uuid()}.${fileExtension}`;

    const params = {
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: fileName, // The name of the object. For example, 'sample_upload.txt'.
      Body: file.buffer, //
    };
    try {
      const data = await s3.send(
        new CreateBucketCommand({ Bucket: params.Bucket }),
      );
      return data;
    } catch (error) {
      this.logger.error(
        `something wrong happend in create bucket command proccess error: ${error}`,
      );
    }

    try {
      const results = await s3.send(new PutObjectCommand(params));

      this.logger.log(
        `Successfully created ${params.Key} and uploaded it to ${params.Bucket}/${params.Key}`,
      );
      return results; // For unit tests.
    } catch (err) {
      this.logger.error(
        `something wrong happend in upload file process error: ${err}`,
      );
    }
  }
}
