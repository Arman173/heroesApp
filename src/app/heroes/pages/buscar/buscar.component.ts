import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSuggestion( this.termino )
      .subscribe( heroes => this.heroes = heroes );
  }
  
  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {

    if ( !event.option.value ) return;

      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;
      this.heroesService.getHeroeById( heroe.id! )
        .subscribe( heroe => this.heroeSeleccionado = heroe );
  }
}
