/**
 * C5.3
 * задание 3
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
  let inputElement = document.querySelector("input");
  validate(inputElement.value);
});

/**
 *
 * @param {String} value
 * @description проверка введенного значения, вызов функции загрузки данных
 */
function validate(value) {
  value = +value;
  if (typeof value !== undefined && !isNaN(value) && value > 0 && value < 11) {
    loadData(value);
  } else {
    log.insert("число вне диапазона 1-10. повторите ввод");
  }
}

/**
 *
 * @param {Number} itemsCount
 * @description api запрос на сайт picsum.photos, получение данных в формате JSON и в случае успеха вызов функции render
 */
function loadData(itemsCount) {
  const xhr = new XMLHttpRequest();
  let url = `https://picsum.photos/v2/list?limit=${itemsCount}`;
  xhr.open("GET", url);
  xhr.onerror = () => {
    log.insert(`Status: ${xhr.status} Error: ${xhr.response}`);
  };
  xhr.onload = () => {
    if (xhr.status !== 200) {
      log.insert(`Response status: ${xhr.status} Body: ${xhr.response}`);
    } else {
      log.clear();
      const jObject = JSON.parse(xhr.response);
      render(jObject);
    }
  };
  xhr.send();
}

/**
 *
 * @param {Json} jObject
 * @description подготовка шаблона и вставка его в DOM в querySelector("#content")
 */
function render(jObject) {
  let cards = "";
  for (item of jObject) {
    cards += `
        <li>
        <img src="${item.download_url}" alt="${item.author}" width=300 height=150>
        </li>
        `;
  }
  cards = `<ul>${cards}</ul>`;
  const content = document.querySelector("#content");
  content.innerHTML = cards;
}
