import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { IPelicula } from 'src/app/models/pelicula.model';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';
import { SwiperOptions } from 'swiper/types';
import {ModalController } from '@ionic/angular/standalone';
import { DetallePeliculaComponent } from '../detalle-pelicula/detalle-pelicula.component';

@Component({
  selector: 'app-slider-backdro',
  templateUrl: './slider-backdro.component.html',
  styleUrls: ['./slider-backdro.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ImagenPipe, CommonModule],
})
export class SliderBackdroComponent implements AfterViewInit {
  @Input() peliculas: IPelicula[] = [];
  @ViewChild('swiperBackdrop', {static:false}) swiperContainer! : ElementRef;

  private modalCtrl = inject(ModalController);
  swiperParams : SwiperOptions = {
    slidesPerView: 1.1,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    on: {
      init() {
        // ...
      },
    },
  };
  constructor() {}

  ngAfterViewInit() {
    const swiperEl = this.swiperContainer.nativeElement;
    Object.assign(swiperEl!, this.swiperParams);
    swiperEl!.initialize();
  }

  async openModal( idPeli : number) {
    console.log(" id seleccionado ", idPeli);
    const modal = await this.modalCtrl.create({
      component: DetallePeliculaComponent,
      componentProps: {
        id: idPeli,
      },
    });
    modal.present();

  }
}
