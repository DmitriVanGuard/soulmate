<?php
$dbhost  = 'localhost';   
$dbname  = 'soulmate';  
$dbuser  = 'root';  
$dbpass  = 'admin123';  

function fatal_error($msg){
$msg2 = $conn->error;

echo <<< _END
	К сожалению, завершить ....
	Было получено следующее сообщение об ошбки:

	<p>$msg: $msg2</p>		

	Пожалуйста обратитесь....
_END;
}

