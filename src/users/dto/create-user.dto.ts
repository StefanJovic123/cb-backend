import {
  IsEmail,
  IsBoolean,
  IsString,
  Length,
  Matches,
  IsOptional,
  Validate,
} from 'class-validator';
import { MinPhotoCount } from 'src/decorators/min-photo-count';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @Length(2, 25, {
    message: 'First Name must have between 2 and 25 characters',
  })
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'First Name must only contain alphanumeric characters and spaces',
  })
  firstName: string;

  @IsString()
  @Length(2, 25, { message: 'Last Name must have between 2 and 25 characters' })
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'Last Name must only contain alphanumeric characters and spaces',
  })
  lastName: string;

  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsString()
  @Length(6, 50)
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean = true;

  avatar?: string;

  @Validate(MinPhotoCount, [4], {
    message: 'At least 4 photos must be uploaded.',
  })
  photos: Express.Multer.File[];
}
