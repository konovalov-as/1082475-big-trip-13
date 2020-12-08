import TripView from '../view/point-container';
import SortingView from '../view/sorting';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripComponent = new TripView();
    this._sortComponent = new SortingView();
    // this._taskListComponent = new TaskListView();
    this._noPointComponent = null;
  }

  init(points) {
    this._points = points.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderPoint() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderPoints() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoPoints() {
    // Метод для рендеринга заглушки
  }

  // _renderLoadMoreButton() {
  //   // Метод, куда уйдёт логика по отрисовке компонетов задачи,
  //   // текущая функция renderTask в main.js
  // }

  _renderTrip() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
