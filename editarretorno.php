<?php
include_once "conexao.php";

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

if (empty($dados['id'])) {
    $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: Necessário enviar o id!</div>"];
}elseif (empty($dados['codentrega'])) {
    $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: Necessário enviar datahora!</div>"];
}elseif (empty($dados['motorista'])) {
    $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: Necessário enviar o numeronf!</div>"];
}elseif (empty($dados['hodometro'])) {
    $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: Necessário enviar o exped!</div>"];
}elseif (empty($dados['datahora'])) {
    $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: Necessário enviar o quemrecebeu!</div>"];
}elseif (empty($dados['obs'])) {
}else {
    $query_usuario = "UPDATE retorno SET codentrega=:codentrega, motorista=:motorista, hodometro=:hodometro, datahora=:datahora, obs=:obs WHERE id=:id"; //nunca bagunçar essa porra de função se não ele não altera no banco de dados
    $edit_usuario = $conn->prepare($query_usuario);
    $edit_usuario->bindParam(':codentrega', $dados['codentrega']);
    $edit_usuario->bindParam(':motorista', $dados['motorista']);
    $edit_usuario->bindParam(':hodometro', $dados['hodometro']);
    $edit_usuario->bindParam(':datahora', $dados['datahora']);
    $edit_usuario->bindParam(':obs', $dados['obs']);
    $edit_usuario->bindParam(':id', $dados['id']);

    if($edit_usuario->execute()){
        $retorna = ['status' => true, 'msg' => "<div class='alert alert-success' role='alert'>Usuário editado com sucesso!</div>"];
    }else{
        $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: Necessário enviar o e-mail!</div>"];
    }    
}

echo json_encode($retorna);
