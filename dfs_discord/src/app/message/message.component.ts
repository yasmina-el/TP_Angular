import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [MatButtonModule ,MatInputModule,ReactiveFormsModule,FormsModule,MatSnackBarModule,],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);
  // urlChange!: Subscription;
  listMsg: any;
  @Input() idServeur: any;
  @Input() idSalon: any;


  constructor(private route: ActivatedRoute) {}

  getListMessage(){

    this.http
          .get<any>(`http://localhost:3000/serveur/ajout-message/${this.idServeur}/${this.idSalon}`)
          .subscribe((listMessage) => (this.listMsg= listMessage));

  }

  ngOnInit(){
    const jwt = localStorage.getItem('jwt');
    
    // this.idServeur = this.route.snapshot.paramMap.get('idServeur');
    // this.idSalon = this.route.snapshot.paramMap.get('idSalon');
    
    if (jwt) {
      if (jwt) {
        this.getListMessage()
 
      }
      
    }

    // this.urlChange = this.route.paramMap.subscribe(params => {
    //   const newIdSalon = params.get('idSalon');
    //   const newIdServeur = params.get('idServeur');
    //   if (newIdSalon !== this.idSalon) {

    //     this.idSalon = newIdSalon;
    //     this.idServeur=newIdServeur

    //     this.getListMessage()
        
    //   }
    // });
    
  
  }
 
  ngOnChanges(changes: SimpleChanges) {
    if (changes['idSalon'] || changes['idServeur']) {
      console.log(this.idSalon);
      
      this.getListMessage();
    }
  }

  formulaire_msg : FormGroup = this.formBuilder.group({
    message: ['',[Validators.required]]

});

Onsubmit(){
  if (this.formulaire_msg.valid) {
    
    // console.log(this.formulaire_msg.value.message);

    this.http
        .post(`http://localhost:3000/serveur/ajout-message/${this.idServeur}/${this.idSalon}`, this.formulaire_msg.value)
        .subscribe((nouveauServeur) => {
          
          // this.router.navigateByUrl(`/principal/${this.idServeur}/${this.idSalon}`);
          this.getListMessage()
        });

  }
 
  
}

}
