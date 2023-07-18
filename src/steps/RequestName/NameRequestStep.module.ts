import { Module } from '@nestjs/common';
import { ParticipationModule } from 'src/participation/participation.module';
import { NameRequestStepService } from './NameRequestStep.service';

@Module({
  imports: [ParticipationModule],
  providers: [NameRequestStepService],
  exports: [NameRequestStepService],
})
export class NameRequestStepModule {}
