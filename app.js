// importo il framework express
const express = require("express");
// creiamo un istanza di express
const app = express();
// impostiano un ref per il numero della porta
const port = 3000;

// importiamo modulo router books
// const pizzaRouter = require("./routers/pizzas")


// importiamo globalmente il middleware di gestione errore server
const errorServer = require("./middlewares/errorServer");
// importiamo globalmente il middleware di gestione 404 per rotta inesistente
const notFound = require("./middlewares/notFound");


// usiamo il middleware static di express (per rendere disponibile i file statici)
app.use(express.static('public'));

// registro il body-parser per "application/json"
app.use(express.json());


// rotte per i books
// app.use("/pizzas", pizzaRouter);

// impostiamo la rotta di home
app.get("/", (req, res) => {
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