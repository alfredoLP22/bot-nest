import { Injectable } from '@nestjs/common';
import {
  Participation,
  ParticipationDocument,
} from '../../participation/schemas/participation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ParticipationStep } from 'src/participation/dto/participation-step.dto';
import { UpdateWhatsappDto } from '../../whatsapp/dto/update-whatsapp.dto';
import { UpdateParticipationDto } from '../../participation/dto/update-participation.dto';
import { TranslatorService } from 'nestjs-translator';

@Injectable()
export class ConfirmRequestStepService {
  constructor(
    @InjectModel(Participation.name)
    private participationtModel: Model<ParticipationDocument>,
    private translator: TranslatorService,
  ) {}
  sendMessage(updateWhatsappDto?: UpdateWhatsappDto) {
    const { WaId, Body } = updateWhatsappDto;
    let message: string;

    if (!this.validName(Body)) {
      message = this.translator.translate('error_name', {
        lang: 'es',
        replace: {
          name: Body,
        },
      });
      return [message];
    }

    this.updateStep(WaId, Body, ParticipationStep.REQUEST_TICKET_NUMBER);

    message = this.translator.translate('ticket_number', {
      lang: 'es',
    });
    return [message];
  }
  private validName = (name: string): boolean => {
    const regex = /^[a-zA-Z áéíóúÁÉÍÓÚñÑs]+$/;
    return regex.test(name) ? true : false;
  };

  updateStep = async (tel, name, step): Promise<void> => {
    return await this.participationtModel.findOneAndUpdate(
      { tel },
      { step, nameParticipant: name },
      { new: true },
    );
  };
}
