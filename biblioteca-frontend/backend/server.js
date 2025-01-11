const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'biblioteca',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados: MySql.');
  }
});

// Rota para buscar livros
app.get('/books', (req, res) => {
  db.query('SELECT * FROM livros', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Rota para adicionar um livro
app.post('/books', (req, res) => {
  const { titulo, autor, ano } = req.body;
  // Verifique se o livro já existe no banco de dados
  const checkQuery = 'SELECT * FROM livros WHERE titulo = ? AND autor = ? AND ano = ?';
  db.query(checkQuery, [titulo, autor, ano], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send(err);
      }
      
      // Se já existir, retorna um erro
      if (results.length > 0) {
          return res.status(400).send({ message: 'Este livro já está cadastrado.' });
      }
      
      // Caso contrário, insere o novo livro
      const query = 'INSERT INTO livros (titulo, autor, ano) VALUES (?, ?, ?)';
      db.query(query, [titulo, autor, ano], (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).send(err);
          } else {
              res.status(201).send({ id: results.insertId, titulo, autor, ano });
          }
      });
  });
});




// Rota para excluir um livro
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM livros WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir o livro:', err);
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
