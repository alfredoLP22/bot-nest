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
import { TwilioSDKService } from 'src/services/twilioService/twilioSDK.service';

@Injectable()
export class TicketNumberRequestStepService {
  constructor(
    @InjectModel(Participation.name)
    private participationtModel: Model<ParticipationDocument>,
    private translator: TranslatorService,
    private readonly twilioSDk: TwilioSDKService,
  ) {}
  sendMessage(updateWhatsappDto?: UpdateWhatsappDto) {
    const { WaId, Body } = updateWhatsappDto;
    let message: string;

    if (!this.validTicket(Body)) {
      message = this.translator.translate('error_ticket', {
        lang: 'es',
        replace: {
          name: Body,
        },
      });
      return [message];
    }
    this.updateStep(WaId, Body, ParticipationStep.REQUEST_TICKET_IMAGE);

    message = this.translator.translate('ticket_image', {
      lang: 'es',
    });
    // this.twilioSDk.testTwilio(message, WaId);
    return [message];
  }
  private validTicket = (ticket: string): boolean => {
    return ticket.length < 7 && ticket.length >= 3 ? true : false;
  };

  updateStep = async (tel, body, step): Promise<void> => {
    return await this.participationtModel.findOneAndUpdate(
      { tel },
      { step, numberTicket: body },
      { new: true },
    );
  };
}
