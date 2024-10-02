import { Module } from '@nestjs/common';
import { SpellController } from './spell.controller';
import { SpellService } from './spell.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Ensure PrismaModule is imported to access PrismaService
  controllers: [SpellController],
  providers: [SpellService],
})
export class SpellModule {}
