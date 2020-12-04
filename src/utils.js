export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/**
 * Принцип работы прост:
 * 1. создаём пустой div-блок
 * 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
 * @return 3. возвращаем этот DOM-элемент
 */

export const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  // todo нужно возвращать первый элемент - return newElement.firstChild; // 3
  // у меня какая-то проблема с этим. Если я делаю возврат первого дочернего элемента,
  // то этот элемент не попадает в DOM. Элемента нет на странице.
  // Сам код при это работает норм, ошибок нет.
  // Поэтому пока возвращаю весь div. Это ломает разметку. Тут понятно.
  // Не понял этот единственный нюанс. Не понятно, что значит иметь общую обертку.
  // Общую обертку с каким-то элементом? Или в целом быть передаваемая сюда разметка
  //  должна быть обернута в один общий тег?
  // К примеру, у компонента info.js есть общая обертка section.
  // Но что-то не так. Разметка из info.js не отрисовывается. Пока не разобрался почему так.
  return newElement; // 3
};
// Единственный нюанс, что HTML в строке должен иметь общую обёртку,
// то есть быть чем-то вроде <nav><a>Link 1</a><a>Link 2</a></nav>,
// а не просто <a>Link 1</a><a>Link 2</a>
