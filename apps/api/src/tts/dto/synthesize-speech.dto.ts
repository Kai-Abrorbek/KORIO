import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class SynthesizeSpeechDto {
  @IsString()
  @Length(1, 1000)
  text: string;

  @IsOptional()
  @IsIn(['ko-KR'])
  language?: 'ko-KR';

  @IsOptional()
  @IsNumber()
  @Min(0.25)
  @Max(2)
  rate?: number;

  @IsOptional()
  @IsIn(['female', 'male'])
  gender?: 'female' | 'male';
}
