let express = require('express');
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');
const cookieParser = require("cookie-parser")
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
  res.render("login.ejs")
})

app.get("/cruzamento", (req, res) => {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    let d = JSON.parse(data)

    res.render("bodyList.ejs", { pegar: "passagem", titulo: "CRUZAMENTO", dados: d, i: 0 })
  })
})

app.get("/home", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }
      let dataBD = JSON.parse(data)
      res.render("telaHome.ejs", { dados: dataBD, pegar: dataBD.id1.usuarios[req.cookies.activeData] })
    })
  } else {
    res.render("pageError.ejs")
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
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }
      data = JSON.parse(data)
      res.render("bodyForm.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", dados: data, superUser: "yes" })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/expedicao2formulario", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }
      let d = JSON.parse(data)

      res.render("bodyForm.ejs", { pegar: "expedicao2", titulo: "EXPEDIÇÃO 2", dados: d })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/expedicaoformulario", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }
      let d = JSON.parse(data)

      res.render("bodyForm.ejs", { pegar: "expedicao", titulo: "EXPEDIÇÃO", dados: d })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/logisticaformulario", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }
      let d = JSON.parse(data)

      res.render("bodyForm.ejs", { pegar: "logistica", titulo: "LOGISTICA", dados: d })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/saidaformulario", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }
      let d = JSON.parse(data)

      res.render("bodyForm.ejs", { pegar: "saida", titulo: "SAIDA", dados: d })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/retornoformulario", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }
      let d = JSON.parse(data)

      res.render("bodyForm.ejs", { pegar: "retorno", titulo: "RETORNO", dados: d })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/canhotoformulario", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }
      let d = JSON.parse(data)
      res.render("bodyForm.ejs", { pegar: "canhoto", titulo: "CANHOTO", dados: d })
    })
  } else {
    res.render("pageError.ejs")
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
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      let d = JSON.parse(data)

      res.render("bodyList.ejs", { pegar: "financeiro", titulo: "FINANCEIRO", dados: d, i: 0 })
    })
  } else {
    res.render("pageError.ejs")
  }
})


app.get("/expedicao2", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      let d = JSON.parse(data)

      res.render("bodyList.ejs", { pegar: "expedicao2", titulo: "EXPEDIÇÃO 2", dados: d, i: 0, superUser: "yes" })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/expedicao", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      let d = JSON.parse(data)

      res.render("bodyList.ejs", { pegar: "expedicao", titulo: "EXPEDIÇÃO", dados: d, i: 0 })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/logistica", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      let d = JSON.parse(data)
      pass = d

      res.render("bodyList.ejs", { pegar: "logistica", titulo: "LOGISTICA", dados: d, i: 0 })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/saida", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      let d = JSON.parse(data)
      pass = d

      res.render("bodyList.ejs", { pegar: "saida", titulo: "SAIDA", dados: d, i: 0 })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/retorno", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      let d = JSON.parse(data)
      pass = d

      res.render("bodyList.ejs", { pegar: "retorno", titulo: "RETORNO", dados: d, i: 0 })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/canhoto", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      let d = JSON.parse(data)
      pass = d

      res.render("bodyList.ejs", { pegar: "canhoto", titulo: "CANHOTO", dados: d, i: 0 })
    })
  } else {
    res.render("pageError.ejs")
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
  res.clearCookie("activeData");
  res.clearCookie("priv");
  res.redirect('/');
})

