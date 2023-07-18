import { Injectable } from '@nestjs/common';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationService {
  create(createParticipationDto: CreateParticipationDto) {
    return 'This action adds a new participant';
  }

  findAll() {
    return `This action returns all participant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participant`;
  }

  update(id: number, updateParticipationDto: UpdateParticipationDto) {
    return `This action updates a #${id} participant`;
  }

  remove(id: number) {
    return `This action removes a #${id} participant`;
  }
}
