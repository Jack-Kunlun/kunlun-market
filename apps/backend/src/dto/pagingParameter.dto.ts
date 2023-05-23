import { IsNotEmpty, IsNumber } from "class-validator";

export class PagingParameterDto {
  @IsNumber()
  @IsNotEmpty()
  readonly current: number;

  @IsNumber()
  @IsNotEmpty()
  readonly pageSize: number;
}
