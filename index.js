let express = require('express');
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');
const cookieParser = require("cookie-parser")
const Excel = require('exceljs');
let path = require("path")

let app = express()

//VARIAVEIS GLOBAIS
let pegarDados
let pass
let corrente = "teste"
//-------------

app.set('view engine', 'ejs')
app.use(express.static(path.join('public')))
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
  if (req.cookies.activeData == null) {
    res.render("login.ejs")
  } else {
    res.redirect('home');
  }
})

app.get("/config", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      let d = JSON.parse(data)


      res.render("config.ejs", { dados: d, pegar: d.id1.usuarios[req.cookies.activeData] })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/cruzamento", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      let d = JSON.parse(data)

      res.render("bodyList.ejs", { pegar: "passagem", titulo: "ACOMPANHAMENTO  NOTA  FISCAL", dados: d, i: 0 })
    })
  } else {
    res.render("pageError.ejs")
  }
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


      res.render("FormsNovo.ejs", { pegar: "financeiro", titulo: "FINANCEIRO teste", dados: data })
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


      res.render("bodyForm.ejs", { pegar: "saida", titulo: "CARREGAMENTO CAMINHÃO", dados: d })
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


app.get("/registroentregaformulario", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }
      let d = JSON.parse(data)


      res.render("bodyForm.ejs", { pegar: "registroentrega", titulo: "REGISTRO DE ENTREGA", dados: d })
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

      res.render("bodyList.ejs", { pegar: "expedicao2", titulo: "EXPEDIÇÃO 2", dados: d, i: 0 })
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

      res.render("bodyList.ejs", { pegar: "saida", titulo: "CARREGAMENTO CAMINHÃO", dados: d, i: 0 })
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

      res.render("bodyList.ejs", { pegar: "retorno", titulo: "ENTREGA DO MATERIAL", dados: d, i: 0 })
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

      res.render("bodyList.ejs", { pegar: "canhoto", titulo: "CANHOTO", dados: d, i: 0 })
    })
  } else {
    res.render("pageError.ejs")
  }
})

app.get("/registroentrega", (req, res) => {
  if (req.cookies.activeData != null) {
    fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
      if (err) {
        return console.log("Erro ao ler arquivo")
      }

      let d = JSON.parse(data)

      res.render("bodyList.ejs", { pegar: "registroentrega", titulo: "REGISTRO ENTREGA", dados: d, i: 0 })
    })
  } else {
    res.render("pageError.ejs")
  }
})


