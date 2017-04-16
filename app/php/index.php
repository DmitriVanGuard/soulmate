<?php 
require_once "dynamic/config.php";
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname); // Подключаемся к БД
if( $conn -> connect_error ) die(fatal_error($conn -> connect_error)); // Если ошибка то убиваем подключение


 ?>

<!DOCTYPE html>
<html lang="RU-ru">
	<?php 
		require_once "includes/head.php"; 
	?>
	<body>
		<div class="wrapper wrapper_welcome">
			 <div class="container">
			 	<div class="blur"></div>
				<header class="header">
					<h1 class="header__title">
						Find your soulmate
					</h1>
				</header>
			 	<?php
					require_once 'includes/sign/signin.php';
			 	?>
			 </div>
		</div>
	</body>
</html>