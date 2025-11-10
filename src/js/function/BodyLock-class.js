export class BodyLock {
  constructor() {
    this.status = true;
    this.lockPaddingElements = [
      ...document.querySelectorAll('[data-right-padding]'),
      document.body,
    ];
  }

  toggle(delay = 500) {
    document.documentElement.hasAttribute('data-scroll-lock')
      ? this.unlock(delay)
      : this.lock(delay);
  }

  unlock(delay = 500) {
    if (!this.status) {
      return;
    }

    setTimeout(() => {
      this.lockPaddingElements.forEach((el) => {
        el.style.paddingRight = '';
        el.style.removeProperty('--lock-padding-right');
      });
      document.documentElement.removeAttribute('data-scroll-lock');
    }, delay);

    this._setStatusTimeout(delay);
  }

  lock(delay = 500) {
    if (!this.status) {
      return;
    }

    const lockPaddingValue =
      window.innerWidth - document.body.offsetWidth + 'px';

    this.lockPaddingElements.forEach((el) => {
      el.style.paddingRight = lockPaddingValue;
      el.style.setProperty('--lock-padding-right', lockPaddingValue);
    });

    document.documentElement.setAttribute('data-scroll-lock', '');

    this._setStatusTimeout(delay);
  }

  _setStatusTimeout(delay) {
    this.status = false;
    setTimeout(() => (this.status = true), delay);
  }
}

/* 
import { BodyLock } from './function/BodyLock';

const bodyLock = new BodyLock();

// Заблокировать
bodyLock.lock();

// Разблокировать
bodyLock.unlock();

// Переключить
bodyLock.toggle();

*/