app.get("/dev", (req, res) => {
  if (req.cookies.priv == 11) {
    let obj = {
      id1: {
        usuarios: {
          0: {
            nome: "Developer",
            user: "D",
            previlegios: 11,
            setor: "ALL",
            foto: "https://i.pinimg.com/originals/8c/96/93/8c969356e667e3aa0d145145e082e7ef.jpg",
            pass: 1
          },
          1: {
            nome: "Felipe",
            user: "Felipe",
            previlegios: 10,
            setor: "ALL",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmTPNAhEtoWk0P5NWMq-mGq3ToNhScUMVzbb9_cvDN9Uf8rfLbv7K_dnVnxWUYQdEN_3PSnjBIkTiJ10mBPEkMvYzL_y3g=w1366-h621",
            pass: 123
          },
          2: {
            nome: "Aline",
            user: "Aline",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmRRDey8FkwUOY1CBfXZwAsvLO-V6UPEBnozlKBh62Pe9IZfnR1XFGq5Fckcv1-Qgv_qGk-pW9yFKgAxuw3VraXjiuv1Qw=w1366-h617",
            pass: 123
          },
          3: {
            nome: "Marcia",
            user: "Marcia",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmRVuzXFWFGxEyktkbbTRtCtd5S4mbVVkdb8fxMOzrcXqHXRPIcvhBgBRFuLgD-5_-eELyWSFUABiNKMqWX6827PPSyU=w1366-h617",
            pass: 1234
          },
          4: {
            nome: "Luis",
            user: "Luis",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmQv4IFCBrlwzVAz05LiVfYJq-ccIQfL5WbV6jJ-PS8TTeucupXoQOoP3S_-w-BMGE3eoXA5FH-KIdJcrAZsU3eAMsDcQw=w1366-h617",
            pass: 12345
          },
          5: {
            nome: "Gelson",
            user: "Gelson",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmTJLWbz4Vk5axc1ugoTHADmkdP3QPcQo3pQDWY33lFknAmkHxoWn_U8W7v96YfKsv68-pi9rMuRDKATz98s69aXbCIo=w1366-h617",
            pass: 123456
          },
          6: {
            nome: "Wagner",
            user: "Wagner",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmSQmwxjwdG6PmAzZpYYegJHm2KPUdongtQkkJwTVAEGG3ym2n5WLnQv64n1wZCAbOGWiOtLOtvLXrICPeNjzjLEG3-fVw=w1366-h617",
            pass: 123457
          },
          7: {
            nome: "Fernando",
            user: "Fernando",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://drive.google.com/file/d/1Q7aoubDuxs9C1FLwOysrpFsXPzQwAkfc/view",
            pass: 1234578
          },
          8: {
            nome: "Julia",
            user: "Julia",
            previlegios: 1,
            setor: "ALL",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmSWYKBYcj3yutznl-27fBHPHF_NZcnj_RW6mKsian6Dyme0Lt0s320BSmnvQ8YvzFuDTSGBCIBz7VHxxC9YF90e_KGaWA=w1920-h969",
            pass: 456
          },
          9: {
            nome: "Rosi",
            user: "Rosi",
            previlegios: 1,
            setor: "financeiro",
            foto: "",
            pass: 12345780
          },
          10: {
            nome: "Oscar",
            user: "Oscar",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmTIwoc1Zo9xSaomy0D1sN_cLlBzPCLqOvEvNd4pd19Ojpw8p1UwD2mTGxAgk5NJXbzKbbGfaI6PX-B8-AQs4uIdz40m4g=w1920-h969",
            pass: 123457801
          },
          11: {
            nome: "Gaspar",
            user: "Gaspar",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmT2DYIYozUss_Nu6fm0RLULYWK0p86wN_JR5lmRqGZW5EC9Oqs7Lb0R-8vcZQWwA0H_r2HR-UqgpjePesRx7NtvZ7eaRg=w1366-h617",
            pass: 123457802
          },
          12: {
            nome: "Paulo",
            user: "Paulo",
            previlegios: 1,
            setor: "ALL",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AFDK6gPImTU4kzuRYUad1tMAztSgPJNiAKxDPYZYZWhxjIvZIw7LKukg7QVAj_NrrdUYmJOTWfQ_dVKREuFqDPJe49wrxBBWqw=w1920-h969",
            pass: 1234
          },
          13: {
            nome: "Dani",
            user: "Dani",
            previlegios: 1,
            setor: "financeiro",
            foto: "",
            pass: 123457804
          },
          14: {
            nome: "Dieimes",
            user: "Dieimes",
            previlegios: 1,
            setor: "logistica",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmQ8LfabIxs37Lh8uX4xq-OQsu6c8kdssTMs8XL8ZKhIgTO-usf7J4CUiGz225Y3NogOZhxwGwJxc667VprP_hh9O423Xw=w1366-h617",
            pass: 123457805
          },
          15: {
            nome: "user",
            user: "user",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmTPNAhEtoWk0P5NWMq-mGq3ToNhScUMVzbb9_cvDN9Uf8rfLbv7K_dnVnxWUYQdEN_3PSnjBIkTiJ10mBPEkMvYzL_y3g=w1366-h621",
            pass: 123457806
          },
          16: {
            nome: "Manoel",
            user: "Manoel",
            previlegios: 1,
            setor: "expedicao2",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmRrpL8tZfGZs3MnJ2G1VgJw5sWyCvc_T-vPnBRKhhVWfBcrqlRYqJ6WQlkuJay3yRHwW4IiifRkfL2dKIUyAj008eN5IQ=w1920-h969",
            pass: 123457807
          },
          17: {
            nome: "Cristiano",
            user: "Cristiano",
            previlegios: 1,
            setor: "expedicao2",
            foto: "",
            pass: 123457808
          },
          18: {
            nome: "Everton",
            user: "Everton",
            previlegios: 1,
            setor: "expedicao",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmQDtAzYIvRFKpzBqQH7bV_xM5DptDCYfP4WFAP-4faton0A5MmDXwGy9KteC-CAfXLRFuDcwc5MWlxTTpDlFIYHWQKyZQ=w1366-h617",
            pass: 1234578001
          },
          19: {
            nome: "Max",
            user: "Max",
            previlegios: 1,
            setor: "expedicao",
            foto: "",
            pass: 1234578002
          },
          20: {
            nome: "Dudu",
            user: "Dudu",
            previlegios: 1,
            setor: "expedicao",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmT4bKrCGmNnobL-HkusktKSVM_psJQCHQ1XTTMzQ1bpSwJZLo8CKx1656q9MGXaCqNteIbS8H9VjJNjuqrHbiw9Mxafyg=w1366-h617",
            pass: 1234578003
          },
          21: {
            nome: "Marcia.s",
            user: "Marcia.s",
            previlegios: 1,
            setor: "canhoto",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmRbrXH-f-VxWIIrTvC2_55DnboIkKJbTCdy6fr8PFtLUWyDJ1J8lc960fvY04xf60crFPPBi9qkCnxQKtUw7MUBWPKSKQ=w1366-h621",
            pass: 1234578004
          },
          22: {
            nome: "Vitória",
            user: "Vitória",
            previlegios: 1,
            setor: "ALL",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmTNKUaod_J1ns0ouMJw9DsMRjqzCOB1VBU5IYrTueJ64s2hYQKNMtsHePQzWPSEywMQazczPqxpFYLEXBjnAzPz78IXNQ=w1920-h969",
            pass: 12345
          },
          23: {
            nome: "Paulo",
            user: "Paulo",
            previlegios: 1,
            setor: "ALL",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmSn5Ni6KHK2UCaazTtP6CV2Hq6h94Nq4X82ik8UAlZ_iyl8SxyY_NY_P4_QaOWOCVq1gWCqWhNIGgiCo0WMuCicUU5mrQ=w1366-h617",
            pass: 123
          },
          24: {
            nome: "Machado",
            user: "Machado",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmTk8_ubfNFgNQjaFPu-RDkgW2VoO11MkyWDNqKiCLBmOewcIx3YaUZK_EfzoMMduzy0GFLGDfuzRFhU9y8_2VZR-o8ohA=w1920-h969",
            pass: 123
          },
          25: {
            nome: "Guilherme",
            user: "Guilherme",
            previlegios: 1,
            setor: "financeiro",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmSv1DLN8xRdbAbSLgNdL4Fj4GJvalZbPo3-k4Zo5wG5_oCZ4uEYicM_lR8_PlJ9LKrstvUm7z5x6HjIqk0dMKEa_22R6Q=w1920-h969",
            pass: 123
          },
          26: {
            nome: "Beto",
            user: "Beto",
            previlegios: 1,
            setor: "ALL",
            foto: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmT8o4pW_p7UT4UqsXZH7HwbXhHvioftI5LOtGR3uYAjBh2fHE1EzCsO-iy4_tjsA7elSJCpM6Hmr6dFIebyHXKagA9xAw=w1920-h969",
            pass: 123456
          }
        }
      },
      passagem: {},
      financeiro: {},
      expedicao: {},
      expedicao2: {},
      logistica: {},
      saida: {},
      retorno: {},
      registroentrega: {},
      canhoto: {}
    }
    fs.writeFileSync('./database/' + corrente + '.json', JSON.stringify(obj, null, 2))
    res.end("OK")
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


  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    let d = JSON.parse(data)

    for (let i = 0; i <= Object.keys(d.id1.usuarios).length - 1; i++) {
      if (d.id1.usuarios[i].pass == password && d.id1.usuarios[i].user == user_name) {
        res.cookie("activeData", i, { expires: new Date(Date.now() + 15000000), httpOnly: true })
        res.cookie("priv", d.id1.usuarios[i].previlegios, { expires: new Date(Date.now() + 15000000), httpOnly: true })
        res.end("yes")
      }
    }
  })
})

