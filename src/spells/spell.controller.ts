// src/spells/spell.controller.ts
import { Controller, Get, Query, Param } from '@nestjs/common';
import { SpellService } from './spell.service';
import { GetSpellDto } from './dto/get-spell.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { SpellResponse } from './dto/spell-response.dto';

@ApiTags('Spells')
@Controller('spells')
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @ApiOperation({ summary: 'Get all spells or filter by any field' })
  @ApiQuery({
    name: 'spell_name',
    required: false,
    description: 'Filter by spell name',
  })
  @ApiQuery({ name: 'level', required: false, description: 'Filter by level' })
  @ApiQuery({
    name: 'school',
    required: false,
    description: 'Filter by school',
  })
  @ApiQuery({
    name: 'ritual',
    required: false,
    description: 'Filter by ritual (true/false)',
  })
  @ApiQuery({ name: 'tags', required: false, description: 'Filter by tags' })
  @ApiQuery({
    name: 'casting_time',
    required: false,
    description: 'Filter by casting time',
  })
  @ApiQuery({ name: 'range', required: false, description: 'Filter by range' })
  @ApiQuery({
    name: 'components',
    required: false,
    isArray: false,
    description: 'List of spell components to filter (S, M, V)',
  })
  @ApiQuery({
    name: 'duration',
    required: false,
    description: 'Filter by duration',
  })
  @ApiQuery({
    name: 'classes',
    required: false,
    description: 'Filter by classes',
  })
  @ApiResponse({
    status: 200,
    description: 'List of spells with count',
    type: SpellResponse, // Reference the SpellResponse DTO here
  })
  // get all teh spells
  @Get()
  async findAll(@Query() query: any): Promise<SpellResponse> {
    // Use SpellResponse here
    return this.spellService.findAll(query);
  }
  // New route for fetching a single spell by id
  @Get(':id')
  async getSingleSpell(@Param('id') id: string) {
    return this.spellService.getSpellById(Number(id)); // Convert id to number if it's an integer
  }
}
