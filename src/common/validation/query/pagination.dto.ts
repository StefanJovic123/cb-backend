import { IsOptional, IsInt, Min } from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
