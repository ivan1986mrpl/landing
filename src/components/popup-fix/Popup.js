import {
  bodyLockStatus,
  bodyLock,
  bodyUnlock,
} from '../../js/function/bodyLock';

const rootSelector = '[data-popup]';

class Popup {
  selectors = {
    root: rootSelector,
    openButton: '[data-popup-link]',
    closeButton: '[data-popup-close]',
    popupContent: '[data-popup-body]',
  };

  stateClasses = {
    popupActive: 'data-popup-active',
    bodyActive: 'data-popup-open',
  };

  constructor(rootElement, options = {}) {
    this.rootElement = rootElement;

    const defaultOptions = {
      logging: true,
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        location: true,
        goHash: true,
      },
      on: {
        beforeOpen: () => {},
        afterOpen: () => {},
        beforeClose: () => {},
        afterClose: () => {},
      },
    };

    this.options = {
      ...defaultOptions,
      ...options,
      hashSettings: { ...defaultOptions.hashSettings, ...options.hashSettings },
      on: { ...defaultOptions.on, ...options.on },
    };

    this.isOpen = false;
    this.targetOpen = { selector: false, element: false };
    this.previousOpen = { selector: false, element: false };
    this.lastClosed = { selector: false, element: false };
    this.lastFocusEl = null;

    this._selectorOpen = false;
    this._reopen = false;

    this._focusEl = [
      'a[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      'button:not([disabled]):not([aria-hidden])',
      'select:not([disabled]):not([aria-hidden])',
      'textarea:not([disabled]):not([aria-hidden])',
      'area[href]',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])',
    ];

    this.init();
  }

  init = () => {
    this.bindEvents();

    if (this.options.hashSettings.goHash && window.location.hash) {
      this._openToHash();
    }
  };

  bindEvents = () => {
    document.addEventListener('click', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleDocumentKeydown);

    if (this.options.hashSettings.goHash) {
      window.addEventListener('hashchange', () => {
        if (window.location.hash) {
          this._openToHash();
        } else {
          this.close(this.targetOpen.selector);
        }
      });
    }
  };

  _handleDocumentClick = (e) => {
    const buttonOpen = e.target.closest(this.selectors.openButton);
    if (buttonOpen) {
      e.preventDefault();
      const selector = buttonOpen.getAttribute('data-popup-link') || null;
      if (selector) {
        this.lastFocusEl = !this.isOpen ? buttonOpen : this.lastFocusEl;
        this.targetOpen.selector = selector;
        this._selectorOpen = true;
        this.open();
      }
      return;
    }

    const buttonClose = e.target.closest(this.selectors.closeButton);
    if (
      buttonClose ||
      (!e.target.closest(this.selectors.popupContent) && this.isOpen)
    ) {
      e.preventDefault();
      this.close();
    }
  };

  _handleDocumentKeydown = (e) => {
    if (this.options.closeEsc && e.code === 'Escape' && this.isOpen) {
      e.preventDefault();
      this.close();
    }
    if (this.options.focusCatch && e.key === 'Tab' && this.isOpen) {
      this._focusCatch(e);
    }
  };

  open = (selectorValue) => {
    if (!bodyLockStatus) {
      return;
    }

    if (selectorValue?.trim()) {
      this.targetOpen.selector = selectorValue;
      this._selectorOpen = true;
    }

    if (this.isOpen) {
      this._reopen = true;
      this.close();
    }

    if (!this._selectorOpen) {
      this.targetOpen.selector = this.lastClosed.selector;
    }

    this.previousActiveElement = document.activeElement;

    this.targetOpen.element = document.querySelector(
      `[data-popup=${CSS.escape(this.targetOpen.selector)}]`,
    );

    if (!this.targetOpen.element) {
      console.error(
        'Popup element not found for selector:',
        this.targetOpen.selector,
      );
      return;
    }

    if (this.options.hashSettings.location) {
      this._getHash();
      this._setHash();
    }

    this.options.on.beforeOpen(this);
    document.dispatchEvent(
      new CustomEvent('beforePopupOpen', { detail: { popup: this } }),
    );

    this.targetOpen.element.setAttribute(this.stateClasses.popupActive, '');
    document.documentElement.setAttribute(this.stateClasses.bodyActive, '');

    if (!this._reopen) {
      if (this.options.bodyLock) {
        bodyLock();
      }
    } else {
      this._reopen = false;
    }

    this.targetOpen.element.setAttribute('aria-hidden', 'false');

    this.previousOpen = { ...this.targetOpen };

    this._selectorOpen = false;
    this.isOpen = true;

    setTimeout(() => this._focusTrap(), 50);

    this.options.on.afterOpen(this);
    document.dispatchEvent(
      new CustomEvent('afterPopupOpen', { detail: { popup: this } }),
    );
  };

  close = (selectorValue) => {
    if (selectorValue?.trim()) {
      this.previousOpen.selector = selectorValue;
    }

    if (!this.isOpen || !bodyLockStatus) {
      return;
    }

    this.options.on.beforeClose(this);
    document.dispatchEvent(
      new CustomEvent('beforePopupClose', { detail: { popup: this } }),
    );

    this.previousOpen.element.removeAttribute(this.stateClasses.popupActive);
    this.previousOpen.element.setAttribute('aria-hidden', 'true');

    if (!this._reopen) {
      document.documentElement.removeAttribute(this.stateClasses.bodyActive);
      if (this.options.bodyLock) {
        bodyUnlock();
      }
      this.isOpen = false;
    }

    this._removeHash();

    if (this._selectorOpen) {
      this.lastClosed = { ...this.previousOpen };
    }

    this.options.on.afterClose(this);
    document.dispatchEvent(
      new CustomEvent('afterPopupClose', { detail: { popup: this } }),
    );

    setTimeout(() => this._focusTrap(), 50);
  };

  _getHash = () => {
    if (this.options.hashSettings.location) {
      this.hash = `#${this.targetOpen.selector}`;
    }
  };

  _setHash = () => {
    history.pushState('', '', this.hash);
  };

  _removeHash = () => {
    history.pushState('', '', window.location.href.split('#')[0]);
  };

  _openToHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      this.open(hash);
    }
  };

  _focusCatch = (e) => {
    const focusable = Array.from(
      this.targetOpen.element.querySelectorAll(this._focusEl),
    );
    const focusedIndex = focusable.indexOf(document.activeElement);

    if (e.shiftKey && focusedIndex === 0) {
      focusable[focusable.length - 1]?.focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusable.length - 1) {
      focusable[0]?.focus();
      e.preventDefault();
    }
  };

  _focusTrap = () => {
    const focusable = Array.from(
      this.previousOpen.element.querySelectorAll(this._focusEl),
    );
    if (!this.isOpen && this.lastFocusEl) {
      this.lastFocusEl.focus();
    } else {
      focusable[0]?.focus();
    }
  };
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
