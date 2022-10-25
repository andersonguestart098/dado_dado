let express = require('express');
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');
const cookieParser = require("cookie-parser")
let bcrypt = require('bcryptjs');
const Excel = require('exceljs');

let app = express()




//VARIAVEIS GLOBAIS
let pegarDados
let pass
let corrente = "teste"

fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
  if (err) {
    return console.log("Erro ao ler arquivo")
  }

  let d = JSON.parse(data)
  pass = d

})

setInterval(() => {
  getDataDatabase(false)
}, 5000)
//-------------

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.text())
app.use(cookieParser())
app.use(cors({
  origin: 'https://projeto.andersonhenri15.repl.co'
}));

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
  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    if (req.cookies.login == pass.id1.usuarios[i].pass) {
      res.render("home.ejs", { nome: pass.id1.usuarios[i].nome })
    } else if (req.cookies.superUser == pass.id1.usuarios[i].pass) {
      res.render("home.ejs", { nome: pass.id1.usuarios[i].nome })
    }
  }
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

    for (let i = 0; i <= Object.keys(data).length - 1; i++) {
      if (req.cookies.login == null) {
        res.render("pageError.ejs")
      } else if (req.cookies.login == data.id1.usuarios[i].pass) {
        res.render("bodyForm.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", superUser: "yes" })
      } else if (req.cookies.superUser == data.id1.usuarios[i].pass) {
        res.render("bodyForm.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", superUser: "yes" })
      }
    }
  })
})

app.get("/exped2formulario", (req, res) => {
  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    if (req.cookies.login == null) {
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "expedicao2", titulo: "EXPEDIÇÃO 2" })
    } else if (req.cookies.superUser == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "expedicao2", titulo: "EXPEDIÇÃO 2" })
    }
  }
})

app.get("/expedformulario", (req, res) => {
  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    if (req.cookies.login == null) {
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "expedicao", titulo: "EXPEDIÇÃO 1", superUser: "yes" })
    } else if (req.cookies.superUser == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "expedicao", titulo: "EXPEDIÇÃO 1", superUser: "yes" })
    }
  }

})

app.get("/logisticaformulario", (req, res) => {

  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    if (req.cookies.login == null) {
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "logistica", titulo: "LOGISTICA", superUser: "yes" })
    } else if (req.cookies.superUser == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "logistica", titulo: "LOGISTICA", superUser: "yes" })
    }
  }

})

app.get("/saidaformulario", (req, res) => {
  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    if (req.cookies.login == null) {
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "saida", titulo: "SAIDA", superUser: "yes" })
    } else if (req.cookies.superUser == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "saida", titulo: "SAIDA", superUser: "yes" })
    }
  }

})

app.get("/retornoformulario", (req, res) => {
  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    if (req.cookies.login == null) {
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "retorno", titulo: "RETORNO", superUser: "yes" })
    } else if (req.cookies.superUser == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "retorno", titulo: "RETORNO", superUser: "yes" })
    }
  }

})

app.get("/canhotoformulario", (req, res) => {
  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    if (req.cookies.login == null) {
      res.render("pageError.ejs")
    } else if (req.cookies.login == pass.id1.usuarios[i].pass) {
      res.render("bodyForm.ejs", { pegar: "canhoto", titulo: "CANHOTO", superUser: "yes" })
    } else if (req.cookies.superUser == pass.id1.usuarios[i].pass) {
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

app.get("/financeiro", (req, res, next) => {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    let d = JSON.parse(data)

    res.render("bodyList.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", dados: d, i: 0 })
  })
})

app.get("/expedicao2", (req, res) => {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    let d = JSON.parse(data)

    res.render("bodyList.ejs", { pegar: "expedicao2", titulo: "EXPEDIÇÃO 2", dados: d, i: 0, superUser: "yes" })
  })
})

app.get("/expedicao", (req, res) => {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    let d = JSON.parse(data)

    res.render("bodyList.ejs", { pegar: "expedicao", titulo: "EXPEDIÇÃO", dados: d, i: 0, superUser: "yes" })
  })
})

