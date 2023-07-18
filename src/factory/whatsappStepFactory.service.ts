import { Injectable } from '@nestjs/common';
import {
  Participation,
  ParticipationDocument,
} from '../participation/schemas/participation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ParticipationStep } from 'src/participation/dto/participation-step.dto';
import { UpdateWhatsappDto } from '../whatsapp/dto/update-whatsapp.dto';
import { UpdateParticipationDto } from '../participation/dto/update-participation.dto';
import { NameRequestStepService } from 'src/steps/RequestName/NameRequestStep.service';
import { TranslatorService } from 'nestjs-translator';
import { TicketNumberRequestStepService } from 'src/steps/RequestTicketNumber/TicketNumberRequestStep.service';
import { TicketImageRequestStepService } from 'src/steps/RequestTicketImage/TicketImageRequestStep.service';
import { ConfirmRequestStepService } from 'src/steps/RequestConfirmStep/ConfirmRequestStep.service';

@Injectable()
export class WhatsappServiceFactory {
  constructor(
    @InjectModel(Participation.name)
    private participationtModel: Model<ParticipationDocument>,
    private nameRequestStep: NameRequestStepService,
    private ticketNumberRequestStep: TicketNumberRequestStepService,
    private ticketImageRequestStep: TicketImageRequestStepService,
    private confirmRequetsStep: ConfirmRequestStepService,
    private translator: TranslatorService,
  ) {}
  async createStep(
    participation: UpdateParticipationDto,
    updateWhatsappDto: UpdateWhatsappDto,
    file?: Express.Multer.File,
  ) {
    const { WaId } = updateWhatsappDto;
    const messages: string[] = [];
    let message: any;
    let message_two: any;

    switch (participation.step) {
      case ParticipationStep.GENERAL_MENU:
        message = this.translator.translate('welcome_message', {
          lang: 'es',
        });
        message_two = this.translator.translate('name_request', {
          lang: 'es',
        });

        message = [message, message_two];
        await this.participationtModel.findOneAndUpdate(
          { tel: WaId },
          { step: ParticipationStep.REQUEST_NAME_STEP },
          {
            new: true,
          },
        );
        messages.push(message);
        break;
      case ParticipationStep.REQUEST_NAME_STEP:
        message = await this.nameRequestStep.sendMessage(
          participation,
          updateWhatsappDto,
        );
        messages.push(message);
        break;
      case ParticipationStep.REQUEST_TICKET_NUMBER:
        message = await this.ticketNumberRequestStep.sendMessage(
          updateWhatsappDto,
        );
        messages.push(message);
        break;
      case ParticipationStep.REQUEST_TICKET_IMAGE:
        message = await this.ticketImageRequestStep.sendMessage(
          updateWhatsappDto,
          file,
        );
        messages.push(message);
        break;
      case ParticipationStep.CONFIRM_INFO_STEP:
        message = await this.confirmRequetsStep.sendMessage(updateWhatsappDto);
        messages.push(message);
        break;
      default:
        messages.push('ocurrio un error');
        return messages;
    }
    return messages;
  }
}
