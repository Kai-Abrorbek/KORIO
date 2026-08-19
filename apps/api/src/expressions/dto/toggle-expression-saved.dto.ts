import { IsBoolean } from 'class-validator';

export class ToggleExpressionSavedDto {
  @IsBoolean()
  isSaved: boolean;
}
