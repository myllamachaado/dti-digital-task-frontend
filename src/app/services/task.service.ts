import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiServerUrl = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/tasks`);
  }

  create(data : any): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/tasks`, data);
  }

  delete(id : any): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/tasks/${id}`);
  }
  

}
