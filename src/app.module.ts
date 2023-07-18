import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipationModule } from './participation/participation.module';
import { TranslatorModule } from 'nestjs-translator';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ParticipationsModule } from './admin/participations/participations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WhatsappModule,
    MongooseModule.forRoot('mongodb://localhost/bot-nest', {
      useNewUrlParser: true,
    }),
    TranslatorModule.forRoot({
      global: true,
      defaultLang: 'es',
      translationSource: '/src/translations',
    }),
    ParticipationModule,
    AuthModule,
    ParticipationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
