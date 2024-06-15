import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ServeurService } from './serveur.service';
import { AuthGuard } from 'src/auth.guard';
import { UuidService } from '../services/uuid.service';

@Controller('serveur')
export class ServeurController {
  constructor(private readonly serveurService: ServeurService, private readonly uuidService:UuidService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() requete) {
    console.log(requete.user.sub);

    return this.serveurService.findAllPublic();
  }

  @Get('/ajout-message/:idServeur/:idSalon')
  @UseGuards(AuthGuard)
  displayListMessage(@Param('idServeur') idServeur: any,@Param('idSalon') idSalon: any)
  {
    return this.serveurService.findOneSalon(idServeur,idSalon);
  }

  @Get('/possede')
  @UseGuards(AuthGuard)
  findAllServerOfUser(@Request() requete) {
    return this.serveurService.findAllServerOfUser(requete.user.sub);
  }

  @Post()
  async create(@Body() createServeurDto: any) {
    return this.serveurService.create(createServeurDto);
  }

  @Post('/ajout-salon/:id')
  @UseGuards(AuthGuard)
  async ajoutSalonServeur(
    @Body() salonAjouter: any, @Param('id') idServeur: any
  ) {
    return this.serveurService.ajoutSalon(
      idServeur,
      this.uuidService.generateUniqueId(),
      salonAjouter.nom
    );
  }

  @Post('/ajout-message/:idServeur/:idSalon')
  @UseGuards(AuthGuard)
  async findListMessage(
    @Param('idServeur') idServeur: any,@Param('idSalon') idSalon: any, @Request() requete,@Body() message: any
  ) {
    console.log(idSalon,requete.user.sub);
    
    return this.serveurService.addMessageInSalon(
      idServeur, idSalon, requete.user.sub, message.message
    );
  }
}
