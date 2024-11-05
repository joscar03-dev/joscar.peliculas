import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRespuestaTMDB } from '../models/pelicula.model';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  private http = inject(HttpClient);

  constructor() {}

  private ejecutarQuery<T>(query: string) {
    const url = `${URL}/${query}&api_key=${apiKey}`;
    console.log('Request URL:', url);
    return this.http.get<T>(url);
  }

  getPeliculas() {
    const hoy = new Date();
    const ultimoDia = new Date(
      hoy.getFullYear(),
      hoy.getMonth() + 1,
      0
    ).getDate();
    const numMes = hoy.getMonth() + 1;

    let strMes = numMes < 10 ? '0' + numMes : numMes;
    const fInicio = `${hoy.getFullYear()}-${strMes}-01`;
    const fFin = `${hoy.getFullYear()}-${strMes}-${ultimoDia}`;

    return this.ejecutarQuery<IRespuestaTMDB>(
      `discover/movie?primary_release_date.gte=${fInicio}&primary_release_date.lte=${fFin}&primary_release_date.`
    );
  }
}