app.post('/verificarLogin', (req, res) => {
  let user_name = req.body.user;
  let password = req.body.password;
  //https://api.ipify.org/?format=json Login
  console.log(user_name + " " + password)
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    let d = JSON.parse(data)

    for (let i = 0; i <= Object.keys(d.id1.usuarios).length - 1; i++) {
      console.log(d.id1.usuarios[i].pass + "\t" + d.id1.usuarios[i].user)
      if (d.id1.usuarios[i].pass == password && d.id1.usuarios[i].user == user_name) {
        res.cookie("activeData", i, { expires: new Date(Date.now() + 15000000), httpOnly: true })
        res.cookie("priv", d.id1.usuarios[i].previlegios, { expires: new Date(Date.now() + 15000000), httpOnly: true })
        res.end("yes");
      }
    }
  })
})

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

    if (pegar == "financeiro") {
      dados["passagem"][objAtual] = {
        dataHora: dateFormated,
        numeronf: dataReq.numeronf,
        exped: pegar,
        usada: "sim"
      }
    } else {
      for (let prop in dados["passagem"]) {
        if (dados["passagem"][prop].numeronf == dataReq.numeronf) {
          dados["passagem"][prop].usada = "nao"
        }
      }
    }

    switch (pegar) {
      case "expedicao2":
        dados[pegar][objAtual] = {
          id: objAtual,
          quemrecebeu: dataReq.quemrecebeu,
          statusdep: dataReq.statusdep
        }
        break
      case "expedicao":
        dados[pegar][objAtual] = {
          id: objAtual,
          quemrecebeu: dataReq.quemrecebeu,
          statusdep: dataReq.statusdep
        }
        break
      case "financeiro":
        dados[pegar][objAtual] = {
          id: objAtual,
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
          id: objAtual,
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
          id: objAtual,
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
          id: objAtual,
          numeronf: dataReq.numeronf,
          exped: dataReq.exped,
          codentrega: dataReq.codentrega,
          placa: dataReq.placa,
          hodometro: dataReq.hodometro
        }
        break
      case "canhoto":
        dados[pegar][objAtual] = {
          id: objAtual,
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
  let objetoBancoDados
  fs.readFile("./database/users.json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }
    objetoBancoDados = JSON.parse(data)


    let workbook = new Excel.Workbook();

    workbook.creator = 'Sistema Semear';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    workbook.properties.date1904 = true;

    workbook.views = [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
    ];

    Criar_planilha(workbook, objetoBancoDados, "financeiro",
      ["id", "dataHora", "vendedor", "nropedido", "cliente", "tipodefaturamento", "valordopedido", "formapgto", "retiraentrega", "localdaentrega", "localdecobranca", "obs", "fretedestacado", "valorfrete", "dataentrega", "operadornf", "statusnf", "obsfinanceiro", "numeronf", "exped", "quemrecebeu"], ["A", "B", "C", "D", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"],
      "FF98EE98")

    Criar_planilha(workbook, objetoBancoDados, "expedicao",
      ["id", "dataHora", "numeronf", "exped", "quemrecebeu", "statusdep"], ["A", "B", "C", "D", "C", "D", "E", "F"],
      "FF98EE98")

    Criar_planilha(workbook, objetoBancoDados, "expedicao2",
      ["id", "dataHora", "numeronf", "exped", "quemrecebeu", "statusdep"], ["A", "B", "C", "D", "C", "D", "E", "F"],
      "FF98EE98")

    Criar_planilha(workbook, objetoBancoDados, "logistica",
      ["id", "dataHora", "quemrecebeu", "codentrega", "numeronf", "exped", "motorista", "placa", "statuslog"], ["A", "B", "C", "D", "C", "D", "E", "F", "G", "H", "I"],
      "FF98EE98")

    Criar_planilha(workbook, objetoBancoDados, "canhoto",
      ["id", "dataHora", "quemrecebeu", "numeronf", "exped", "motorista", "statuscanhoto"], ["A", "B", "C", "D", "C", "D", "E", "F", "G"],
      "FF98EE98")

    Criar_planilha(workbook, objetoBancoDados, "saida",
      ["id", "dataHora", "codentrega", "numeronf", "placa", "motorista", "hodometro"], ["A", "B", "C", "D", "C", "D", "E", "F", "G", "H", "I"],
      "FF98EE98")

    Criar_planilha(workbook, objetoBancoDados, "retorno",
      ["id", "dataHora", "codentrega", "numeronf", "exped", "hodometro"], ["A", "B", "C", "D", "C", "D", "E", "F"],
      "FF98EE98")



    // ENVIO DE DADOS (NAO MEXER)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "ExportExcel.xlsx");
    workbook.xlsx.write(res)
      .then(function(data) {
        res.end();
        console.log('File write done........');
      });
  })
})


/*
 * -------------------------------
 *
 *           FUNCÕES
 *
 * -------------------------------
 */

function Criar_planilha(workbook, objetoBancoDados, nome, nomeColuna, letras, corDoFundo) {
  let expedicao = workbook.addWorksheet(nome);

  let colunas = []
  let nomesColunas = nomeColuna
  for (i = 0; i <= nomesColunas.length - 1; i++) {
    colunas[i] = {
      header: nomesColunas[i].toUpperCase(),
      key: nomesColunas[i]
    }
  }

  expedicao.columns = colunas

  let letrasABC = letras
  for (i = 0; i <= letrasABC.length - 1; i++) {
    expedicao.getCell(letrasABC[i] + "1").fill = {
      type: 'pattern',
      pattern: 'darkVertical',
      fgColor: { argb: corDoFundo },
      bgColor: { argb: corDoFundo }
    }
  }

  for (i = Object.keys(objetoBancoDados[nome]).length - 1; i > -1; i--) {
    let obj = objetoBancoDados[nome][i]
    expedicao.addRow(obj);
  }
  return expedicao
}


function getDataDatabase(escrever) {
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }
    pegarDados = JSON.parse(data)
  })
}

app.listen()
console.log("SERVIDOR INICIOU")