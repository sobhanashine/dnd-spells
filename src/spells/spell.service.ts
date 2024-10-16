// src/spells/spell.service.ts
import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GetSpellDto } from './dto/get-spell.dto';
import { equal } from 'assert';
import { startWith } from 'rxjs';

@Injectable()
export class SpellService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    query: GetSpellDto,
  ): Promise<{ count: number; spells: GetSpellDto[] }> {
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
      // Extract components (everything before '('), trim it
      const we = query.components.split('(')[0].trim(); // This will split off any description

      // Check for each component condition
      if (we === 'V') {
        if (query.components.trim() === 'V') {
          where.components = {
            equals: 'V', // Exact match for 'V'
          };
        }
      } else if (we === 'S') {
        if (query.components.trim() === 'S') {
          where.components = {
            equals: 'S', // Exact match for 'S'
          };
        }
      } else if (we === 'M') {
        // Handle 'M' with any additional text after it
        if (query.components.includes('M')) {
          where.components = {
            equals: 'M', // Match for 'M' regardless of additional descriptions
          };
        }
      } else if (we === 'V, S') {
        if (query.components.trim() === 'V, S') {
          where.components = {
            equals: 'V, S', // Exact match for 'V, S'
          };
        }
      } else if (we === 'V, M') {
        if (query.components.includes('V, M')) {
          where.components = {
            equals: 'V, M', // Match for 'V, M'
          };
        }
      } else if (we === 'S, M') {
        if (query.components.includes('S, M')) {
          where.components = {
            startsWith: 'S, M', // Match for 'S, M'
          };
        }
      } else if (we === 'V, S, M') {
        if (query.components.includes('V, S, M')) {
          where.components = {
            startsWith: 'V, S, M', // Match for 'M' regardless of additional descriptions
          };
        }
      }
    }

    // Handle multiple tags (single or array)
    if (query.tags) {
      const we = query.tags.split(' ');
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

    // filter for range
    if (query.range) {
      where.range = { contains: query.range, mode: 'insensitive' };
    }

    // Fuzzy search for school (case-insensitive)
    if (query.school) {
      where.school = { contains: query.school, mode: 'insensitive' };
    }

    // Handle ritual filter
    if (query.ritual !== undefined) {
      where.ritual = query.ritual === 'true'; // Convert 'true'/'false' to boolean
    }

    // filter for casting_time
    if (query.casting_time) {
      where.casting_time = query.casting_time;
    }

    if (query.description) {
      const des = query.description.split(' ')[0];
      if (des == 'Unknown') {
        where.description = query.description;
      }
    }

    // Fetch spells with sorting (level first, then spell name)
    const spells = await this.prisma.spell.findMany({
      where,
      orderBy: [
        { level: 'asc' }, // Sort by level in ascending order
        { spell_name: 'asc' }, // Sort by spell name alphabetically
      ],
    });
    // spells.forEach((spell) => {
    //   console.log(`${spell.id}`);
    // });
    // Convert the Prisma `Spell` object into `GetSpellDto` object
    const spellDtos: GetSpellDto[] = spells.map((spell) => {
      const dto = new GetSpellDto(); // Create a new instance of GetSpellDto
      dto.id = spell.id;
      dto.spell_name = spell.spell_name;
      dto.ritual = spell.ritual ? 'true' : 'false'; // Convert to string
      dto.school = spell.school;
      dto.tags = spell.tags;
      dto.level = spell.level;
      dto.casting_time = spell.casting_time;
      dto.range = spell.range;
      dto.components = spell.components;
      dto.duration = spell.duration;
      dto.description = spell.description;
      dto.classes = spell.classes;
      dto.source_book = spell.source_book;
      return dto;
    });

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
