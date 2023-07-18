import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/schemas/user.schema';

@Controller('participations')
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService) {}

  @Get('list')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  async findAll(@GetUser() user: User) {
    const participations = await this.participationsService.findAll();
    return { user, participations };
  }

  @Get(':id')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  findOne(@Param('id') id: string) {
    return this.participationsService.findOne(+id);
  }
}
