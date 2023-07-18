import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Twilio = require('twilio');
const { MessagingResponse } = require('twilio').twiml;

@Injectable()
export class TwilioSDKService {
  constructor(private readonly configService: ConfigService) {}

  async sendTemplate(body: string, tel: string) {
    const client = new Twilio(
      this.configService.get('TWILIO_ACCOUNT_SID'),
      this.configService.get('TWILIO_AUTH_TOKEN'),
    );

    return client.messages.create({
      body,
      from: `whatsapp:+${this.configService.get('TWILIO_NUMBER')}`,
      to: `whatsapp:+${tel}`,
    });
  }

  async sendMessage(messages: string, response) {
    const responseMessage = new MessagingResponse();
    for (const message of messages) {
      responseMessage.message(message);
    }
    return await response.send(responseMessage.toString());
  }
}
