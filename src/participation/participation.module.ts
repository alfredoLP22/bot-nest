import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationController } from './participation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Participation,
  ParticipationSchema,
} from './schemas/participation.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Participation.name,
        schema: ParticipationSchema,
      },
    ]),
  ],
  controllers: [ParticipationController],
  providers: [ParticipationService],
  exports: [MongooseModule, ParticipationService],
})
export class ParticipationModule {}
