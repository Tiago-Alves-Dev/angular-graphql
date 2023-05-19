import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor() {}

  getInfoCep(cep: string) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
