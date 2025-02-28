export default function pageNavigation() {
	//============== плавный скролл к якорям =========================
	const anchors = document.querySelectorAll('a[href*="#"]');//в атрибуте ссылки href указать Id секции, к которой нужно перейти

	anchors.forEach(anchor => {
		anchor.addEventListener('click', event => {
			event.preventDefault();

			const blockId = anchor.getAttribute('href').substring(1);

			document.getElementById(blockId).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		});
	});
}