import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { ParticipationModule } from 'src/participation/participation.module';
import { WhatsappStepFactoryModule } from 'src/factory/whatsappStepFactory.module';
import { NameRequestStepModule } from 'src/steps/RequestName/NameRequestStep.module';
import { TwilioSDKModule } from 'src/services/twilioService/twilioSDK.module';
import { AwsS3KModule } from 'src/services/Aws/AwsS3.module';

@Module({
  controllers: [WhatsappController],
  providers: [WhatsappService],
  imports: [
    ParticipationModule,
    WhatsappStepFactoryModule,
    NameRequestStepModule,
    TwilioSDKModule,
    AwsS3KModule,
  ],
})
export class WhatsappModule {}
