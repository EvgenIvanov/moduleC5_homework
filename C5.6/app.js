/**
 * C5.6
 * задание 4
 */

/**
 * @description класс для работы с отображением логов в элементе #log
 */
class Log {
  constructor() {
    this.logElement = document.getElementById("log");
  }
  clear() {
    while (this.logElement.firstChild) {
      this.logElement.removeChild(this.logElement.firstChild);
    }
  }
  insert(text) {
    this.logElement.insertAdjacentHTML(
      "beforeend",
      //   (this.logElement.firstChild !== null ? "<br>" : "") + text
      `<p>${text}</p>`
    );
  }
}
const log = new Log();

const buttonElement = document.querySelector("button");

/**
 * вешаем событие click на кнопку
 */
buttonElement.addEventListener("click", () => {
  let inputElements = document.querySelectorAll("input");
  let widthValue = inputElements[0].value;
  let heightValue = inputElements[1].value;
  loadData(widthValue, heightValue);
});

/**
 *
 * @param {Number} width
 * @param {Nimber} height
 * @description проверяем оба введенных значения и возвращаем Boolean
 */
function validate(width, height) {
  width = +width;
  height = +height;
  if (
    typeof width !== undefined &&
    !isNaN(width) &&
    typeof height !== undefined &&
    !isNaN(height) &&
    width > 99 &&
    width < 301 &&
    height > 99 &&
    height < 301
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 *
 * @param {Number} width
 * @param {Number} height
 * @description api запрос на сайт picsum.photos, получение данных в формате JSON и в случае успеха вызов функции render
 */
function loadData(width, height) {
  if (!validate(width, height)) {
    log.insert("Одно из чисел вне диапазона от 100 до 300");
    return;
  }
  const url = `https://picsum.photos/${width}/${height}`;
  fetch(url)
    .then((response) => {
      return response.url;
    })
    .then((data) => {
      log.clear();
      render(url, width, height);
    })
    .catch((response) => {
      log.insert(response.toString());
    });
}

/**
 *
 * @param {String} jObject
 * @description подготовка шаблона и вставка его в DOM в querySelector("#content")
 */
function render(url, width, height) {
  let cards = `<ul><li>
<img src="${url}" alt="loaded pict" width=${width || 300} height=${
    height || 150
  }>
</li></ul>`;
  const content = document.querySelector("#content");
  content.innerHTML = cards;
}
