import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Serveur } from '../../models/serveur.type';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MessageComponent } from '../../message/message.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatTooltipModule, MatSelectModule,MessageComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
})
export class PrincipalComponent implements OnInit{
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  listeServeur: Serveur[] = [];
  show=false;
  idServeur: any;
  idSalon: any;
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');


    if (jwt) {
      this.http
        .get<Serveur[]>('http://localhost:3000/serveur/possede')
        .subscribe((listeServeur) => (this.listeServeur = listeServeur));
    }
  }

  redirect(idServeur:any,idSalon:any){
    this.show=true
    // this.router.navigateByUrl(`/principal/${idServeur}/${idSalon}`);
    this.idServeur=idServeur;
    this.idSalon=idSalon;
   
    
    
  }

}
