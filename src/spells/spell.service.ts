// src/spells/spell.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GetSpellDto } from './dto/get-spell.dto';

@Injectable()
export class SpellService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any): Promise<{ count: number; spells: GetSpellDto[] }> {
    const where: any = {};

    // Filter for spell name (case-insensitive)
    if (query.spell_name) {
      where.spell_name = {
        contains: query.spell_name,
        mode: 'insensitive',
      };
    }

    // Handle multiple components (single or array)
    if (query.components) {
      where.components = Array.isArray(query.components)
        ? { in: query.components }
        : { contains: query.components };
    }

    // Handle multiple tags (single or array)
    if (query.tags) {
      where.tags = Array.isArray(query.tags)
        ? { in: query.tags }
        : { contains: query.tags };
    }

    // Handle multiple classes (single or array)
    if (query.classes) {
      where.classes = Array.isArray(query.classes)
        ? { in: query.classes }
        : { contains: query.classes };
    }

    // Filter for level
    if (query.level) {
      where.level = +query.level; // Convert level to number
    }

    // Fuzzy search for school (case-insensitive)
    if (query.school) {
      where.school = { contains: query.school, mode: 'insensitive' };
    }

    // Filter for ritual (boolean)
    if (query.ritual) {
      where.ritual = query.ritual === 'true';
    }

    // Fetch spells with sorting (level first, then spell name)
    const spells = await this.prisma.spell.findMany({
      where,
      orderBy: [
        { level: 'asc' }, // Sort by level in ascending order
        { spell_name: 'asc' }, // Sort by spell name alphabetically
      ],
    });

    // Convert the Prisma `Spell` object into `GetSpellDto` object
    const spellDtos = spells.map((spell) => ({
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

  // New function for fetching a single spell by id
  async getSpellById(id: number) {
    const spell = await this.prisma.spell.findUnique({
      where: { id },
      select: {
        id: true,
        spell_name: true,
        level: true,
        school: true,
        tags: true,
        ritual: true,
        casting_time: true,
        range: true,
        components: true,
        duration: true,
        description: true,
        classes: true,
        source_book: true,
      },
    });

    if (!spell) {
      throw new NotFoundException(`Spell with id ${id} not found`);
    }

    return spell;
  }
}
