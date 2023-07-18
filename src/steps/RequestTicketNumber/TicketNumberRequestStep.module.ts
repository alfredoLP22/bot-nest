import { Module } from '@nestjs/common';
import { ParticipationModule } from 'src/participation/participation.module';
import { TwilioSDKModule } from 'src/services/twilioService/twilioSDK.module';
import { TicketNumberRequestStepService } from './TicketNumberRequestStep.service';

@Module({
  imports: [ParticipationModule, TwilioSDKModule],
  providers: [TicketNumberRequestStepService],
  exports: [TicketNumberRequestStepService],
})
export class TicketNumberRequestStepModule {}
