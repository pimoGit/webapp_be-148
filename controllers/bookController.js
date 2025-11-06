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
    // const bookSql = 'SELECT * FROM books WHERE id = ?';
    const bookSql = `SELECT B.*, ROUND(AVG(R.vote)) AS average_vote
    FROM books B 
    LEFT JOIN reviews R 
    ON R.book_id = B.id 
    WHERE B.id = ?`

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

            singleBook.average_vote = parseInt(singleBook.average_vote);

            // ritorniamo il risultato ottenuto
            res.json(singleBook);
        });


    });

}

// Store review
function storeReview(req, res) {

    // recuperiamo id da param
    const id = req.params.id;

    // recuperiamo i dati nel body
    const { name, vote, text } = req.body;

    // prepariamo la query per la chiamata al DB
    const sql = 'INSERT INTO `reviews` (`name`, `vote`, `text`, `book_id`) VALUES (?,?,?,?)';

    // eseguiamo la query (con check preventivo dei dati)
    connection.query(sql, [name, vote, text, id], (err, result) => {
        // se c'è errore server DB
        if (err) return res.status(500).json({ error: 'Database queri failed' });
        // se va tutto bene
        res.status(201);
        res.json({ id: result.insertId, message: 'Review added' });
    })

}

// store book
function store(req, res) {
    const { title, author, abstract } = req.body;

    const imageName = `${req.file.filename}`;

    const query =
        "INSERT INTO books (title, author, image, abstract) VALUES (?, ?, ?, ?)";

    connection.query(
        query,
        [title, author, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"));
            }

            res.status(201).json({
                status: "success",
                message: "Libro creato con successo!",
            });
        })
}

module.exports = { index, show, storeReview, store }