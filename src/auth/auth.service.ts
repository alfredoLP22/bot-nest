import {
  Injectable,
  Logger,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...userInfo } = createUserDto;

      const user = new this.userModel({
        email: userInfo.email,
        password: bcrypt.hashSync(password, 10),
        nameUser: userInfo.nameUser,
      });
      await user.save();
      this.logger.log(
        `User was created successfully with email ${userInfo.email}`,
      );
      return user;
    } catch (exception) {
      this.logger.error(
        `exception: ${exception} '${Object.keys(exception.keyValue)}'`,
      );
      throw new ConflictException(
        `exception: ${exception} '${Object.keys(exception.keyValue)}'`,
      );
    }
  }
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Password are not valid');
    }
    return { token: this.getJwtToken({ id: user.id }) };
  }
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
