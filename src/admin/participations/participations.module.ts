import { Module } from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { ParticipationsController } from './participations.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ParticipationModule } from 'src/participation/participation.module';

@Module({
  controllers: [ParticipationsController],
  providers: [ParticipationsService],
  imports: [AuthModule, ParticipationModule],
})
export class ParticipationsModule {}
