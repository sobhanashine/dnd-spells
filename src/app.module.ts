// src/app.module.ts
import { Module } from '@nestjs/common';
import { SpellModule } from './spells/spell.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [SpellModule, PrismaModule], // Register the modules
})
export class AppModule {}
