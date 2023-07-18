import { Injectable, StreamableFile } from '@nestjs/common';
import {
  Participation,
  ParticipationDocument,
} from '../participation/schemas/participation.schema';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ParticipationStatus } from 'src/participation/dto/participation-status.dto';
import { ParticipationStep } from 'src/participation/dto/participation-step.dto';
import { WhatsappServiceFactory } from 'src/factory/whatsappStepFactory.service';

@Injectable()
export class WhatsappService {
  constructor(
    @InjectModel(Participation.name)
    private participationtModel: Model<ParticipationDocument>,
    private whatsappStepFactory: WhatsappServiceFactory,
  ) {}
  async initFlow(
    createWhatsappDto: CreateWhatsappDto,
    file?: Express.Multer.File,
  ) {
    const { WaId } = createWhatsappDto;

    let participation = await this.findOne(WaId);

    if (!participation) {
      participation = new this.participationtModel({
        tel: WaId,
        status: ParticipationStatus.STATUS_ON_PROGRESS,
        step: ParticipationStep.GENERAL_MENU,
      });

      await participation.save();
    }
    const messages = this.whatsappStepFactory.createStep(
      participation,
      createWhatsappDto,
      file,
    );

    return messages;
  }
  async findOne(tel: string): Promise<ParticipationDocument> {
    const participation = await this.participationtModel
      .findOne({
        tel,
      })
      .where('step')
      .ne(ParticipationStep.FINALIZED_STEP);
    return participation;
  }
}
