// importo il framework express
const express = require("express");
// creiamo un istanza di express
const app = express();
// impostiano un ref per il numero della porta
const port = 3000;

// importiamo modulo router books
const bookRouter = require("./routers/bookRouter")


// importiamo globalmente il middleware di gestione errore server
const errorServer = require("./middlewares/errorServer");
// importiamo globalmente il middleware di gestione 404 per rotta inesistente
const notFound = require("./middlewares/notFound");

// importiamo middleware gestione path imgs
const imagePath = require("./middlewares/imagePath");

// importiamo middleware CORS
const cors = require("cors");



// middleware per il CORS
app.use(cors({
    origin: process.env.FE_APP
}));

// usiamo il middleware static di express (per rendere disponibile i file statici)
app.use(express.static('public'));

// registro il body-parser per "application/json"
app.use(express.json());

// registro il middleware gestione path imgs per le rotte
app.use(imagePath);

// rotte per i books
app.use("/api/books", bookRouter);

// impostiamo la rotta di home
app.get("/api", (req, res) => {
    console.log("hai richiesto la rotta di index");
    res.send('<h1>Ecco la home della API della nostra libreria</h1>')
})


// richiamo middleware gestione errori server
app.use(errorServer);

// richiamo middleware gestione errore 404 rotta inesistente
app.use(notFound);




// mettiamo in ascolto il server sulla porta definita
app.listen(port, () => {
    console.log(`Books app listening on port ${port}`);
});