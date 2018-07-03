<?php 
	//parametros que se reciben de Angularjs
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
    $request 		= json_decode($postdata);
    
    $folio =  $request->folio;
    $curp = $request->curp;
    $primerap = $request->primerap;
    $segundoap = $request->segundoap;
    $nombre = $request->nombre;
    $fecnac = $request->fecnac;
    $edonac = $request->edonac;
    $sexo = $request->sexo;
    $nacorigen = $request->nacorigen;
    $edo = $request->edo;
    $mun = $request->mun;
    $loc = $request->loc;

    require_once 'db.php'; 
    
	$query = ("INSERT INTO pacientes VALUES ('$folio', '$curp', '$primerap', '$segundoap', '$nombre', '$fecnac', '$edonac', '$sexo', '$nacorigen', '$edo', '$mun', '$loc')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $result = $mysqli->affected_rows;
    
	echo $json_response = "exito";
?>