import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonGrid,
} from '@ionic/angular/standalone';
import { PeliculaService } from '../services/pelicula.service';
import { IPelicula } from '../models/pelicula.model';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from '../pipes/imagen.pipe';
import { SwiperOptions } from 'swiper/types';
import { SliderBackdroComponent } from '../components/slider-backdro/slider-backdro.component';
import { SliderPosterComponent } from '../components/slider-poster/slider-poster.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    ImagenPipe,
    IonHeader,
    IonToolbar,
    CommonModule,
    IonTitle,
    IonContent,
    SliderBackdroComponent,
    SliderPosterComponent
  ]
})
export class Tab1Page implements OnInit {
  private pelisService = inject(PeliculaService);
  peliculasRecientes: IPelicula[] = [];
  peliculasCartelera: IPelicula[] = [];
  peliculasPopulares: IPelicula[] = [];

  constructor() {}

  ngOnInit(): void {
    this.pelisService.getPeliculas().subscribe({
      next: (res) => {
        // console.log('Respuesta completa:', res); // Muestra toda la respuesta en la consola
        if (res && res.results) {
          // Verifica que res y res.results existen
          this.peliculasRecientes = res.results;
        } else {
          console.warn('La respuesta de la API no contiene resultados.');
          this.peliculasRecientes = []; // Asigna un arreglo vacío si no hay resultados
        }
      },
      error: (err) => {
        console.error('Error al obtener películas', err);
      },
    });

    this.pelisService.getCartelera().subscribe({
      next: (res) => {
        // console.log('Respuesta completa:', res); // Muestra toda la respuesta en la consola
        if (res && res.results) {
          // Verifica que res y res.results existen
          this.peliculasCartelera = res.results;
        } else {
          console.warn('La respuesta de la API no contiene resultados.');
          this.peliculasCartelera = []; // Asigna un arreglo vacío si no hay resultados
        }
      },
      error: (err) => {
        console.error('Error al obtener películas', err);
      },
    });

    this.getPopulares();
  }
  private getPopulares()
  {
    this.pelisService.getPopulares().subscribe({
      next: (res) => {
        // console.log('Respuesta completa:', res); // Muestra toda la respuesta en la consola
        if (res && res.results) {
          // Verifica que res y res.results existen
          this.peliculasPopulares = [...this.peliculasPopulares, ...res.results];
          // this.peliculasPopulares = res.results;
        } else {
          console.warn('La respuesta de la API no contiene resultados.');
          this.peliculasPopulares = []; // Asigna un arreglo vacío si no hay resultados
        }
      },
      error: (err) => {
        console.error('Error al obtener películas', err);
      },
    });
  }

  cargarMasPelis(){
    this.getPopulares();
  }
}
