import TripView from '../view/trip';
import SortingView from '../view/sorting';
import PointView from '../view/point';
import PointEditContainerView from '../view/point-edit-container';

import {render, RenderPosition, replace} from '../utils/render';

export default class Trip {
  constructor(tripContainer, sorting) {
    this._tripContainer = tripContainer;

    this._tripComponent = new TripView();
    this._sorting = sorting;
    this._sortComponent = new SortingView(this._sorting);
    // this._taskListComponent = new TaskListView();
    this._noPointComponent = null;
  }

  init(points, sorting) {
    this._points = points.slice();
    this._sorting = sorting;
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._renderSort();
    this._renderTrip();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditContainerView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    pointComponent.setOnRollupButtonClick(() => {
      replacePointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    pointEditComponent.setOnFormSubmitClick(() => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._tripComponent, pointComponent, RenderPosition.BEFOREEND);
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

    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);

    this._renderPoints();
  }
}
