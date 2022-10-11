<?php
include_once "conexao.php";

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

    $query_usuario = "UPDATE financeiro SET :dado=:valor_dado  WHERE id=:id"; //nunca bagunçar essa porra de função se não ele não altera no banco de dados
    $edit_usuario = $conn->prepare($query_usuario);
    $edit_usuario->bindParam(':valor_dado', $dados['valor_dado']);
    $edit_usuario->bindParam(':dado', $dados['dado']);
    $edit_usuario->bindParam(':id', $dados['id']);


    if($edit_usuario->execute()){
        $retorna = ['status' => true, 'msg' => "<div class='alert alert-success' role='alert'>Usuário editado com sucesso!</div>"];
    }else{
        $retorna = ['status' => false, 'msg' => "<div class='alert alert-danger' role='alert'>Erro: Necessário enviar o e-mail!</div>"];
    }    

echo json_encode($retorna);