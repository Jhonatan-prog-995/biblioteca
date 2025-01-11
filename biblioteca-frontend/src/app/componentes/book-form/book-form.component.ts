import { Component, EventEmitter, Output } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {

  titulo: string = '';
  autor: string = '';
  ano: number | null = null;
  isSubmitting: boolean = false;  // Corrigido para "isSubmitting" (sem o "b" extra)

  @Output() bookCreated = new EventEmitter<any>();

  constructor(private bookService: BookService) {}

  addBook(): void {
    if (this.isSubmitting) return;  // Impede o envio múltiplo
    this.isSubmitting = true;
  
    const newBook = { titulo: this.titulo, autor: this.autor, ano: this.ano };
    this.bookService.addBook(newBook).subscribe(
      (book) => {
        this.bookCreated.emit(book);  // Emitir o evento com o livro adicionado
  
        // Limpar os campos após o cadastro
        this.titulo = '';
        this.autor = '';
        this.ano = null;
  
        this.isSubmitting = false;  // Libera o envio
      },
      (error) => {
        this.isSubmitting = false;  // Libera o envio mesmo que haja erro
        console.error('Erro ao adicionar livro:', error);
  
        // Se for um erro de duplicidade, exibe uma mensagem para o usuário
        if (error.status === 400) {
          alert('Este livro já foi cadastrado!');
        }
      }
    );
  }  
}
