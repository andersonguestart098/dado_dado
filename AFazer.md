# PROJETO SENDO FEITO A 40 DIAS NODE.JS 23/11/2022

![Image of Einstein](https://upload.wikimedia.org/wikipedia/commons/6/6f/Einstein-formal_portrait-35.jpg)

# Para depois
- [ ] No formulário saida/retorno criar um cod. entrega referente a entrega de multiplas nf's comparação == número nf,cód.entrega.
      
- [ ] Criar condição no formulário saida/retorno para verificar número nf, placa, status sendo assim aceito submitar o formulário.
      
# A Fazer
- [ ] Local de cobraça corrigir campo (ON).
      
- [ ] Corrigir data de registro, (data e hora estão errados).
      
- [ ] Colocar autorefresh em todos formulários.
      
- [ ] Campo Venda/frete (undefined).
      
- [ ] Ajustar os links dos formulários para cada setor quando logar no home.
      

# Fazendo


- [ ] Colocar condicionantes no formúlario do financeiro nas formas de pagamento, igual ao jotform.
      
      
- [ ] Fazer teste geral e partir pro abraço.

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
    
  

# Concluido

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