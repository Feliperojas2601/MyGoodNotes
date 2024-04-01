import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = environment.apiUrl;

  constructor(
    public http: HttpClient
  ) {}

  public getBooks() {
    return this.http.get(`${this.apiUrl}/book`);
  }

  public createBook(title: string) {
    return this.http.post(`${this.apiUrl}/book`, { title });
  }

  public updateBook(id: string, title: string) {
    return this.http.put(`${this.apiUrl}/book/${id}`, { title });
  }

  public deleteBook(id: string) {
    return this.http.delete(`${this.apiUrl}/book/${id}`);
  }

}
