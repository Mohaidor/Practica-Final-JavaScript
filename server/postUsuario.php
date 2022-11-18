<?php 
//Capturamos el datos que viene del formulario con $_POST de php.
$contenido=file_get_contents('php://input');
//abre archivo y permisos
$f = fopen("usuarios.json", 'w+b');
//escribe el contenido al archivo
fwrite($f,$contenido);
//cierra archivo
fclose($f);

?>