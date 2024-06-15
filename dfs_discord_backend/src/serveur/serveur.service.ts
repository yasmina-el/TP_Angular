// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Serveur, ServeurDocument } from './serveur.schema';
import {
  Utilisateur,
  UtilisateurDocument,
} from 'src/utilisateur/utilisateur.schema';

@Injectable()
export class ServeurService {
  constructor(
    @InjectModel(Serveur.name) private serveurModel: Model<ServeurDocument>,
    @InjectModel(Utilisateur.name)
    private utilisateurModel: Model<UtilisateurDocument>,
  ) {}

  async create(createdServeurDto: any): Promise<Serveur> {
    const createdServeur = new this.serveurModel(createdServeurDto);
    return createdServeur.save();
  }

  async findAllPublic(): Promise<Serveur[]> {
    return this.serveurModel.find({ public: true });
  }

  async findAllServerOfUser(email: string): Promise<Serveur[]> {
    const utilisateur = await this.utilisateurModel.findOne({ email });

    const serveurs = await this.serveurModel.find({
      _id: { $in: utilisateur.serveurs },
    });

    return serveurs;
  }

  async findOneSalon(idServeur: any, idSalon:any): Promise<any> {
    const serveur = await this.serveurModel.findOne({ 'salons.idSalon': idSalon},);
    for (let i = 0; i < serveur.salons.length; i++) {
      if (idSalon==serveur.salons[i].idSalon) {
        return serveur.salons[i].listMessage
      }
      
    }
    
  }

  async ajoutSalon(
    id: any,
    idSalon:string,
    nomSalon: string,  
  ): Promise<Serveur> {
    //on ajoute le salon a la liste des salons du serveur
    const serveur = await this.serveurModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { salons: {idSalon, nomSalon}} }, // $addToSet évite les duplications
      { new: true }, // Retourner le document mis à jour
    );

    return serveur;
  }


  async addMessageInSalon(idServeur: any, idSalon:any, email:any, message:string): Promise<Serveur> {

      const messageSalon = await this.serveurModel.findOneAndUpdate(
        { _id: idServeur, 'salons.idSalon': idSalon},
        { $push: { 'salons.$.listMessage': {email, message}} }, // $addToSet évite les duplications
        { new: true }, // Retourner le document mis à jour
      );
      
    return messageSalon
  }


}
