import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './schemas/user.schema';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles.interface';
import { UserRoleGuard } from './guards/user-role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-user')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('test')
  @RoleProtected(ValidRoles.kam, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  async checkAunth(@GetUser() user: User) {
    return { user };
  }
}
