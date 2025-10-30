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
    console.log("hai richiesto la rotta show");
}

module.exports = { index, show }