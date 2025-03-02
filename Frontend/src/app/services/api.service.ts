import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/users';

  async getUsers() {
    return axios.get(this.apiUrl);
  }

  async addUser(user: any) {
    return axios.post(this.apiUrl, user);
  }
}
