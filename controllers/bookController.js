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

        // prepariamo versione listato books con valore image completo
        const books = result.map(book => {
            return {
                ...book,
                image: req.imagePath + book.image
            }
        });

        // ritorniamo il risultato ottenuto
        res.json(books);
    });

}

//  SHOW
function show(req, res) {
    // recuperiamo id da param
    const id = req.params.id;

    // prepariamo query per singolo libro
    const bookSql = 'SELECT * FROM books WHERE id = ?';

    // prepariamo la query per reviews del book
    const reviewSql = 'SELECT * FROM reviews WHERE book_id = ?';

    // aggiungiamo la connesione per la richiesta
    connection.query(bookSql, [id], (err, bookResult) => {
        // gestiamo errore server mysql
        if (err) return res.status(500).json({ error: "Database error" })
        // gestiamo anche il 404
        if (bookResult.length === 0) return res.status(404).json({ error: "Book not found" })

        // creiamo oggetto singolo libro
        const singleBook = bookResult[0];
        singleBook.image = req.imagePath + singleBook.image;


        // aggiungiamo connesione per richiesta reviews relative
        connection.query(reviewSql, [id], (err, reviewResult) => {
            // gestiamo errore server mysql
            if (err) return res.status(500).json({ error: "Database error" })
            // aggiungiamo le reviews sull'oggetto del singolo libro
            singleBook.reviews = reviewResult;


            // ritorniamo il risultato ottenuto
            res.json(singleBook);
        });


    });

}

module.exports = { index, show }