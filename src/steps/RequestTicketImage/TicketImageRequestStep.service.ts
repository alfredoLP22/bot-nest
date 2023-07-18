import { Injectable } from '@nestjs/common';
import {
  Participation,
  ParticipationDocument,
} from '../../participation/schemas/participation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ParticipationStep } from 'src/participation/dto/participation-step.dto';
import { UpdateWhatsappDto } from '../../whatsapp/dto/update-whatsapp.dto';
import { TranslatorService } from 'nestjs-translator';
import { AwsS3Service } from 'src/services/Aws/AwsS3.service';
const fs = require('fs');
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { UploadLocalFileService } from 'src/services/Files/UploadLocalFile.service';

@Injectable()
export class TicketImageRequestStepService {
  constructor(
    @InjectModel(Participation.name)
    private participationtModel: Model<ParticipationDocument>,
    private translator: TranslatorService,
    private awsS3Service: AwsS3Service,
    private uploadLocalFile: UploadLocalFileService,
  ) {}
  async sendMessage(
    updateWhatsappDto?: UpdateWhatsappDto,
    file?: Express.Multer.File,
  ) {
    const { WaId, Body } = updateWhatsappDto;
    let message: string;

    // this.twilioSDk.testTwilio(message, WaId);
    const imageTicket = await this.uploadLocalFile.uploadFile(file);

    this.updateStep(WaId, imageTicket, ParticipationStep.CONFIRM_INFO_STEP);

    const participation = await this.findParticipation(WaId);

    message = this.translator.translate('confirm_info', {
      lang: 'es',
      replace: {
        nameParticipant: participation.nameParticipant,
        ticketNumber: participation.numberTicket,
      },
    });

    return [message];
  }

  updateStep = async (
    tel: string,
    imageTicket: string,
    step: ParticipationStep,
  ): Promise<void> => {
    return await this.participationtModel.findOneAndUpdate(
      { tel },
      { step, imageTicket },
      { new: true },
    );
  };

  findParticipation = async (tel): Promise<ParticipationDocument> => {
    const participation = await this.participationtModel.findOne({ tel });
    return participation;
  };
}
