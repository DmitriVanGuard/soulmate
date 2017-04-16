<!DOCTYPE html>
<html lang="en">
	<?php 
		require_once "includes/head.php"; 
	?>
	<body>
		<div class="wrapper">
			<?php
				require_once "includes/nav.php";
			?>
			
			<div class="container">
				<main class="profile">
					<div class="profile__left">
						<section class="user thumbnail">
							<div class="user__pic">
								<img src="img/content/ava.jpg" alt="My photo">
							</div>
							<button class="user__btn">Редактировать</button>
						</section>
					</div>
					
					<div class="profile__right">
						<section class="about thumbnail">
							<h2 class="about__title">Имя</h2>
							<hr class="about__line">
							<div class="about__info">
								<h3 class="about__label">Родной город:</h3>
								<h3 class="about__label">Девиз:</h3>
							</div>
							<hr class="about__line">
						</section>	
					</div>
				</main>

				<section class="history">
					<?php include_once "includes/article.php"; ?>
				</section>

			</div>
		</div>
	</body>
</html>