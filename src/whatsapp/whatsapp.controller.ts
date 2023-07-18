import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { TwilioSDKService } from 'src/services/twilioService/twilioSDK.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly twilioSDk: TwilioSDKService,
  ) {}

  @Post('twilio')
  // @UseInterceptors(
  //   FileInterceptor('MediaContentType', {
  //     fileFilter: fileFilter,
  //     storage: diskStorage({
  //       destination: './participations/tickets/',
  //       filename: fileNamer,
  //     }),
  //   }),
  // )
  @UseInterceptors(FileInterceptor('MediaContentType'))
  async create(
    @Body() createWhatsappDto: CreateWhatsappDto,
    @Res() response,
    @UploadedFile() MediaContentType?: Express.Multer.File,
  ) {
    let message;
    message = await this.whatsappService.initFlow(
      createWhatsappDto,
      MediaContentType,
    );
    return response.send({ message });
    return await this.twilioSDk.sendMessage(message, response);
    return { message };
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Body() createWhatsappDto: CreateWhatsappDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.whatsappService.initFlow(createWhatsappDto, file);
  }
}
