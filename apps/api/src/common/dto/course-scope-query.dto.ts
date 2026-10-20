import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

/** Optional for old clients; services resolve omitted scope to the original course. */
export class CourseScopeQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-z][a-z0-9-]*$/)
  courseId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(35)
  @Matches(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/)
  targetLanguage?: string;
}
