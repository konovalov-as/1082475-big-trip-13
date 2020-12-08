import TripView from '../view/point-container';
import SortingView from '../view/sorting';

import {render, RenderPosition} from '../utils/render';

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
    render(this._tripComponent, this._tripComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderPoints() {
    // Метод для рендеринга N-задач за раз
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    // Метод для рендеринга заглушки
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  // _renderLoadMoreButton() {
  //   // Метод, куда уйдёт логика по отрисовке компонетов задачи,
  //   // текущая функция renderTask в main.js
  // }

  _renderTrip() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js

    if (this._points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();

    this._renderPoints(this._points);
  }
}
