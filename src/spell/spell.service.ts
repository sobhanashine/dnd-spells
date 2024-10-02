import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Spell } from '@prisma/client';
import { SpellDto } from './spell.dto'; // Import the DTO

@Injectable()
export class SpellService {
  constructor(private readonly prisma: PrismaService) {}

  // Method to get all spells
  async getAllSpells(): Promise<SpellDto[]> {
    const spells: Spell[] = await this.prisma.spell.findMany(); // Fetch all spells from the database
    return spells.map(spell => ({
      id: spell.id,
      spell_name: spell.spell_name,
      level: spell.level,
      casting_time: spell.casting_time,
      range: spell.range,
      components: spell.components,
      duration: spell.duration,
      description: spell.description,
      classes: spell.classes,
      source_book: spell.source_book,
      school: spell.school,
      tag: spell.tag,
    }));
  }
}
