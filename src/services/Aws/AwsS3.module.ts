import { Module } from '@nestjs/common';
import { AwsS3Service } from './AwsS3.service';

@Module({
  providers: [AwsS3Service],
  imports: [],
  exports: [AwsS3Service],
})
export class AwsS3KModule {}
