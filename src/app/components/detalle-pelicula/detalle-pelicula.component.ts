import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import {
  IonContent,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonToggle,
  IonItem,
  IonIcon, IonNote, IonChip } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, starOutline, thumbsUp } from 'ionicons/icons';
import { Cast, IDetallePelicula } from 'src/app/models/pelicula.model';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.scss'],
  standalone: true,
  imports: [IonChip, IonNote,
    IonIcon,
    IonItem,
    IonToggle,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonLabel,
    IonContent,
    CommonModule,
    ImagenPipe,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetallePeliculaComponent implements OnInit, AfterViewInit{
  @Input() id: number = 0;
  @ViewChild('swiperActores', { static: false }) swiperContainer!: ElementRef;
  detallePeli?: IDetallePelicula;
  actoresPeli : Cast[] = [];
  oculto : number = 150;

  swiperParams: SwiperOptions = {
    slidesPerView: 3.1,
    freeMode: false,
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
      },
      init() {},
    },
  };

  private pelisServ = inject(PeliculaService);
  constructor() {
    addIcons({
      thumbsUp,
      starOutline,
      arrowBackOutline,


    });
  }

  ngAfterViewInit(): void {
    const swiperEl = this.swiperContainer.nativeElement;
    Object.assign(swiperEl!, this.swiperParams);
    swiperEl!.initialize();
  }

  ngOnInit() {
    console.log('detalle-pelicula del ID=', this.id);
    this.getDetallePelicula();
    this.getCreditosPelicula();
  }

  getDetallePelicula() {
    this.pelisServ.getDetallePelicula(this.id).subscribe({
      next: (res) => {
        console.log('Detalle de la película:', res);
        this.detallePeli = res;
      },
      error: (err) => {
        console.error('Error al obtener el detalle de la película:', err);
      },
    });
  }

  getCreditosPelicula(){
    this.pelisServ.getCreditosPeli(this.id).subscribe({
      next: (res) => {
        console.log('Creditos de la película:', res);
        this.actoresPeli = res.cast;
      },
      error: (err) => {
        console.error('Error al obtener los créditos de la película:', err);
      },
    });
  }

  favoritos(){

  }

  regresar(){

  }
}
