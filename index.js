let express = require('express')
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');
const cookieParser = require("cookie-parser")
let bcrypt = require('bcryptjs');
let mysql = require('mysql');
let fetch = require('node-fetch');

let app = express()




//VARIAVEIS GLOBAIS
let pegarDados
let pass
let objConvertidoCristao = {}

let con = mysql.createConnection({
  host: "remotemysql.com",
  user: "x34865z4yQ",
  password: "cP182dZwxP",
  database: "x34865z4yQ"
});

fs.readFile("./database/example.json", "utf8", function(err, data) {
  if (err) {
    return console.log("Erro ao ler arquivo")
  }

  let d = JSON.parse(data)
  pass = d.id1.usuarios
  console.log(d.id1.usuarios["0"])
  
})/*
function Save() {
 con.query("SELECT * FROM financeiro", 
      function (err, result, fields) {
        if (err) throw err;
          for( i= 0; i <= Object.keys(result).length-1; i++) {
          result.financeiro[i].id
          objConvertidoCristao.financeiro = {
                id: result[i].id,
                datahora: result[i].datahora,
                vendedor: result[i].vendedor,
                nropedido: result[i].nropedido,
                cliente: result[i].cliente,
                tipodefaturamento: result[i].tipodefaturamento,
                valordopedido: result[i].valordopedido,
                formapgto: result[i].formapgto,
                retiraentrega: result[i].retiraentrega,
                localdaentrega: result[i].localdaentrega,
                localdecobranca: result[i].localdecobranca,
                obs: result[i].obs,
                fretedestacado: result[i].fretedestacado,
                valorfrete: result[i].valorfrete,
                dataentrega: result[i].dataentrega,
                operadornf: result[i].operadornf,
                statusnf: result[i].statusnf,
                obsfinanceiro: result[i].obsfinanceiro,
                numeronf: result[i].numeronf,
                exped: result[i].exped,
                quemrecebeu: result[i].quemrecebeu
          }       
          console.log(objConvertidoCristao)
          }
          })
}
Save()
//*/
//DATABASE INIT
setInterval(() => {
  getDataDatabase(false)
}, 1000)
//-------------

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.text())
app.use(cookieParser())
app.use(cors({
  origin: 'https://projeto.andersonhenri15.repl.co'
}));

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
  console.log(req.cookies.login)
  res.render("login.ejs")
})

app.get("/home", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    res.render("home.ejs")
  } else {
    res.send("NAO AUTORIZADO")
  }
})


/*
 *-------------------------------
 *
 *          FORMULARIOS
 *
 *-------------------------------
 */


app.get("/financeiroformulario", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    res.render("bodyForm.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", superUser: "yes" })
  } else if (req.cookies.login == pass["1"].pass) {
    res.render("bodyForm.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", superUser: "yes" })
  } else {
    res.send("NAO AUTORIZADO")
  }
})


app.get("/exped2formulario", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    res.render("bodyForm.ejs", { pegar: "expedicao2", titulo: "EXPEDIÇÃO 2", superUser: "yes" })

  } else {
    res.send("NAO AUTORIZADO")
  }

})

app.get("/expedformulario", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    res.render("bodyForm.ejs", { pegar: "expedicao", titulo: "EXPEDIÇÃO 1", superUser: "yes" })

  } else {
    res.send("NAO AUTORIZADO")
  }
})

app.get("/logisticaformulario", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    res.render("bodyForm.ejs", { pegar: "logistica", titulo: "LOGISTICA", superUser: "yes" })

  } else {
    res.send("NAO AUTORIZADO")
  }
})

app.get("/saidaformulario", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    res.render("bodyForm.ejs", {
      pegar: "saida", titulo: "SAIDA", superUser: "yes"
    })

  } else {
    res.send("NAO AUTORIZADO")
  }
})

app.get("/retornoformulario", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    res.render("bodyForm.ejs", {
      pegar: "retorno", titulo: "RETORNO", superUser: "yes"
    })

  } else {
    res.send("NAO AUTORIZADO")
  }
})

app.get("/canhotoformulario", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    res.render("bodyForm.ejs", {
      pegar: "canhoto", titulo: "CANHOTO", superUser: "yes"
    })

  } else {
    res.send("NAO AUTORIZADO")
  }
})

/*
 *-------------------------------
 *
 *          TABELAS
 *
 *-------------------------------
 */


app.get("/financeiro", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {

    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", dados: pegarDados, i: 0, superUser: "yes" })
    })
  } else {
    res.send("NAO AUTORIZADO")
  }
})

app.get("/expedicao2", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {

    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "expedicao2", titulo: "EXPEDICAO 2", dados: pegarDados, superUser: "yes" })
    })
  } else {
    res.send("NAO AUTORIZADO")
  }
})

app.get("/expedicao", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "expedicao", titulo: "EXPEDICAO", dados: pegarDados, i: 0, superUser: "yes" })
    })

  } else {
    res.send("NAO AUTORIZADO")
  }
})

app.get("/logistica", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "logistica", titulo: "LOGISTICA", dados: pegarDados, i: 0, superUser: "yes" })
    })

  } else {
    res.send("NAO AUTORIZADO")
  }
})

app.get("/saida", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "saida", titulo: "SAIDA", dados: pegarDados, i: 0, superUser: "yes" })
    })

  } else {
    res.send("NAO AUTORIZADO")
  }
})

app.get("/retorno", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "retorno", titulo: "RETORNO", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }
})

app.get("/canhoto", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "canhoto", titulo: "CANHOTO", dados: pegarDados, i: 0, superUser: "yes" })
    })

  } else {
    res.send("NAO AUTORIZADO")
  }
})



/*
 * -------------------------------
 *
 *          DATABASE
 *
 *-------------------------------
 */
app.post('/verificarLogin', (req, res) => {
  let user_name = req.body.user;
  let password = req.body.password;
  //https://api.ipify.org/?format=json Login
  console.log(user_name + " " + password)
  for (let i = 0; i <= Object.keys(pegarDados.id1.usuarios).length - 1 - 1; i++) {
    if (pegarDados.id1.usuarios[i].user == user_name || pegarDados.id1.usuarios[i].pass == password) {
      res.cookie("login", req.body.password, { expires: new Date(Date.now() + 15000000), httpOnly: true })
      res.end("yes");
    }
  }
});

app.post('/registrarBancoDados', (req, res) => {
  //https://api.ipify.org/?format=json
  console.log(req.body)
  fs.writeFileSync('./database/example.json', req.body)
  res.json({ msg: "Registrado com Sucesso" })
});

app.get("/database", (req, res) => {
  fs.readFile("./database/example.json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }
    pegarDados = JSON.parse(data)
    res.json(pegarDados)
  })
})

/*
 *-------------------------------
 *
 *          FUNCÕES
 *
 *-------------------------------
 */

function getDataDatabase(escrever) {
  fs.readFile("./database/example.json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }
    pegarDados = JSON.parse(data)
  })
}



app.listen()