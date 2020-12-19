import TripView from '../view/trip';
import SortingView from '../view/sorting';
import NoPointView from '../view/no-point';

import PointPresenter from './point';

import {sortPointOlder, sortPointNewer} from '../utils/point';
import {render, RenderPosition, remove} from '../utils/render';
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
    // this._sortingComponent = new SortingView(this._sorting);
    this._sortingComponent = null;
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
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
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
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      // todo default
    }
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    // this._clearPointList();
    // this._renderPointList();
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType, this._sorting);
    this._sortingComponent.setOnSortTypeChange(this._onSortTypeChange);

    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
    // this._sortingComponent.setOnSortTypeChange(this._onSortTypeChange);
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

  _clearTrip({resetSortType = false} = {}) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortingComponent);
    remove(this._noPointComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }


  _renderTrip() {
    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();

    render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);

    this._renderPoints(points);
  }
}
