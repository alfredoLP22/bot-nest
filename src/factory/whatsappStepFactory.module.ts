import { Module } from '@nestjs/common';
import { ParticipationModule } from 'src/participation/participation.module';
import { ConfirmRequestStepModule } from 'src/steps/RequestConfirmStep/ConfirmRequestStep.module';
import { NameRequestStepModule } from 'src/steps/RequestName/NameRequestStep.module';
import { TicketImageRequestStepModule } from 'src/steps/RequestTicketImage/TicketImageRequestStep.module';
import { TicketNumberRequestStepModule } from 'src/steps/RequestTicketNumber/TicketNumberRequestStep.module';
import { WhatsappServiceFactory } from './whatsappStepFactory.service';

@Module({
  imports: [
    ParticipationModule,
    NameRequestStepModule,
    TicketNumberRequestStepModule,
    TicketImageRequestStepModule,
    ConfirmRequestStepModule,
  ],
  providers: [WhatsappServiceFactory],
  exports: [WhatsappServiceFactory],
})
export class WhatsappStepFactoryModule {}
