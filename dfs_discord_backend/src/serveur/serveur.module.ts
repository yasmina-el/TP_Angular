import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Serveur, ServeurSchema } from './serveur.schema';
import { ServeurController } from './serveur.controller';
import { ServeurService } from './serveur.service';
import {
  Utilisateur,
  UtilisateurSchema,
} from 'src/utilisateur/utilisateur.schema';
import { UuidService } from 'src/services/uuid.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Serveur.name, schema: ServeurSchema },
      { name: Utilisateur.name, schema: UtilisateurSchema },
    ]),
  ],
  providers: [ServeurService, UuidService],
  controllers: [ServeurController],
})
export class ServeurModule {}
