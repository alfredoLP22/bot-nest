import { Module } from '@nestjs/common';
import { ParticipationModule } from 'src/participation/participation.module';
import { AwsS3KModule } from 'src/services/Aws/AwsS3.module';
import { UploadLocalFileModule } from 'src/services/Files/uploadLocalFile.module';
import { TwilioSDKModule } from 'src/services/twilioService/twilioSDK.module';
import { TicketImageRequestStepService } from './TicketImageRequestStep.service';

@Module({
  imports: [
    ParticipationModule,
    TwilioSDKModule,
    AwsS3KModule,
    UploadLocalFileModule,
  ],
  providers: [TicketImageRequestStepService],
  exports: [TicketImageRequestStepService],
})
export class TicketImageRequestStepModule {}
