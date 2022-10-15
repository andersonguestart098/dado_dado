let express = require('express')
const Database = require("@replit/database")
const bodyParser = require("body-parser");
const fs = require("fs");

let app = express()
const db = new Database()


//VARIAVEIS GLOBAIS
let pegarDados
//----------------


//DATABASE INIT
setInterval(()=>{
  fs.readFile("./database/users.json" , "utf8",            function(err, data){  
      if(err){
        return console.log("Erro ao ler arquivo");
      }
      let jsonData = JSON.parse(data)
      console.log(jsonData)   
  })
})
//-------------

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let i = 0
setInterval(() => {
  db.get("ola").then(value => {
    pegarDados = value
  });
  db.set("ola", "Ola" + i).then(() => {

  });
  i++
}, 200);

let pessoas = [
  {
    'nome': 'Paulo',
    'idade': 12
  },
  {
    'nome': 'Jõao',
    'idade': 15,
  },
  {
    'nome': 'Marina',
    'idade': 25,
  },
]


/*
 *-------------------------------
 *
 *          INICIO
 *
 *-------------------------------
 */


app.get("/", (req, res) => {
  res.render("login.ejs")
})

app.get("/home", (req, res) => {
  res.render("home.ejs", { dados: pegarDados })
})


/*
 *-------------------------------
 *
 *          FORMULARIOS
 *
 *-------------------------------
 */


app.get("/financeiroformulario", (req, res) => {
  res.render("bodyForm.ejs")
})

app.get("/exped2formulario", (req, res) => {
  res.render("bodyForm.ejs")
})

app.get("/expedformulario", (req, res) => {
  res.render("bodyForm.ejs")
})

app.get("/logisticaformulario", (req, res) => {
  res.render("bodyForm.ejs")
})

app.get("/saidaformulario", (req, res) => {
  res.render("bodyForm.ejs")
})

app.get("/retornoformulario", (req, res) => {
  res.render("bodyForm.ejs")
})

/*
 *-------------------------------
 *
 *          TABELAS
 *
 *-------------------------------
 */

app.get("/Cretorno", (req, res) => {
  res.render("bodyList.ejs")
})

app.get("/Csaida", (req, res) => {
  res.render("bodyList.ejs")
})

app.get("/financeiro", (req, res) => {
  res.render("bodyList.ejs")
})

app.get("/exped2", (req, res) => {
  res.render("bodyList.ejs")
})

app.get("/exped", (req, res) => {
  res.render("bodyList.ejs")
})

app.get("/logistica", (req, res) => {
  res.render("bodyList.ejs")
})

app.get("/saida", (req, res) => {
  res.render("bodyList.ejs")
})

app.get("/retorno", (req, res) => {
  res.render("bodyList.ejs")
})


/*
 *-------------------------------
 *
 *          DATABASE
 *
 *-------------------------------
 */
app.post('/verificarLogin',(req, res) => {
let user_name = req.body.user;
let password = req.body.password;
//https://api.ipify.org/?format=json

console.log("User name = "+user_name+", password is "+password);
res.end("yes");
});



app.listen()