import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetHouseResponse} from '../models/get-house-response';

@Injectable({
  providedIn: 'root'
})
export class FileDocumentService {


  private apiUrl = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) { }

  public getDocuments(): Observable<GetHouseResponse> {
    return this.http.get<GetHouseResponse>(this.apiUrl + '/v1/file');
  }
}
