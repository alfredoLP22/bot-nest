import { Module } from '@nestjs/common';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioSDKService } from './twilioSDK.service';

@Module({
  providers: [TwilioSDKService],
  imports: [
    // TwilioModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configs: ConfigService) => ({
    //     accountSid: configs.get('TWILIO_ACCOUNT_SID'),
    //     authToken: configs.get('TWILIO_AUTH_TOKEN'),
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  exports: [TwilioSDKService],
})
export class TwilioSDKModule {}
