import { ApiProperty } from '@nestjs/swagger';

export class SpellDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  spell_name: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  casting_time: string;

  @ApiProperty()
  range: string;

  @ApiProperty()
  components: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  classes: string;

  @ApiProperty()
  source_book: string;

  @ApiProperty({ required: false })
  school?: string; // Optional field

  @ApiProperty({ required: false })
  tag?: string; // Optional field
}
