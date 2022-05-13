import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroeImage'
})
export class HeroeImagePipe implements PipeTransform {

  transform(heroe: Heroe): string {

    // console.log(heroe.id, heroe.alt_img);

    if (heroe.id) return `assets/heroes/${ heroe.id }.jpg`;

    return heroe.alt_img || 'assets/no-image-png';
  }

}
