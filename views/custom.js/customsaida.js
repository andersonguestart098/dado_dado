/* Inicio listar os registros do banco de dados */
const tbody = document.querySelector(".listar-usuarios");
const cadForm = document.getElementById("cad-usuario-form");
const msgAlertaErroCad = document.getElementById("msgAlertaErroCad");
const msgAlerta = document.getElementById("msgAlerta");
const cadModal = new bootstrap.Modal(document.getElementById("cadUsuarioModal"));

// Funcao para listar os registros do banco de dados
const listarUsuarios = async (pagina) => {

    // Fazer a requisicao para o arquivo PHP responsavel em recuperar os registros do banco de dados
    const dados = await fetch("./listsaida.php?pagina=" + pagina);

    // Ler o objeto retornado pelo arquivo PHP
    const resposta = await dados.json();
    console.log(resposta);

    // Acessa o IF quando nao encontrar nenhum registro no banco de dados
    if (!resposta['status']) {
        // Envia a mensagem de erro para o arquivo HTML que deve ser apresentada para o usuario
        document.getElementById("msgAlerta").innerHTML = resposta['msg'];
    } else {
        // Recuperar o SELETOR do HTML que deve receber os registros
        const conteudo = document.querySelector(".listar-usuarios");

        // Somente acessa o IF quando existir o SELETOR ".listar-usuarios"
        if (conteudo) {

            // Enviar os dados para o arquivo HTML
            conteudo.innerHTML = resposta['dados'];
        }
    }
}

// Chamar a funcao para listar os registro do banco de dados
listarUsuarios(1);


//Cadastrar os pedidos
cadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const dadosForm = new FormData(cadForm);
    dadosForm.append("add", 1);

    document.getElementById("cad-usuario-btn").value = "Salvando...";
    
    const dados = await fetch("cadastrarretorno.php", {
        method: "POST",
        body: dadosForm,
    });

    const resposta = await dados.json();
    
    if(resposta['erro']){
        msgAlertaErroCad.innerHTML = resposta['msg'];
    }else{
        msgAlerta.innerHTML = resposta['msg'];
        cadForm.reset();
        cadModal.hide();
        listarUsuarios(1);
    }
    document.getElementById("cad-usuario-btn").value = "Enviar";
});

/* Fim listar os registros do banco de dados */

/* Inicio substituir o texto pelo campo na tabela */
// Funcao responsavel em substituir o texto pelo campo na tabela e receber o ID do registro que sera editado

function editar_registro(id) {
    // Ocultar o botao editar
    document.getElementById("botao_editar" + id).style.display = "none";
    console.log("acessou o editar: " + id);

    // Apresentar o botao salvar
    document.getElementById("botao_salvar" + id).style.display = "block";

    // Recuperar os valores do registro que esta na tabela
    var codentrega = document.getElementById("valor_codentrega" + id);
    var conferente = document.getElementById("valor_conferente" + id);
    var numeronf = document.getElementById("valor_numeronf" + id);
    var motorista = document.getElementById("valor_motorista" + id);
    var placa = document.getElementById("valor_placa" + id);
    var cidadedestino = document.getElementById("valor_cidadedestino" + id);
    var hodometrosaida = document.getElementById("valor_hodometrosaida" + id);
    var datahorasaida = document.getElementById("valor_datahorasaida" + id);
    var obs = document.getElementById("valor_obs" + id);





    // Substituir o texto pelo campo e atribuir para o campo o valor que estava na tabela
    codentrega.innerHTML = "<input type='hidden' id='codentrega_text" + id + "' value='" + codentrega.innerHTML + "'>";
    conferente.innerHTML = "<input type='text' id='conferente_text" + id + "' value='" + conferente.innerHTML + "'>";
    numeronf.innerHTML = "<input type='text' id='numeronf_text" + id + "' value='" + numeronf.innerHTML + "'>"; //prestar bem atenção se está referenciado o '_text' se não retorna valor nulo 'null'
    motorista.innerHTML = "<select name='motorista' id='motorista" + id + "'><option value='ALEXANDRE'>ALEXANDRE</option> <option value='CRISTIANO'>CRISTIANO</option> <option value='DIONATHA'>DIONATHA</option> <option value='DOUGLAS'>DOUGLAS</option> <option value='IGON'>IGON</option> <option value='JULIANO'>JULIANO</option> <option value='MATHEUS'>MATHEUS</option> <option value='MAX'>MAX</option> <option value='PAULO'>PAULO</option> <option value='PAULO VITOR'>PAULO VITOR</option> <option value='VANDERLEI'>VANDERLEI</option><option value='VILNEI'>VILNEI</option><option value='WILLIAM'>WILLIAM</option> </select>";
    placa.innerHTML = "<select name='placa' id='placa" + id + "'><option value='IWC5261'>IWC5261</option> <option value='IZT1E84'>IZT1E84</option> <option value='IYW7921'>IYW7921</option> <option value='IVO1603'>IVO1603</option> <option value='AZI2E30'>AZI2E30</option> <option value='ITA7784'>ITA7784</option> <option value='IUT9476'>IUT9476</option> <option value='IST6840'>IST6840</option> <option value='IVP0G05'>IVP0G05</option><option value='JBD9H36'>JBD9H36</option><option value='IXH8706'>IXH8706</option> </select>";
    cidadedestino.innerHTML = "<input type='text' id='cidadedestino_text" + id + "' value='" + cidadedestino.innerHTML + "'>";
    hodometrosaida.innerHTML = "<input type='text' id='hodometrosaida_text" + id + "' value='" + hodometrosaida.innerHTML + "'>";
    datahorasaida.innerHTML = "<input type='text' id='datahorasaida_text" + id + "' value='" + datahorasaida.innerHTML + "'>";
    obs.innerHTML = "<input type='text' id='obs_text" + id + "' value='" + obs.innerHTML + "'>";


}

