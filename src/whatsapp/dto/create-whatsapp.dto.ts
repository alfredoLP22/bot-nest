import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWhatsappDto {
  @IsNotEmpty({
    message: 'El numero de telefono es obligatorio',
  })
  @IsString()
  WaId: string;

  @IsNotEmpty({
    message: 'Este valor no puede ser nulo',
  })
  @IsString()
  Body: string;
}
