import { SpellModule } from './spell/spell.module'; // Import the SpellModule

import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { PrismaModule } from 'prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    SpellModule, // Include SpellModule
    PrismaModule, // Include PrismaModule to ensure its services are available
  ],
  // List of providers (services)
})
export class AppModule {}
