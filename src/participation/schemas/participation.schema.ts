import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ParticipationStatus } from '../dto/participation-status.dto';
import { ParticipationStep } from '../dto/participation-step.dto';
export type ParticipationDocument = Participation & Document;

@Schema()
export class Participation {
  @Prop({ required: true, type: String, unique: true })
  tel: string;

  @Prop({ type: Number })
  status: ParticipationStatus;

  @Prop({ type: String })
  step: ParticipationStep;

  @Prop({ type: String, required: false, default: '' })
  nameParticipant: string;

  @Prop({ type: String, required: false, default: '' })
  numberTicket: string;

  @Prop({ type: String, required: false, default: '' })
  imageTicket: string;

  @Prop({ default: Date.now(), type: Date })
  createdAt: Date;
}

export const ParticipationSchema = SchemaFactory.createForClass(Participation);
