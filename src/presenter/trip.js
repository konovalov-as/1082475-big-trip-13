import TripView from '../view/trip';
import SortingView from '../view/sorting';
import NoPointView from '../view/no-point';

import PointPresenter from './point';

import {sortPointOlder, sortPointNewer} from '../utils/point';
import {render, RenderPosition} from '../utils/render';
import {SortType} from '../const';

export default class Trip {
  constructor(tripContainer, pointsModel, sorting) {
    this._pointsModel = pointsModel;

    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sorting = sorting;
    this._points = null;

    this._tripListComponent = new TripView();
    this._sortingComponent = new SortingView(this._sorting);
    this._noPointComponent = new NoPointView();

    // this._onPointChange = this._onPointChange.bind(this);
    this._onViewAction = this._onViewAction.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._onModelEvent);
  }

  init() {
    // this._points = points;
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.DATE_OLDER:
        return this._pointsModel.getPoints().slice().sort(sortPointOlder);
      case SortType.DATE_NEWER:
        return this._pointsModel.getPoints().slice().sort(sortPointNewer);
    }

    return this._pointsModel.getPoints();
  }

  _onModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _onViewAction(actionType, updateType, update) {
    // this._points = updateItem(this._points, updatedPoint);
    // this._pointPresenter[updatedPoint.id].init(updatedPoint);

    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _onModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPointList();
    // this._renderPointList();
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    this._sortingComponent.setOnSortTypeChange(this._onSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._onViewAction, this._onModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _clearTaskList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderTrip() {
    const points = this._getPoints();
    if (points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();

    render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);

    this._renderPoints(points);
  }
}
