import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edition-salon',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './edition-salon.component.html',
  styleUrl: './edition-salon.component.scss'
})
export class EditionSalonComponent implements OnInit {

  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);
  id: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    
  }

  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient)

  formulaire: FormGroup = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],

  });
 

  onAjoutSalon() {
    console.log(typeof(this.id));

    if (this.formulaire.valid) {
      this.http
        .post(`http://localhost:3000/serveur/ajout-salon/${this.id}`, this.formulaire.value)
        .subscribe((nouveauServeur) => {
          this.router.navigateByUrl('/principal');
        });
    }
  }

}
