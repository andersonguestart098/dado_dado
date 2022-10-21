let express = require('express');
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
let objConvertidoCristao = {
  financeiro: {
    
  }
}

let con = mysql.createPool({
  host: "remotemysql.com",
  user: "x34865z4yQ",
  password: "cP182dZwxP",
  database: "x34865z4yQ",
  connectionLimit: 1000
});

fs.readFile("./database/example.json", "utf8", function(err, data) {
  if (err) {
    return console.log("Erro ao ler arquivo")
  }

  let d = JSON.parse(data)
  pass = d

})


      //
//*/
//DATABASE INIT

/*con.query("SELECT * FROM financeiro",
  function(err, result, fields) {
    if (err) throw err;
    for (prop in result) {
      objConvertidoCristao.financeiro[prop] = {
        id: result[prop].id,
        dataHora: result[prop].datahora,
        vendedor: result[prop].vendedor,
        nropedido: result[prop].nropedido,
        cliente: result[prop].cliente,
        tipodefaturamento: result[prop].tipodefaturamento,
        valordopedido: result[prop].valordopedido,
        formapgto: result[prop].formapgto,
        retiraentrega: result[prop].retiraentrega,
        localdaentrega: result[prop].localdaentrega,
        localdecobranca: result[prop].localdecobranca,
        obs: result[prop].obs1,
        fretedestacado: result[prop].fretedestacado,
        valorfrete: result[prop].valorfrete,
        dataentrega: result[prop].dataentrega,
        operadornf: result[prop].operadornf,
        statusnf: result[prop].statusnf,
        obsfinanceiro: result[prop].obs2,
        numeronf: result[prop].numeronf,
        exped: result[prop].exped,
        quemrecebeu: result[prop].quemrecebeu
      }
    }
    fs.writeFileSync('./database/users.json', JSON.stringify(objConvertidoCristao, null, 2))
   })*/

setInterval(() => {
  getDataDatabase(false)
}, 5000)
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
  for(let i = 0; i <= Object.keys(pass).length-1; i++) {
  if (req.cookies.login == pass.id1.usuarios[i].pass) {
    res.render("home.ejs", {nome: pass.id1.usuarios[i].nome})
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    res.render("home.ejs", {nome: pass.id1.usuarios[i].nome})
  }
}
    res.render("pageError.ejs")
})

app.get("/teste", (req, res) => {
  res.render("pageError.ejs")
})


/*
 *-------------------------------
 *
 *          FORMULARIOS
 *
 *-------------------------------
 */


app.get("/financeiroformulario", (req, res) => {
  fs.readFile("./database/example.json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }
    data = JSON.parse(data)
  
    for(let i = 0; i <= Object.keys(data).length-1; i++) {
  if(req.cookies.login == null){
      res.render("pageError.ejs")
    } else if (req.cookies.login == data.id1.usuarios[i].pass) {
    res.render("bodyForm.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", superUser: "yes" })
  }else if(req.cookies.superUser == data.id1.usuarios[i].pass){
    res.render("bodyForm.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", superUser: "yes" })
    }
  }
  })
})

app.get("/exped2formulario", (req, res) => {
  for(let i = 0; i <= Object.keys(pass).length-1; i++) {
  if(req.cookies.login == null){
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    res.render("bodyForm.ejs", { pegar: "expedicao2", titulo: "EXPEDIÇÃO 2"})
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    res.render("bodyForm.ejs", { pegar: "expedicao2", titulo: "EXPEDIÇÃO 2"})
    }
  }
})

app.get("/expedformulario", (req, res) => {
for(let i = 0; i <= Object.keys(pass).length-1; i++) {
   if(req.cookies.login == null){
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    res.render("bodyForm.ejs", { pegar: "expedicao", titulo: "EXPEDIÇÃO 1", superUser: "yes" })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    res.render("bodyForm.ejs", { pegar: "expedicao", titulo: "EXPEDIÇÃO 1", superUser: "yes" })
  }
  }

})

app.get("/logisticaformulario", (req, res) => {

  for(let i = 0; i <= Object.keys(pass).length-1; i++) {
    if(req.cookies.login == null){
      res.render("pageError.ejs")
    }else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    res.render("bodyForm.ejs", { pegar: "logistica", titulo: "LOGISTICA", superUser: "yes" })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    res.render("bodyForm.ejs", { pegar: "logistica", titulo: "LOGISTICA", superUser: "yes" })
  }
  }
    
})

app.get("/saidaformulario", (req, res) => {
 for(let i = 0; i <= Object.keys(pass).length-1; i++) {
    if(req.cookies.login == null){
      res.render("pageError.ejs")
    }else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    res.render("bodyForm.ejs", { pegar: "saida", titulo: "SAIDA", superUser: "yes" })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    res.render("bodyForm.ejs", { pegar: "saida", titulo: "SAIDA", superUser: "yes" })
  }
  }
   
})

