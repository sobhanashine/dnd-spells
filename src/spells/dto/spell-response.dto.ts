// src/spells/dto/spell-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { GetSpellDto } from './get-spell.dto';

export class SpellResponse {
  @ApiProperty({ description: 'Number of spells returned' })
  count: number;

  @ApiProperty({ type: [GetSpellDto], description: 'List of spells' })
  spells: GetSpellDto[];
}
