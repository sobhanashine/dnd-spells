import { Controller, Get } from '@nestjs/common';
import { SpellService } from './spell.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SpellDto } from './spell.dto'; // Import the DTO

@ApiTags('spells')
@Controller('spells')
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all spells',
    type: [SpellDto], // Use SpellDto instead of Spell
  })
  async getAllSpells(): Promise<SpellDto[]> {
    return this.spellService.getAllSpells(); // Call the service method to get spells
  }
}
