import TripView from '../view/trip';
import SortingView from '../view/sorting';
import NoPointView from '../view/no-point';

import PointPresenter from './point';

// import {updateItem} from '../utils/common';
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

    this._onPointChange = this._onPointChange.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
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

  _onPointChange(updatedPoint) {
    // this._points = updateItem(this._points, updatedPoint);
    // Здесь будем вызывать обновление модели
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
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
    const pointPresenter = new PointPresenter(this._tripListComponent, this._onPointChange, this._onModeChange);
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
