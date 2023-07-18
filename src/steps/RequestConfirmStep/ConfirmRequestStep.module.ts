import { Module } from '@nestjs/common';
import { ParticipationModule } from 'src/participation/participation.module';
import { ConfirmRequestStepService } from './ConfirmRequestStep.service';

@Module({
  imports: [ParticipationModule],
  providers: [ConfirmRequestStepService],
  exports: [ConfirmRequestStepService],
})
export class ConfirmRequestStepModule {}
