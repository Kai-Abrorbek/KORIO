import { IsIn, IsString, MaxLength, MinLength } from 'class-validator';
import { SUPPORT_CATEGORIES } from '../schemas/support-ticket.schema';

export class CreateSupportTicketDto {
  @IsIn(SUPPORT_CATEGORIES)
  category: (typeof SUPPORT_CATEGORIES)[number];

  @IsString()
  @MinLength(4)
  @MaxLength(120)
  subject: string;

  @IsString()
  @MinLength(10)
  @MaxLength(4000)
  message: string;
}

export class ReplySupportTicketDto {
  @IsString()
  @MinLength(2)
  @MaxLength(4000)
  message: string;
}
