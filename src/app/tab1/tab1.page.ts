import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { PeliculaService } from '../services/pelicula.service';
import { IPelicula } from '../models/pelicula.model';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from '../pipes/imagen.pipe';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ImagenPipe, IonHeader, IonToolbar, CommonModule, IonTitle, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page implements OnInit {

  private pelisService = inject(PeliculaService);
  peliculasRecientes: IPelicula[] = [];
  constructor() {}

  ngOnInit(): void {
    this.pelisService.getPeliculas().subscribe({
      next: (res) => {
        console.log("Respuesta completa:", res); // Muestra toda la respuesta en la consola
        if (res && res.results) { // Verifica que res y res.results existen
          this.peliculasRecientes = res.results;
        } else {
          console.warn("La respuesta de la API no contiene resultados.");
          this.peliculasRecientes = []; // Asigna un arreglo vacío si no hay resultados
        }
      },
      error: (err) => {
        console.error("Error al obtener películas", err);
      }
    });
  }
}
