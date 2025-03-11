export default function pageNav() {
    const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

    if (menuLinks.length > 0) {
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const menuLink = e.target;
                if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                    e.preventDefault();
                    const goToBlock = document.querySelector(menuLink.dataset.goto);
                    const goToBlockValue = goToBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

                    window.scrollTo({
                        top: goToBlockValue,
                        behavior: "smooth"
                    });
                }
            });
        });
    }
}