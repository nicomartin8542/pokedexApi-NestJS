import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  //id : string; // no hace falta por que mongo ya me lo da Mongo me lo da

  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const pokemonSchema = SchemaFactory.createForClass(Pokemon);