app.get("/retornoformulario", (req, res) => {
 for(let i = 0; i <= Object.keys(pass).length-1; i++) {
    if(req.cookies.login == null){
      res.render("pageError.ejs")
    }else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    res.render("bodyForm.ejs", { pegar: "retorno", titulo: "RETORNO", superUser: "yes" })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    res.render("bodyForm.ejs", { pegar: "retorno", titulo: "RETORNO", superUser: "yes" })
  }
  }
    
})

app.get("/canhotoformulario", (req, res) => {
 for(let i = 0; i <= Object.keys(pass).length-1; i++) {
    if(req.cookies.login == null){
      res.render("pageError.ejs")
    }else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    res.render("bodyForm.ejs", { pegar: "canhoto", titulo: "CANHOTO", superUser: "yes" })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    res.render("bodyForm.ejs", { pegar: "canhoto", titulo: "CANHOTO", superUser: "yes" })
  }
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
  for(let i = 0; i <= Object.keys(pass).length-1; i++) {
  if(req.cookies.login == null){
      res.render("pageError.ejs")
    }else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

    pegarDados = JSON.parse(data)
    res.render("bodyList.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", dados: pegarDados, i: 0})
      })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

    pegarDados = JSON.parse(data)
    res.render("bodyList.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", dados: pegarDados, i: 0})
      })
  }
  }
    
})

app.get("/expedicao2", (req, res) => {
  for(let i = 0; i <= Object.keys(pass).length-1; i++) {
  if(req.cookies.login == null){
      res.render("pageError.ejs")
    }else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "expedicao2", titulo: "EXPEDICAO 2", dados: pegarDados, superUser: "yes" })
    })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "expedicao2", titulo: "EXPEDICAO 2", dados: pegarDados, superUser: "yes" })
    })
  }
  }
    //pageError
    
})

app.get("/expedicao", (req, res) => {
  for(let i = 0; i <= Object.keys(pass).length-1; i++) {
  if(req.cookies.login == null){
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "expedicao", titulo: "EXPEDICAO", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "expedicao", titulo: "EXPEDICAO", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }
  }
    //pageError
  
})

app.get("/logistica", (req, res) => {
  for(let i = 0; i <= Object.keys(pass).length-1; i++) {
  if(req.cookies.login == null){
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "logistica", titulo: "LOGISTICA", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "logistica", titulo: "LOGISTICA", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }
  }
    //pageError
  
})

app.get("/saida", (req, res) => {
  for(let i = 0; i <= Object.keys(pass).length-1; i++) {
  if(req.cookies.login == null){
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "saida", titulo: "SAIDA", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "saida", titulo: "SAIDA", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }
  }
    //pageError
  

})

app.get("/retorno", (req, res) => {
  for(let i = 0; i <= Object.keys(pass).length-1; i++) {
  if(req.cookies.login == null){
      res.render("pageError.ejs")
    }else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "retorno", titulo: "RETORNO", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "retorno", titulo: "RETORNO", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }
  }
  //pageError
   
})

app.get("/canhoto", (req, res) => {
  for(let i = 0; i <= Object.keys(pass).length-1; i++) {
  if(req.cookies.login == null){
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "canhoto", titulo: "CANHOTO", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }else if(req.cookies.superUser == pass.id1.usuarios[i].pass){
    //render
    fs.readFile("./database/example.json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      pegarDados = JSON.parse(data)
      res.render("bodyList.ejs", { pegar: "canhoto", titulo: "CANHOTO", dados: pegarDados, i: 0, superUser: "yes" })
    })
  }
  }
    //pageError
})



/*
 * -------------------------------
 *
 *          DATABASE
 *
 *-------------------------------
 */
app.get("/logout", (req, res) => {
  res.clearCookie("login");
  res.clearCookie("superUser");
  res.redirect('https://projeto.andersonhenri15.repl.co');
})

app.post('/verificarLogin', (req, res) => {
  let user_name = req.body.user;
  let password = req.body.password;
  //https://api.ipify.org/?format=json Login
  console.log(user_name + " " + password)
  
  for (let i = 0; i <= Object.keys(pegarDados.id1.usuarios).length- 1; i++) {
    if (pegarDados.id1.usuarios[i].user == user_name || pegarDados.id1.usuarios[i].pass == password) {

      if(pegarDados.id1.usuarios[i].superUser){
        res.cookie("superUser", req.body.password, { expires: new Date(Date.now() + 15000000), httpOnly: true })
      }else {
      res.cookie("login", req.body.password, { expires: new Date(Date.now() + 15000000), httpOnly: true })
      }
      res.end("yes");
    }
  }
});

app.post('/registrarBancoDados', (req, res) => {
  //https://api.ipify.org/?format=json
  fs.writeFileSync('./database/example.json', req.body)
  res.json({ msg: "Registrado com Sucesso" })
});

app.get("/database", (req, res) => {
  if (req.cookies.login == pass["0"].pass) {
  fs.readFile("./database/example.json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }
    pegarDados = JSON.parse(data)
    res.json(pegarDados)
  })
}else {
    res.render("pageError.ejs")
    
}})

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