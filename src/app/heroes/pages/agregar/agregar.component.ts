import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {
  
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('agregar')) return;
    
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroeById(id) )
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  save() {

    if (this.heroe.superhero.trim().length === 0) return;

      if (this.heroe.id) {
        // update
        this.heroesService.updateHeroe( this.heroe )
          .subscribe(heroe => this.showSnackBar('Heroe Actualizado!'))
      } else {
        // create
        this.heroesService.addHeroe( this.heroe )
          .subscribe(heroe => {
            this.router.navigate(['/heroes/editar',heroe.id]);
            this.showSnackBar('Heroe Creado!');
          });
      }

  }

  deleteHeroe() {
    const dialog = this._dialog.open(ConfirmComponent, {
      width: '275px',
      height: '225px',
      data: { ...this.heroe }
    });

    dialog.afterClosed().subscribe(
      result => {
        if (!result) return;

          this.heroesService.deleteHeroe( this.heroe.id! )
            .subscribe(resp => {
              this.router.navigate(['/heroes']);
            });
      }
    );
  }

  showSnackBar( message: string ): void {
    this._snackBar.open( message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

}
