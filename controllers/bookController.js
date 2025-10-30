// Importiamo il file di connessione al database
const connection = require('../data/db');

//  INDEX
function index(req, res) {

    // impostiamo la query
    const sql = 'SELECT * FROM books';

    // aggiungiamo la connesione per la richiesta
    connection.query(sql, (err, result) => {
        // gestiamo errore server mysql
        if (err) return res.status(500).json({ error: "Database error" })
        // ritorniamo il risultato ottenuto
        res.json(result);
    });

}

//  SHOW
function show(req, res) {
    // recuperiamo id da param
    const id = req.params.id;

    // prepariamo query per singolo libro
    const bookSql = 'SELECT * FROM books WHERE id = ?';

    // aggiungiamo la connesione per la richiesta
    connection.query(bookSql, [id], (err, bookResult) => {
        // gestiamo errore server mysql
        if (err) return res.status(500).json({ error: "Database error" })
        // gestiamo anche il 404
        if (bookResult.length === 0) res.status(404).json({ error: "Book not found" })
        // ritorniamo il risultato ottenuto
        res.json(bookResult[0]);
    });

}

module.exports = { index, show }