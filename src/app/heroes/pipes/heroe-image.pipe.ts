import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroeImage',
  pure: false
})
export class HeroeImagePipe implements PipeTransform {

  transform(heroe: Heroe): string {

    console.log('se procesó la imagen');

    if (heroe.alt_img) return heroe.alt_img;

    if (heroe.id) return `assets/heroes/${ heroe.id }.jpg`;

    return 'assets/no-image.png';
  }

}
