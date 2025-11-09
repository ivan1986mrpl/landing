import {
  bodyLock,
  bodyUnlock,
  bodyLockStatus,
} from '../../js/function/bodyLock';

const rootSelector = '[data-popup]';

class Popup {
  selectors = {
    root: rootSelector,
    link: '[data-popup-link]',
    close: '[data-popup-close]',
    content: '[data-popup-content]',
  };

  stateClasses = {
    isOpen: 'is-open',
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.bindEvents();
  }

  bindEvents() {
    document.body.addEventListener('click', this.onBodyClick);
    document.addEventListener('keydown', this.onEscapePress);
  }

  onBodyClick = (e) => {
    const link = e.target.closest(this.selectors.link);
    const close = e.target.closest(this.selectors.close);
    const popupContent = e.target.closest(this.selectors.content);

    // Открытие попапа
    if (link) {
      e.preventDefault();
      const popupName = link.dataset.popupLink;
      const targetPopup = document.querySelector(`[data-popup="${popupName}"]`);
      this.open(targetPopup);
      return;
    }

    // Закрытие по кнопке
    if (close) {
      e.preventDefault();
      const popup = close.closest(this.selectors.root);
      this.close(popup);
      return;
    }

    // Закрытие по клику на фон
    const openPopup = document.querySelector(
      `${this.selectors.root}.${this.stateClasses.isOpen}`,
    );
    if (openPopup && !popupContent && e.target.closest(this.selectors.root)) {
      this.close(openPopup);
    }
  };

  onEscapePress = (e) => {
    if (e.code === 'Escape') {
      const openPopup = document.querySelector(
        `${this.selectors.root}.${this.stateClasses.isOpen}`,
      );
      if (openPopup) {
        this.close(openPopup);
      }
    }
  };

  open(popupElement) {
    if (popupElement && bodyLockStatus) {
      const activePopup = document.querySelector(
        `${this.selectors.root}.${this.stateClasses.isOpen}`,
      );

      if (activePopup) {
        this.close(activePopup, false);
      } else {
        bodyLock();
      }

      popupElement.classList.add(this.stateClasses.isOpen);
    }
  }

  close(popupElement, doUnlock = true) {
    if (popupElement && bodyLockStatus) {
      popupElement.classList.remove(this.stateClasses.isOpen);
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }
}

class PopupCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Popup(element);
    });
  }
}

export default PopupCollection;
