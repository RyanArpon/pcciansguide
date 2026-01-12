import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  locations: any = [];

  constructor(private http: HttpClient) { }

  getLocations(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/data/locations.json`);
  }
}