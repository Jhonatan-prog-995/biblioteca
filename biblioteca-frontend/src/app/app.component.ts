import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  books: any[] = []; // Lista de livros

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks(); // Carrega os livros ao iniciar
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data; // Atualiza a lista de livros
    });
  }

  // Método para receber o livro criado do componente book-form
  onBookCreated(newBook: any): void {
    this.books.push(newBook); // Adiciona o novo livro à lista
  }

  // Método para adicionar um livro via BookService (usado por você em outros lugares)
  addBook(newBook: any): void {
    this.bookService.addBook(newBook).subscribe((book) => {
      this.books.push(book); // Adiciona o novo livro à lista
    });
  }

  // Método para excluir um livro
  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter((book) => book.id !== id); // Remove o livro da lista
    });
  }
}
