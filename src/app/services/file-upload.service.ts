import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  upload(files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    console.log(files)
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents`);
  }

  processFilesStep1(requestId:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/process/${requestId}`);
  }

  processFilesStep2(requestId:any, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/check-completion/${requestId}`, data);
  }

  chatbot(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/chatbot`, data);
  }
}