app.get("/logistica", (req, res) => {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    let d = JSON.parse(data)
    pass = d

  })



  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    let password = pass.id1.usuarios[i].pass
    if (req.cookies.login != null || req.cookies.superUser != null) {

      if (req.cookies.login == password) {
        //render
        res.render("bodyList.ejs", { pegar: "logistica", titulo: "LOGISTICA", dados: pass, i: 0, superUser: "yes" })
      } else if (req.cookies.superUser == password) {
        //render
        res.render("bodyList.ejs", { pegar: "logistica", titulo: "LOGISTICA", dados: pass, i: 0, superUser: "yes" })
      }
    } else {
      res.render("pageError.ejs")
    }
  }
})

app.get("/saida", (req, res) => {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    let d = JSON.parse(data)
    pass = d

  })


  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    let password = pass.id1.usuarios[i].pass
    if (req.cookies.login != null || req.cookies.superUser != null) {

      if (req.cookies.login == password) {
        //render
        res.render("bodyList.ejs", { pegar: "saida", titulo: "SAIDA", dados: pass, i: 0, superUser: "yes" })
      } else if (req.cookies.superUser == password) {
        //render
        res.render("bodyList.ejs", { pegar: "saida", titulo: "SAIDA", dados: pass, i: 0, superUser: "yes" })
      }
    } else {
      res.render("pageError.ejs")
    }
  }
})

app.get("/retorno", (req, res) => {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    let d = JSON.parse(data)
    pass = d

  })


  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    let password = pass.id1.usuarios[i].pass
    if (req.cookies.login != null || req.cookies.superUser != null) {

      if (req.cookies.login == password) {
        //render
        res.render("bodyList.ejs", { pegar: "retorno", titulo: "RETORNO", dados: pass, i: 0, superUser: "yes" })
      } else if (req.cookies.superUser == password) {
        //render
        res.render("bodyList.ejs", { pegar: "retorno", titulo: "RETORNO", dados: pass, i: 0, superUser: "yes" })
      }
    } else {
      res.render("pageError.ejs")
    }
  }
})

app.get("/canhoto", (req, res) => {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    let d = JSON.parse(data)
    pass = d

  })



  for (let i = 0; i <= Object.keys(pass).length - 1; i++) {
    let password = pass.id1.usuarios[i].pass
    if (req.cookies.login != null || req.cookies.superUser != null) {

      if (req.cookies.login == password) {
        //render
        res.render("bodyList.ejs", { pegar: "canhoto", titulo: "CANHOTO", dados: pass, i: 0, superUser: "yes" })
      } else if (req.cookies.superUser == password) {
        //render
        res.render("bodyList.ejs", { pegar: "canhoto", titulo: "CANHOTO", dados: pass, i: 0, superUser: "yes" })
      }
    } else {
      res.render("pageError.ejs")
    }
  }
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

  for (let i = 0; i <= Object.keys(pegarDados.id1.usuarios).length - 1; i++) {
    if (pegarDados.id1.usuarios[i].user == user_name || pegarDados.id1.usuarios[i].pass == password) {

      if (pegarDados.id1.usuarios[i].superUser) {
        res.cookie("superUser", req.body.password, { expires: new Date(Date.now() + 15000000), httpOnly: true })
      } else {
        res.cookie("login", req.body.password, { expires: new Date(Date.now() + 15000000), httpOnly: true })
      }
      res.end("yes");
    }
  }
});

app.post("/mudancaBancoDados", (req, res) => {
  fs.writeFileSync('./database/' + corrente + '.json', req.body)
  res.json({ msg: "Registrado com Sucesso" })
})

