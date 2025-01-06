import { ApiProperty } from "@nestjs/swagger";

export class areaDto {
  @ApiProperty()
  id_Action: number;
  @ApiProperty()
  id_Reaction: number;
  @ApiProperty()
  argsAction: object;
  @ApiProperty()
  argsReaction: object;
  @ApiProperty()
  areaName: string;
}