app.post("/mudancaBancoDados", (req, res) => {
  let d
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    if (err) {
      return console.log("Erro ao ler arquivo")
    }

    d = JSON.parse(data)
    let dados = JSON.parse(req.body)
    let target = dados.mudar
    let valor = dados.value
    let pegar = dados.pegar
    let index = dados.index
    let numeroNf = dados.numeroNf
    let numeroDaSeção = 0
    numeroDaSeção++

    switch (target) {
      case "quem":
        d[pegar][index].quemrecebeu = valor
        break

      case "exped":
        let after = dados.valueAfter
        for (let prop in d["passagem"]) {
          let objAtual = Object.keys(d[valor]).length + numeroDaSeção - 1
          if (d["passagem"][prop].numeronf == numeroNf) {
            seletorDados = prop
            for (bprop in d[after]) {
              if (d[after][bprop].selecionarDado == seletorDados) {
                delete d[after][bprop]
              }
            }
            d[valor][objAtual] = {
              id: objAtual,
              selecionarDado: seletorDados,
              quemrecebeu: "Nota Fiscal sendo encaminhada para o setor",
              statusdep: "Nota Fiscal sendo encaminhada para o setor"
            }
          }
        }
        d["passagem"][index].exped = valor
        break

      case "numeronf_text":
        d["passagem"][index].numeronf = valor
        break

      case "obs2_text":
        d[pegar][index].obsfinanceiro = valor
        break

      case "coisa":
        d[pegar][index].statusnf = valor
        break

      case "statusdep":
        d[pegar][index].statusdep = valor
        break

      case "operador":
        d[pegar][index].operadornf = valor
        break

      case "motorista":
        d[pegar][index].motorista = valor
        break

      case "placa":
        d[pegar][index].placa = valor
        break

      case "statuslog":
        d[pegar][index].statuslog = valor
        break
    }

    fs.writeFileSync('./database/' + corrente + '.json', JSON.stringify(d, null, 2))
    res.json({ msg: "Registrado com Sucesso" })
  })
})

