export default function menuBurger() {
	const menu = document.querySelector('.menu__body'),
	menuBtn = document.querySelector('.icon-menu');

	const headerHeight = document.querySelector('.header').offsetHeight;
	document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
	console.log(headerHeight);
	

	if (menu && menuBtn) {
		menuBtn.addEventListener('click', () => {
			menu.classList.toggle('menu-open');
			menuBtn.classList.toggle('menu-open');
			document.body.classList.toggle('lock');
		});

		menu.addEventListener('click', event => {
			if (event.target.classList.contains('menu__body')) {
				menu.classList.remove('menu-open');
				menuBtn.classList.remove('menu-open');
				document.body.classList.remove('lock');
			}
		});

		menu.querySelectorAll('.menu__link').forEach(link => {
			link.addEventListener('click', () => {//скролл к секциям
				menu.classList.remove('menu-open');
				menuBtn.classList.remove('menu-open');
				document.body.classList.remove('lock');
			});
		});
	}
}

