// src/spells/dto/get-spell.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class GetSpellDto {
  @ApiProperty({ description: 'ID of the spell' })
  id: number;

  @ApiProperty({ description: 'Name of the spell' })
  spell_name: string;

  @ApiProperty({ description: 'Whether the spell is a ritual or not' })
  ritual: boolean;

  @ApiProperty({ description: 'School of magic to which the spell belongs' })
  school: string;

  @ApiProperty({ description: 'Tags related to the spell' })
  tags: string;

  @ApiProperty({ description: 'Level of the spell' })
  level: number;

  @ApiProperty({ description: 'Casting time of the spell' })
  casting_time: string;

  @ApiProperty({ description: 'Range of the spell' })
  range: string;

  @ApiProperty({ description: 'Components required for the spell' })
  components: string;

  @ApiProperty({ description: 'Duration of the spell' })
  duration: string;

  @ApiProperty({ description: 'Description of the spell' })
  description: string;

  @ApiProperty({ description: 'Classes that can cast the spell' })
  classes: string;

  @ApiProperty({ description: 'Source book of the spell' })
  source_book: string;
}
