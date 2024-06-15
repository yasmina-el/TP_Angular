import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServeurDocument = Serveur & Document;

@Schema()
export class Serveur {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  nom: string;

  @Prop({ maxlength: 100 })
  description: string;

  @Prop()
  urlLogo: string;

  @Prop()
  public: boolean;

  @Prop()
  salons: Salon[];
}

export const ServeurSchema = SchemaFactory.createForClass(Serveur);

export type SalonDocument = Salon & Document;
@Schema()
export class Salon {
  @Prop()
  idSalon: string

  @Prop()
  nomSalon:string

  @Prop()
  listMessage:[{email:string,message:string}]

}

export const SalonSchema = SchemaFactory.createForClass(Salon);
