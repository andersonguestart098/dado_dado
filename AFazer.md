# PROJETO NODE.JS 

![Image of Einstein](https://upload.wikimedia.org/wikipedia/commons/6/6f/Einstein-formal_portrait-35.jpg)

# A Fazer

- [ ] Colocar caixa de seleção qtd de parcelas até 6x.

# Para Alfa.
            
- [jotform é a mesma coisa, ficará pra alfa pois tera que revisar toda estrutura do formulário] Verificar condicionantes da entrega agendada, quando trocar para retira ou outra opção, ocultar agenda e etc.

- [deixar pra alfa] (terá que mudar toda estrutura das tabelas) Acrescentar campo motorista para tabela Logistica.

- [parcial] Criar login para os motorista, tendo no home as opções dos formulários "Registro de entrega e Registro de retorno".
- [alfa ] Data/hora dos setores ser separado do financeiro.

# Concluido 
02/01/2023

- [X] Ajeitar valor na tabela financeiro ex: "entregaimediata" para "Entrega Imediata" e mesmo para outros a corrigir.
      
- [X] Transportadora/Entrega Imediata/Entrega agendada (colocar frete por conta do cliente ou por conta da cemear "deixar autocomplete em por conta do cliente").
      
- [X] Formatar data atual(corrigir).
      
- [X] Colocar Autorefresh no formulário de retorno (conferir os outros por precaução).
    
- [x] Cartão (colocar número de parcelas).

- [x] Colocar tipo de faturamento BONIFICADO (condicionantes igual remessa de materias ocultando os campos).

- [x] Formas de pagamentos: "sem forma de pagamento, dep. programado ocultar local de cobrança (revisar os outros)"

- [X] Faturado (ocultar local de cobrança).
      
- [x] Colocar mascara input (valor frete).

- [X] Alterar nome do botão do formulário de retorno para "Registrar Retorno".
      
- [X] Alterar nome formulário financeiro para "Solicitação de Faturamento".

- [X] status/dep colocar opção "Aguardando transportadora".

- [X] Alterar títula da "Expedição" para "Expedição 1".

- [X] Status dep da logistica, mudar para "status" e colocar opções da logistica ex: Aguardando rota, Em transito, entregue, etc...

- [X] Transportadora (tirar agendamento)*ele permanece quando preenche entrega agendada e quando muda pra transportadora ou retira ele não oculta.
      
- [X] Colocar no formulário carregamento de caminhão no campo conferente, opções para escolher o conferente (select).

- [X] Nome do código de entrega mudar para "Código da Carga".

- [x] Alterar nome da tabela e formulario registro de entrega para "Confirmação de Entrega".

- [x] Alterar nome formulário canhoto para "Registrar Canhoto".

- [X] Tirar do formulario canhoto "status nf" e preencher automatico com autocomplete na tabela no campo status "concluido".

- [X] Mudar nome do botão do formulario de carregamento do caminhão para "Gerar Carga".
02/01/203



      
- [X] Export excel

- [x] Colocar condicionantes no formúlario do financeiro nas formas de pagamento, igual ao jotform       
- [x] Fazer teste geral e partir pro abraço.
- [X] Criar input(random) em cód.entrega para gerar um número aleatório.
- [X] Tirar condicionantes de verificação de setor dos formulários(por enquanto).
- [x] Testar Envio dos formulários.
- [x] Corrigir erros (undefined).
- [x] substituir "..." na expedição 2,1 e losgitica por "Nota Fiscal a caminho do setor !" cor: Laranja.  
- [x] Tirar campo local de cobrança da condicionante entrega e colocar para todos(retira, entrega, transportadora) formulário Financeiro(Local de Cobrança).  
- [x] Adicionar campo na tabela e formulário Financeiro(Venda com frete ?).   
- [X] Adicionar campo na tabela e formulário saída(Nome do coferente). 
- [x] Adicionar campo na tabela e formulário Saída(Cidade(s) Destino).  
- [X] Adicionar campo na tabela e formulário Saída(Data/hora saída).    
- [x] Adicionar campo na tabela e formulário Saída(Campo OBS).  
- [x] Criar Tabela Registro de Entrega(motoristas).
- [x] Acrescentar uma função que manda os numeros nf's da tabela financeiro para seus respectivos setores
- [X] Criar uma tabela logistica igual da expedição e renomear a tabela atual logistica para saida.
- [X] Novo registro assim q modificado no financeiro exped/exped2/logist
- [x] Tirar formulario das tabelas exped.
- [x] Mudar nome da tabela "retorno" para Entrega.
- [x] Mudar o nome "saida" para "carregamento caminhão".
- [X] Design do Home.
- [X] Infraestrutura de dados.
- [X] Rotas.
- [X] Multiplos Registros.
- [X] Cookies.
- [X] Pouco uso de armazenamento (memória).
- [X] Condicionantes de cores.
- [X] Condicionantes de verificação de dados.
- [X] Filtro de dados conforme o NF existe ou não.
- [X] AutoReflesh Data.
- [X] Dashboard emprensarial de dados com base em graficos.
- [X] Tabela de passagem de dados.
- [X] Criar exportação excel.
- [X] Comparar se numeroNF for Duplicado Existente.
- [X] Fazer Cruzamento de dados.
- [x] Corrigir provaveis bugs em tabelas.

# Para depois
- [ ] No formulário saida/retorno criar um cod. entrega referente a entrega de multiplas nf's comparação == número nf,cód.entrega.
      
- [ ] Criar condição no formulário saida/retorno para verificar número nf, placa, status sendo assim aceito submitar o formulário.

* exportar excel
  * passagem
    * N/D
  * financeiro
    * ["id", "dataHora", "vendedor", "nropedido", "cliente", "tipodefaturamento", "valordopedido", "formapgto", "retiraentrega", "localdaentrega", "localdecobranca", "obs", "fretedestacado", "valorfrete", "dataentrega", "operadornf", "statusnf", "obsfinanceiro", "numeronf", "exped", "quemrecebeu"]
  * expedicao
    * ["id", "dataHora", "numeronf", "exped", "quemrecebeu", "statusdep"]
  * expedicao2
    * ["id", "dataHora", "numeronf", "exped", "quemrecebeu", "statusdep"]
  * retorno
    * ["id", "dataHora", "codentrega", "numeronf", "hodometro"]
  * registroentrega
    * N/D
  * logistica
    * ["id", "dataHora", "numeronf", "exped", "quemrecebeu", "statusdep"]
  * canhoto
    * ["id", "dataHora", "quemrecebeu", "numeronf", "exped", "motorista", "statuscanhoto"]
      
título formulario novo" <%- pegar.charAt(0).toUpperCase() + pegar.slice(1); %> "