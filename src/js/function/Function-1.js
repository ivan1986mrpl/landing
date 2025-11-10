/* Перевірка мобільного браузера */
export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
/* Додавання класу touch для HTML, якщо браузер мобільний */
export function addTouchAttr() {
  // Додавання data-fls-touch для HTML, якщо браузер мобільний
  if (isMobile.any()) {
    document.documentElement.setAttribute('data-fls-touch', '');
  }
}
// Додавання loaded для HTML після повного завантаження сторінки
export function addLoadedAttr() {
  if (!document.documentElement.hasAttribute('data-fls-preloader-loading')) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        document.documentElement.setAttribute('data-fls-loaded', '');
      }, 0);
    });
  }
}
// Отримання хешу на адресі сайту
export function getHash() {
  if (location.hash) {
    return location.hash.replace('#', '');
  }
}
// Вказівка хеша на адресу сайту
export function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0];
  history.pushState('', '', hash);
}

// Отримати ім'я по значенню в об'єкті
export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
// Отримати цифри з рядка
export function getDigFromString(item) {
  return parseInt(item.replace(/[^\d]/g, ''));
}
// Форматування цифр типу 100 000 000
export function getDigFormat(item, sepp = ' ') {
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${sepp}`);
}
// Прибрати клас з усіх елементів масиву
export function removeClasses(array, className) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
}
// Унікалізація масиву
export function uniqArray(array) {
  return array.filter((item, index, self) => self.indexOf(item) === index);
}
// Функція отримання індексу всередині батьківського елемента
export function indexInParent(parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}
// Функція перевіряє чи об'єкт видимий
export function isHidden(el) {
  return el.offsetParent === null;
}
// Обробка медіа запитів з атрибутів
export function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array)
    .filter((item) => item.dataset[dataSetValue])
    .map((item) => {
      const [value, type = 'max'] = item.dataset[dataSetValue].split(',');
      return { value, type, item };
    });

  if (media.length === 0) {
    return [];
  }

  // Отримуємо унікальні брейкпоінти
  const breakpointsArray = media.map(
    ({ value, type }) => `(${type}-width: ${value}px),${value},${type}`,
  );
  const uniqueQueries = [...new Set(breakpointsArray)];

  return uniqueQueries.map((query) => {
    const [mediaQuery, mediaBreakpoint, mediaType] = query.split(',');
    const matchMedia = window.matchMedia(mediaQuery);

    // Фільтруємо об'єкти з потрібними умовами
    const itemsArray = media.filter(
      (item) => item.value === mediaBreakpoint && item.type === mediaType,
    );

    return { itemsArray, matchMedia };
  });
}

export function formatDate(date, sepp) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}${sepp}${month}${sepp}${year}`;
}