/* Fim substituir o texto pelo campo na tabela */

/* Inicio editar o registro no banco de dados */
// Funcao resposavel em salvar no banco de dados e receber o id do registro que deve ser editado

async function salvar_registro(id) {
    console.log();
    // Recuperar os valore dos campos
    var codentrega_valor = document.getElementById("codentrega_text" + id).value;
    var conferente_valor = document.getElementById("conferente_text" + id).value;
    var numeronf_valor = document.getElementById("numeronf_text" + id).value;
    var motorista_valor = document.getElementById("motorista" + id).value;
    var placa_valor = document.getElementById("placa" + id).value;
    var cidadedestino_valor = document.getElementById("cidadedestino_text" + id).value;
    var hodometrosaida_valor = document.getElementById("hodometrosaida_text" + id).value;
    var datahorasaida_valor = document.getElementById("datahorasaida_text" + id).value;
    var obs_valor = document.getElementById("obs_text" + id).value;

    // Prepara a STRING de valores que deve ser enviado para o arquivo PHP responsavel em salvar no banco de dados
    var dadosForm = "id=" + id + "&codentrega=" + codentrega_valor + "&conferente=" + conferente_valor + "&numeronf=" + numeronf_valor + "&motorista=" + motorista_valor + "&placa=" + placa_valor + "&cidadedestino=" + cidadedestino_valor + "&hodometrosaida=" + hodometrosaida_valor + "&datahorasaida=" + datahorasaida_valor + "&obs=" + obs_valor ;


    // Fazer a requisicao com o FETCH para um arquivo PHP e enviar atraves do metodo POST os dados do formulario
    const dados = await fetch("editarsaida.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: dadosForm
    });

    // Ler o objeto, a resposta do arquivo PHP
    const resposta = await dados.json();

    // Acessa o IF quando nao conseguir editar no banco de dados
    if (!resposta['status']) {
        // Envia a mensagem de erro para o arquivo HTML que deve ser apresentada para o usuario
        document.getElementById("msgAlerta").innerHTML = resposta['msg'];
    } else {
        // Envia a mensagem de sucesso para o arquivo HTML que deve ser apresentada para o usuario
        document.getElementById("msgAlerta").innerHTML = resposta['msg'];

        // Chamar a funcao para remover a mensagem apos alguns segundos
        removerMsgAlerta();

        // Substituir os campos pelo texto que estava nos campos
        document.getElementById("valor_codentrega" + id).innerHTML = codentrega_valor;
        document.getElementById("valor_conferente" + id).innerHTML = conferente_valor; //se não colocar '_valor' ele até salva mas não oculta o botão salvar!
        document.getElementById("valor_numeronf" + id).innerHTML = numeronf_valor;
        document.getElementById("valor_motorista" + id).innerHTML = motorista_valor;
        document.getElementById("valor_placa" + id).innerHTML = placa_valor;
        document.getElementById("valor_cidadedestino" + id).innerHTML = cidadedestino_valor;
        document.getElementById("valor_hodometrosaida" + id).innerHTML = hodometrosaida_valor;
        document.getElementById("valor_datahorasaida" + id).innerHTML = datahorasaida_valor;
        document.getElementById("valor_obs" + id).innerHTML = obs_valor;

        // Apresentar o botao editar
        document.getElementById("botao_editar" + id).style.display = "block";

        // Ocultar o botao salvar
        document.getElementById("botao_salvar" + id).style.display = "none";
    }
}

/* Fim editar o registro no banco de dados */

/* Inicio remover a mensagem em 5 segundos apos apresentar a mensagem para o usuario */
function removerMsgAlerta() {
    setTimeout(function () {
        // Substituir a mensagem
        document.getElementById("msgAlerta").innerHTML = "";
    }, 5000);
}
/* Fim remover a mensagem em 5 segundos apos apresentar a mensagem para o usuario */