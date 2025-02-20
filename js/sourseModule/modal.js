function modal() {
    const modalTriggers = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.classList.add('lock');
        if (modalTimerId) {
            clearInterval(modalTimerId);//если пользователь уже открывал окно, оно не будет открываться по истечению интервала (убрать строку, если не используется открытие по таймеру)
        }
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.classList.remove('lock');
    }

    modalTriggers.forEach(btnOpen => {
        btnOpen.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (e) => {//при клике на подложку и на крестик модальное окно закроется
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }        
    });

    document.addEventListener('keydown', (e) => {//закрытие при клике на Escape
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 4000); //открытие окна после 4 секунд

    //открытие модального окна при пролистывании страницы вниз до конца, сработает обработчик только один раз
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);//удаляем обработчик события, если уже 1 раз при скролле до конца страницы окно открывалось
        }
    }
    window.addEventListener('scroll', showModalByScroll);
} 
modal(); 