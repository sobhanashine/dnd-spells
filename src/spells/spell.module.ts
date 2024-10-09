// src/spell/spell.module.ts
import { Module } from '@nestjs/common';
import { SpellService } from './spell.service';
import { SpellController } from './spell.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [SpellController],
  providers: [SpellService, PrismaService],
})
export class SpellModule {}
