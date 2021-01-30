/**
 * C5.6
 * задание 4
 */
const STORAGEKEY = "Unit C5.7";
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
  let pageValue = inputElements[0].value;
  let limitValue = inputElements[1].value;
  loadData(pageValue, limitValue);
});

/**
 *
 * @param {Number} page
 * @param {Nimber} limit
 * @description проверяем оба введенных значения и возвращаем Boolean
 */
function validate(page, limit) {
  page = +page;
  limit = +limit;
  if (
    (typeof page === undefined || isNaN(page) || page < 1 || page > 10) &&
    (typeof limit === undefined || isNaN(limit) || limit < 1 || limit > 10)
  ) {
    log.insert('Значения "Номер страницы" и "Лимит" вне диапазона от 1 до 10');
    return false;
  } else if (
    typeof page === undefined ||
    isNaN(page) ||
    page < 1 ||
    page > 10
  ) {
    log.insert('Значение "Номер страницы" вне диапазона от 1 до 10');
    return false;
  } else if (
    typeof limit === undefined ||
    isNaN(limit) ||
    limit < 1 ||
    limit > 10
  ) {
    log.insert('Значение "Лимит" вне диапазона от 1 до 10');
    return false;
  }
  return true;
}

/**
 *
 * @param {Number} page
 * @param {Number} limit
 * @description api запрос на сайт picsum.photos, получение данных в формате JSON и в случае успеха вызов функции render
 */
function loadData(page, limit) {
  if (!validate(page, limit)) return;

  const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem(STORAGEKEY, JSON.stringify(data));
      log.clear();
      render(data);
    })
    .catch((response) => {
      log.insert(response.toString());
    });
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
      <img src="${item.download_url}" alt="${item.author} id=${item.id}" width=300 height=200>
      </li>
      `;
  }
  cards = `<ul>${cards}</ul>`;
  const content = document.querySelector("#content");
  content.innerHTML = cards;
}