app.post('/registrarBancoDados', (req, res) => {
  let numeroDaSeção = 0
  numeroDaSeção++

  let dataReq = JSON.parse(req.body)
  let pegar = req.headers.sector

  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
    let dados = JSON.parse(data)
    let objAtual = Object.keys(dados[pegar]).length + numeroDaSeção - 1
    let ts = Date.now()
    let d = new Date(ts);
    let seletorDados
    let dateFormated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours() - 3}:${d.getMinutes()}`

    if (pegar == "financeiro" || pegar == "saida" || pegar == "registroentrega") {
      dados["passagem"][objAtual] = {
        dataHora: dateFormated,
        numeronf: dataReq.numeronf,
        exped: "..."
      }
    } else {
      for (let prop in dados["passagem"]) {
        if (dados["passagem"][prop].numeronf == dataReq.numeronf) {
          seletorDados = prop
        }
      }
    }

    switch (pegar) {
      case "financeiro":
        dados[pegar][objAtual] = {
          id: objAtual,
          selecionarDado: objAtual,
          nropedido: dataReq.nropedido,
          statusnf: dataReq.statusnf,
          vendedor: dataReq.vendedor,
          cliente: dataReq.cliente,
          tipodefaturamento: dataReq.tipodefaturamento,
          valordopedido: dataReq.valordopedido,
          formapgto: dataReq.formapgto,
          vendafrete: dataReq.vendafrete,
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
      case "saida":
        dados[pegar][objAtual] = {
          id: objAtual,
          selecionarDado: objAtual,
          numeronf: dataReq.numeronf,
          exped: dataReq.exped,
          codentrega: dataReq.codentrega,
          nomeconferente: dataReq.nomeconferente,
          placa: dataReq.placa,
          motorista: dataReq.motorista,
          hodometro: dataReq.hodometro,
          destino: dataReq.destino,
          datahorasaida: dataReq.datahorasaida,
          obs: dataReq.obs


        }
        break
      case "retorno":
        dados[pegar][objAtual] = {
          id: objAtual,
          selecionarDado: objAtual,
          numeronf: dataReq.numeronf,
          exped: dataReq.exped,
          codentrega: dataReq.codentrega,
          placa: dataReq.placa,
          hodometro: dataReq.hodometro,
          datahora: dataReq.datahora,
          obs: dataReq.obs
        }
        break
      case "canhoto":
        dados[pegar][objAtual] = {
          id: objAtual,
          dataHora: dateFormated,
          numeronf: dataReq.numeronf,
          motorista: dataReq.motorista,
          statuscanhoto: dataReq.concluida,
          quemrecebeu: dataReq.quemrecebeu
        }
        break

      case "registroentrega":
        dados[pegar][objAtual] = {
          id: objAtual,
          selecionarDado: objAtual,
          numeronf: dataReq.numeronf,
          motorista: dataReq.motorista,
          codentrega: dataReq.codentrega,
          cidade: dataReq.cidade,
          quemrecebeu: dataReq.quemrecebeu,
          concluida: dataReq.concluida,
          obs: dataReq.obs

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
  fs.readFile("./database/" + corrente + ".json", "utf8", function(err, data) {
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
      ["id", "dataHora", "codentrega", "nomeconferente", "numeronf", "placa", "motorista", "destino", "hodometro", "datahorasaida", "obs"], ["A", "B", "C", "D", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
      "FF98EE98")

    Criar_planilha(workbook, objetoBancoDados, "retorno",
      ["id", "dataHora", "codentrega", "numeronf", "hodometro"], ["A", "B", "C", "D", "C", "D", "E", "F"],
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

    switch (nome) {
      case 'financeiro':
        expedicao.addRow({
          id: objetoBancoDados[nome][i].id,
          dataHora: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].dataHora,
          vendedor: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].vendedor,
          nropedido: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].nropedido,
          cliente: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].cliente,
          tipodefaturamento: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].tipodefaturamento,
          valordopedido: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].valordopedido,
          formapgto: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].formapgto,
          retiraentrega: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].retiraentrega,
          localdaentrega: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].localdaentrega,
          localdeentrega: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].localdeentrega,
          obs: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].obs,
          fretedestacado: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].fretedestacado,
          valorfrete: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].valorfrete,
          dataentrega: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].dataentrega,
          operadornf: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].operadornf,
          statusnf: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].statusnf,
          obsfinanceiro: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].obsfinanceiro,
          numeronf: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].numeronf,
          exped: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].exped,
          quemrecebeu: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].quemrecebeu

        })
        break
      case 'expedicao':
        expedicao.addRow({
          id: objetoBancoDados[nome][i].id,
          dataHora: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].dataHora,
          numeronf: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].numeronf,
          exped: objetoBancoDados["financeiro"][objetoBancoDados[nome][i].selecionarDado].exped,
          quemrecebeu: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].quemrecebeu,
          statusdep: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].statusdep
        })

        break
      case 'expedicao2':
        expedicao.addRow({
          id: objetoBancoDados[nome][i].id,
          dataHora: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].dataHora,
          numeronf: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].numeronf,
          exped: objetoBancoDados["financeiro"][objetoBancoDados[nome][i].selecionarDado].exped,
          quemrecebeu: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].quemrecebeu,
          statusdep: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].statusdep
        })
        break
      case 'retorno':
        expedicao.addRow({
          id: objetoBancoDados[nome][i].id,
          dataHora: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].dataHora,
          codentrega: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].codentrega,
          numeronf: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].numeronf,
          hodometro: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].hodometro
        })
        break
      case 'registroentrega':
        expedicao.addRow({
          id: objetoBancoDados[nome][i].id,
          dataHora: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].dataHora,
          numeronf: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].numeronf,
          motorista: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].motorista,
          codentrega: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].codentrega,
          cidade: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].cidade,
          concluida: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].concluida,
          obs: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].obs
        })
        break
      case 'saida':
        expedicao.addRow({
          id: objetoBancoDados[nome][i].id,
          dataHora: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].dataHora,
          numeronf: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].numeronf,
          codentrega: objetoBancoDados[nome][i].codentrega,
          nomeconferente: objetoBancoDados[nome][i].nomeconferente,
          placa: objetoBancoDados[nome][i].placa,
          motorista: objetoBancoDados[nome][i].motorista,
          destino: objetoBancoDados[nome][i].destino,
          hodometro: objetoBancoDados[nome][i].hodometro,
          datahorasaida: objetoBancoDados[nome][i].datahorasaida,
          obs: objetoBancoDados[nome][i].obs

        })
        break
      case 'canhoto':
        expedicao.addRow({
          id: objetoBancoDados[nome][i].id,
          dataHora: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].dataHora,
          quemrecebeu: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].quemrecebeu,
          numeronf: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].numeronf,
          exped: objetoBancoDados["financeiro"][objetoBancoDados[nome][i].selecionarDado].exped,
          motorista: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].motorista,
          statuscanhoto: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].statuscanhoto
        })
        break
      case 'logistica':
        expedicao.addRow({
          id: objetoBancoDados[nome][i].id,
          dataHora: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].dataHora,
          numeronf: objetoBancoDados["passagem"][objetoBancoDados[nome][i].selecionarDado].numeronf,
          exped: objetoBancoDados["financeiro"][objetoBancoDados[nome][i].selecionarDado].exped,
          quemrecebeu: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].quemrecebeu,
          statusdep: objetoBancoDados[nome][objetoBancoDados[nome][i].selecionarDado].statusdep
        })
        break
    }
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

app.get('*', function(req, res) {
  res.status(404).render('pageqzq.ejs');
})

app.listen()
console.log("SERVIDOR INICIOU")