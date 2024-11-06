import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IPelicula } from 'src/app/models/pelicula.model';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';
import { SwiperOptions } from 'swiper/types';
import { ModalController } from '@ionic/angular/standalone';
import { DetallePeliculaComponent } from '../detalle-pelicula/detalle-pelicula.component';

@Component({
  selector: 'app-slider-poster',
  templateUrl: './slider-poster.component.html',
  styleUrls: ['./slider-poster.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ImagenPipe, CommonModule],
})
export class SliderPosterComponent implements AfterViewInit {
  @Input() peliculas: IPelicula[] = [];
  @Input() infinito: boolean = false;
  @Output() cargarMas = new EventEmitter;
  @ViewChild('swiperPoster', { static: false }) swiperContainer!: ElementRef;
  private modalCtrl = inject(ModalController);

  swiperParams: SwiperOptions = {
    slidesPerView: 3.1,
    loop: true,
    breakpoints: {
      640: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 5,
      },
    },
    on: {
      reachEnd: () => {
        if (!this.infinito) return;
        console.log('reachEnd');
        this.cargarMas.emit('Carga mas pelis');
      },
      init() {},
    },
  };
  constructor() {}

  ngAfterViewInit() {
    const swiperEl = this.swiperContainer.nativeElement;
    this.swiperParams.loop = !this.infinito;
    Object.assign(swiperEl!, this.swiperParams);
    swiperEl!.initialize();
  }
  async openModal( idPeli : number) {
    const modal = await this.modalCtrl.create({
      component: DetallePeliculaComponent,
      componentProps: {
        id: idPeli,
      },
    });
    modal.present();

  }
}
