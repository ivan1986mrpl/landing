'use strict';

    // header
function menuBurger() {
    const menu = document.querySelector('.menu__body'),
    menuBtn = document.querySelector('.icon-menu');

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

function pageNavigation() {
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

function headerFon() {//появление подложки под header при скролле для лучшей читаимости 
    window.addEventListener('scroll', function () {//
        if (scrollY > 0) {
            document.querySelector('.header').classList.add('scroll');        
        } else {
            document.querySelector('.header').classList.remove('scroll');
        }
    });
}

menuBurger();
pageNavigation();
headerFon();
















