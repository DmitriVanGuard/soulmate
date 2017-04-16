<div class="sign">
	<h2 class="sign__title">Войти</h2>
	<form action="signin.php" method="post" class="sign__form">
		<input type="text" name="username" class="sign__input" placeholder="Имя пользователя" require>
		<br>
		<input type="password"name="password" class="sign__input" placeholder="Пароль" required>
		<br>
		<input type="submit" value="Войти" class="sign__btn">
	</form>
	<a href="reg" class="sign__link sign__link_reg">Хотите зарегистрироваться?</a>
	<a href="forgot" class="sign__link sign__link_forgot">Забыли пароль?</a>
</div>