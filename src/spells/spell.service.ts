// src/spells/spell.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GetSpellDto } from './dto/get-spell.dto';

@Injectable()
export class SpellService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any): Promise<{ count: number; spells: GetSpellDto[] }> {
    const where: any = {};

    if (query.spell_name) {
      where.spell_name = {
        contains: query.spell_name,
        mode: 'insensitive',
      };
    }
    if (query.level) {
      where.level = +query.level; // Convert level to number
    }
    if (query.school) {
      where.school = { contains: query.school, mode: 'insensitive' }; // Fuzzy search for school
    }
    if (query.ritual) {
      where.ritual = query.ritual === 'true';
    }

    const spells = await this.prisma.spell.findMany({
      where,
    });

    // Convert the Prisma `Spell` object into `GetSpellDto` object
    const spellDtos = spells.map(spell => ({
      id: spell.id,
      spell_name: spell.spell_name,
      ritual: spell.ritual,
      school: spell.school,
      tags: spell.tags,
      level: spell.level,
      casting_time: spell.casting_time,
      range: spell.range,
      components: spell.components,
      duration: spell.duration,
      description: spell.description,
      classes: spell.classes,
      source_book: spell.source_book,
    }));

    return {
      count: spellDtos.length, // Count of spells returned
      spells: spellDtos,
    };
  }
}
