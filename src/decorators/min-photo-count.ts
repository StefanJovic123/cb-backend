import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function MinPhotoCount(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Express.Multer.File, propertyName: string) {
    registerDecorator({
      name: 'minPhotoCount',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min],
      options: validationOptions,
      validator: {
        validate(value: any[], args: ValidationArguments) {
          return value instanceof Array && value.length >= args.constraints[0];
        },
        defaultMessage(args: ValidationArguments) {
          return `At least ${args.constraints[0]} photos must be uploaded.`;
        },
      },
    });
  };
}
