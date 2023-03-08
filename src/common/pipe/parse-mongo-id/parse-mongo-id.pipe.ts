import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
//Creamos un pipe customizado para validar los parametros que nos llegan por el reguest
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`Value "${value}" is not MongoId valid`);
    }

    return value;
  }
}