app.post('/registrarBancoDados', (req, res) => {
  let numeroDaSeção = 0
  numeroDaSeção++
  console.log(req.body)
  let dataReq = JSON.parse(req.body)
  console.log(dataReq)
  let pegar = req.headers.sector
  //fs.writeFileSync('./database/example.json', )
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    let dados = JSON.parse(data)
    let objAtual = Object.keys(dados[pegar]).length + numeroDaSeção - 1
    const d = new Date()

    let dateFormated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`

    if (isEmpty(dados[objAtual])) {
      dados["passagem"][objAtual] = {
        id: objAtual,
        dataHora: dateFormated,
        numeronf: dataReq.numeronf,
        exped: dataReq.exped
      }
    }

    switch (pegar) {
      case "expedicao2":
        dados[pegar][objAtual] = {
          quemrecebeu: dataReq.quemrecebeu,
          statusdep: dataReq.statusdep
        }
        break
      case "expedicao":
        dados[pegar][objAtual] = {
          quemrecebeu: dataReq.quemrecebeu,
          statusdep: dataReq.statusdep
        }
        break
      case "financeiro":
        dados[pegar][objAtual] = {
          nropedido: dataReq.nropedido,
          statusnf: dataReq.statusnf,
          vendedor: dataReq.vendedor,
          cliente: dataReq.cliente,
          tipodefaturamento: dataReq.tipodefaturamento,
          valordopedido: dataReq.valordopedido,
          formapgto: dataReq.formapgto,
          retiraentrega: dataReq.retiraentrega,
          localdaentrega: dataReq.localdaentrega,
          localdecobranca: dataReq.localdecobranca,
          obs: dataReq.obs,
          fretedestacado: dataReq.fretedestacado,
          valorfrete: dataReq.valorfrete,
          dataentrega: dataReq.dataentrega,
          operadornf: dataReq.operadornf,
          obsfinanceiro: dataReq.obsfinanceiro,
          quemrecebeu: dataReq.quemrecebeu
        }
        break
      case "logistica":
        dados[pegar][objAtual] = {
          motorista: dataReq.motorista,
          placa: dataReq.placa,
          statuslog: dataReq.statuslog,
          codentrega: dataReq.codentrega,
          numeronf: dataReq.numeronf,
          quemrecebeu: dataReq.quemrecebeu
        
        }
        break
      case "saida":
        dados[pegar][objAtual] = {
          numeronf: dataReq.numeronf,
          exped: dataReq.exped, 
          codentrega: dataReq.codentrega,
          placa: dataReq.placa,
          motorista: dataReq.motorista,
          hodometro: dataReq.hodometro

        }
        break
      case "retorno":
        dados[pegar][objAtual] = {
          numeronf: dataReq.numeronf,
          exped: dataReq.exped, 
          codentrega: dataReq.codentrega,
          placa: dataReq.placa,
          hodometro: dataReq.hodometro
        }
        break
      case "canhoto":
        dados[pegar][objAtual] = {
          numeronf: dataReq.numeronf,
          motorista: dataReq.motorista,
          statuscanhoto: dataReq.statuscanhoto
        }
        break
    }
    fs.writeFileSync("./database/" + corrente + ".json", JSON.stringify(dados, null, 2))
  })
  res.json({ msg: "Registrado com Sucesso" })
});


app.get("/database", (req, res) => {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }
    pegarDados = JSON.parse(data)
    res.json(pegarDados)
  })
})

/*
* -------------------------------
*
*          EXPORTAÇÃO
*
*-------------------------------
*/

app.get("/excel", (req, res) => {

  const workbook = new Excel.Workbook();

  const worksheet2 = workbook.addWorksheet('Expedição', { properties: { tabColor: { argb: 'ff23344' } } });


  worksheet2.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Nome', key: 'name', width: 10 },
    { header: 'Data', key: 'data', width: 11 },
    { header: 'Credito', key: 'CREDITO', width: 10 }
  ]


  worksheet2.addRow([3, 'Sam', new Date()]);

  worksheet2.autoFilter = 'A1:D1';

  workbook.xlsx.writeFile('./excel/Tabaela.xlsx').then(() => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + __dirname + "/excel/Tabaela.xlsx");
    //res.download(__dirname+"/excel/Tabaela.xlsx");
  })
})


/*
 * -------------------------------
 *
 * FUNCÕES
 *
 * -------------------------------
 */

function getDataDatabase(escrever) {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }
    pegarDados = JSON.parse(data)
  })
}

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }

  return true;
}


app.listen()