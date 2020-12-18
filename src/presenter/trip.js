import TripView from '../view/trip';
import SortingView from '../view/sorting';
import NoPointView from '../view/no-point';

import PointPresenter from './point';

import {sortPointOlder, sortPointNewer} from '../utils/point';
import {render, RenderPosition} from '../utils/render';
import {SortType, UpdateType, UserAction} from '../const';

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
      // todo default
    }

    return this._pointsModel.getPoints();
  }

  _onModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _onViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._pointsModel.deletePoint(updateType, update);
        break;
      // todo default
    }
  }

  _onModelEvent(updateType, data) {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.PointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
      // todo default
    }
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
