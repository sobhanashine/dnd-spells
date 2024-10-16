import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GetSpellDto {
  @ApiProperty({ description: 'ID of the spell', required: false })
  @IsOptional()
  @Type(() => Number)
  id?: number;

  @ApiProperty({ description: 'Name of the spell', required: false })
  @IsString()
  @IsOptional()
  spell_name?: string;

  @ApiProperty({
    description: 'Whether the spell is a ritual or not',
    required: false,
    example: 'true', // or 'false'
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return 'true';
    if (value === 'false') return 'false';
    return undefined;
  })
  ritual?: string; // Changed to string

  @ApiProperty({
    description: 'School of magic to which the spell belongs',
    required: false,
  })
  @IsString()
  @IsOptional()
  school?: string;

  @ApiProperty({ description: 'Tags related to the spell', required: false })
  @IsString()
  @IsOptional()
  tags?: string;

  @ApiProperty({ description: 'Level of the spell', required: false })
  @IsOptional()
  @Type(() => Number)
  level?: number;

  @ApiProperty({ description: 'Casting time of the spell', required: false })
  @IsString()
  @IsOptional()
  casting_time?: string;

  @ApiProperty({ description: 'Range of the spell', required: false })
  @IsString()
  @IsOptional()
  range?: string;

  @ApiProperty({
    description: 'Components required for the spell',
    required: false,
  })
  @IsString()
  @IsOptional()
  components?: string;

  @ApiProperty({ description: 'Duration of the spell', required: false })
  @IsString()
  @IsOptional()
  duration?: string;

  @ApiProperty({ description: 'Description of the spell', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Classes that can cast the spell',
    required: false,
  })
  @IsString()
  @IsOptional()
  classes?: string;

  @ApiProperty({ description: 'Source book of the spell', required: false })
  @IsString()
  @IsOptional()
  source_book?: string;
}
