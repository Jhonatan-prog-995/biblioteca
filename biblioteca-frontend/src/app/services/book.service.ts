import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }


  // Método para obter todos os livros
  getBooks(): Observable<any>{
    return this.http.get(this.apiUrl).pipe(
    );
  }

  // Método para adicionar um livro
  addBook(book: any): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

   //Método para excluir um livro
   deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
