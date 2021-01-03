import TripView from '../view/trip';
import SortingView from '../view/sorting';
import LoadingView from '../view/loading';
import NoPointView from '../view/no-point';

import PointPresenter from './point';
import PointNewPresenter from './point-new';

import {sortPointOlder, sortPointNewer} from '../utils/point';
import {render, RenderPosition, remove} from '../utils/render';
import {filter} from '../utils/filter';
import {SortType, UpdateType, UserAction, FilterType} from '../const';

export default class Trip {
  constructor(tripContainer, pointsModel, sorting, filterModel, offersModel, destinationsModel, api) {
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._filterModel = filterModel;

    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._currentSortType = SortType.DEFAULT;
    this._sorting = sorting;

    this._isLoading = true;
    this._api = api;

    this._points = null;

    this._tripListComponent = new TripView();
    // this._sortingComponent = new SortingView(this._sorting);
    this._sortingComponent = null;
    this._loadingComponent = new LoadingView();
    this._noPointComponent = new NoPointView();

    // this._onPointChange = this._onPointChange.bind(this);
    this._onViewAction = this._onViewAction.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._onModelEvent);
    this._filterModel.addObserver(this._onModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._tripListComponent, this._onViewAction);
  }

  init() {
    // this._points = points;
    this._renderTrip();
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    // todo возможно переменные filterType, points, filteredPoints
    // нужно перенести в поля класса
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DATE_OLDER:
        return filteredPoints.sort(sortPointOlder);
      case SortType.DATE_NEWER:
        return filteredPoints.sort(sortPointNewer);
      // todo default
    }

    return filteredPoints;
  }

  _onModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _onViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          });
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        // this._clearTrip();
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

  _renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._onViewAction, this._onModeChange);
    pointPresenter.init(point, offers, destinations);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points, offers, destinations) {
    points.forEach((point) => this._renderPoint(point, offers, destinations));
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortingComponent);
    remove(this._loadingComponent);
    remove(this._noPointComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointCount = points.length;

    setTimeout(() => {
      const offers = this._offersModel.getOffers();
      const destinations = this._destinationsModel.getDestinations();

      if (pointCount === 0) {
        this._renderNoPoints();
        return;
      }

      this._renderSort();

      render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);

      this._renderPoints(points, offers, destinations);
    }, 500);

  }
}
