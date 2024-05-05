import { IsInt, Min } from 'class-validator';

export class IdParams {
  @IsInt()
  @Min(1)
  id: number;
}
