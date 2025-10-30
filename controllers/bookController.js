// Importiamo il file di connessione al database
const connection = require('../data/db');

//  INDEX
function index(req, res) {
    console.log("hai richiesto la rotta index");
}

//  SHOW
function show(req, res) {
    console.log("hai richiesto la rotta show");
}

module.exports = { index, show }