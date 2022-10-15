<?php
include_once "conexao.php";

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

    $query_usuario = "UPDATE financeiro SET datahora=:datahora, vendedor=:vendedor, nropedido=:nropedido, cliente=:cliente, tipodefaturamento=:tipodefaturamento, valordopedido=:valordopedido, formapgto=:formapgto, retiraentrega=:retiraentrega, localdaentrega=:localdaentrega, localdecobranca=:localdecobranca, obs1=:obs1, fretedestacado=:fretedestacado, valorfrete=:valorfrete, dataentrega=:dataentrega, operadornf=:operadornf, statusnf=:statusnf, obs2=:obs2, numeronf=:numeronf, exped=:exped, quemrecebeu=:quemrecebeu WHERE id=:id"; //nunca bagunçar essa porra de função se não ele não altera no banco de dados
    $edit_usuario = $conn->prepare($query_usuario);
    $edit_usuario->bindParam(':datahora', $dados['datahora']);
    $edit_usuario->bindParam(':vendedor', $dados['vendedor']);
    $edit_usuario->bindParam(':nropedido', $dados['nropedido']);
    $edit_usuario->bindParam(':cliente', $dados['cliente']);
    $edit_usuario->bindParam(':tipodefaturamento', $dados['tipodefaturamento']);
    $edit_usuario->bindParam(':valordopedido', $dados['valordopedido']);
    $edit_usuario->bindParam(':formapgto', $dados['formapgto']);
    $edit_usuario->bindParam(':retiraentrega', $dados['retiraentrega']);
    $edit_usuario->bindParam(':localdaentrega', $dados['localdaentrega']);
    $edit_usuario->bindParam(':localdecobranca', $dados['localdecobranca']);
    $edit_usuario->bindParam(':obs1', $dados['obs1']);
    $edit_usuario->bindParam(':fretedestacado', $dados['fretedestacado']);
    $edit_usuario->bindParam(':valorfrete', $dados['valorfrete']);
    $edit_usuario->bindParam(':dataentrega', $dados['dataentrega']);
    $edit_usuario->bindParam(':operadornf', $dados['operadornf']);
    $edit_usuario->bindParam(':statusnf', $dados['statusnf']);
    $edit_usuario->bindParam(':obs2', $dados['obs2']);
    $edit_usuario->bindParam(':numeronf', $dados['numeronf']);
    $edit_usuario->bindParam(':exped', $dados['exped']);
    $edit_usuario->bindParam(':quemrecebeu', $dados['quemrecebeu']);
    $edit_usuario->bindParam(':id', $dados['id']);

    if($edit_usuario->execute()){
        $retorna = ['status' => true, 'msg' => "<div class='alert alert-success' role='alert'>Usuário editado com sucesso!</div>"];
    }else{
        $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: Necessário enviar o e-mail!</div>"];
    }    

echo json_encode($retorna);
