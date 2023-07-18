import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Participation,
  ParticipationDocument,
} from 'src/participation/schemas/participation.schema';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationsService {
  constructor(
    @InjectModel(Participation.name)
    private readonly paeticipationModel: Model<ParticipationDocument>,
  ) {}

  async findAll() {
    return await this.paeticipationModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} participation`;
  }
}
