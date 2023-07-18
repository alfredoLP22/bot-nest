import { Module } from '@nestjs/common';
import { AwsS3KModule } from '../Aws/AwsS3.module';
import { UploadLocalFileService } from './UploadLocalFile.service';

@Module({
  providers: [UploadLocalFileService],
  imports: [AwsS3KModule],
  exports: [UploadLocalFileService],
})
export class UploadLocalFileModule {}
