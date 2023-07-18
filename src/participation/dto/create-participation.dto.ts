import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ParticipationStatus } from './participation-status.dto';
import { ParticipationStep } from './participation-step.dto';

export class CreateParticipationDto {
  @IsString()
  @IsOptional()
  readonly tel: string;

  @IsEnum(ParticipationStatus)
  @IsOptional()
  status: ParticipationStatus;

  @IsEnum(ParticipationStep)
  @IsOptional()
  step: ParticipationStep;

  @IsString()
  @IsOptional()
  nameParticipant: string;

  @IsString()
  @IsOptional()
  numberTicket: string;

  @IsString()
  @IsOptional()
  imageTicket: string;

  @IsDate()
  @IsOptional()
  readonly createdAt: Date;
}
