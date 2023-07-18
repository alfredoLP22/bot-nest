import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'El email es un campo necesario para el registro' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'El password debe ser de minimo 6 caracteres' })
  @MaxLength(20, { message: 'El password debe ser de maximo 20 caractres' })
  @IsNotEmpty({ message: 'El password es un campo necesario para el registro' })
  password: string;
}
