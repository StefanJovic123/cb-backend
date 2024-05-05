import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdParams } from 'src/common/validation/params/idParams.dto';
import { PaginationQuery } from 'src/common/validation/query/pagination.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

// Function to validate file types
const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

// Function to customize file storage and filename
const editFileName = (req, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();
  const randomName = Array(12)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}.${fileExtName}`);
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos', maxCount: 10 }], {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
    }),
  )
  async create(@UploadedFiles() files, @Body() createUserDto: CreateUserDto) {
    createUserDto.photos = files.photos;
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() paginationQuery: PaginationQuery) {
    return this.usersService.findAll({ ...paginationQuery });
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param() params: IdParams) {
    return this.usersService.findOne(params.id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param() params: IdParams, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param() params: IdParams) {
    return this.usersService.remove(params.id);
  }
}
