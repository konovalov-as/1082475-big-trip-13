import TripView from '../view/trip';
import SortView from '../view/sort';
import LoadingView from '../view/loading';
import NoPointView from '../view/no-point';

import PointPresenter, {State as PointPresenterViewState} from './point';
import PointNewPresenter from './point-new';

import {sortPointDateUp, sortPointTimeMore, sortPointCostMore} from '../utils/point';
import {render, RenderPosition, remove} from '../utils/render';
import {filter} from '../utils/filter';
import {SortType, UpdateType, UserAction} from '../const';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel, offersModel, destinationsModel, api, newEventButton) {
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._filterModel = filterModel;

    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._currentSortType = SortType.DAY;

    this._isLoading = true;
    this._api = api;

    this._newEventButton = newEventButton;

    this._points = null;

    this._callback = {};

    this._tripListComponent = new TripView();
    this._sortComponent = null;
    this._loadingComponent = new LoadingView();
    this._noPointComponent = new NoPointView();

    this._onViewAction = this._onViewAction.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._tripListComponent, this._onViewAction, newEventButton);
  }

  init() {
    this._pointsModel.addObserver(this._onModelEvent);
    this._offersModel.addObserver(this._onModelEvent);
    this._destinationsModel.addObserver(this._onModelEvent);
    this._filterModel.addObserver(this._onModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._tripListComponent);

    this._pointsModel.removeObserver(this._onModelEvent);
    this._offersModel.removeObserver(this._onModelEvent);
    this._destinationsModel.removeObserver(this._onModelEvent);
    this._filterModel.removeObserver(this._onModelEvent);
  }

  createPoint(callback) {
    if (this._getPoints().length === 0) {
      remove(this._noPointComponent);
      render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);
    }

    this._pointNewPresenter.init(callback, this._offersModel.getOffers(), this._destinationsModel.getDestinations());
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDateUp);
      case SortType.TIME:
        return filteredPoints.sort(sortPointTimeMore);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointCostMore);
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
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update).then((response) => {
          this._pointsModel.addPoint(updateType, response);
        })
        .catch(() => {
          this._pointNewPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update).then(() => {
          this._pointsModel.deletePoint(updateType, update);
        })
        .catch(() => {
          this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
        });
        break;
      default:
        throw new Error(`Unknown action type: '${actionType}'!`);
    }
  }

  _onModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
      default:
        throw new Error(`Unknown update type: '${updateType}'!`);
    }
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setOnSortTypeChange(this._onSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._onViewAction, this._onModeChange, this._newEventButton);
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

    remove(this._sortComponent);
    remove(this._loadingComponent);
    remove(this._noPointComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointCount = points.length;
    const offers = this._offersModel.getOffers();
    const destinations = this._destinationsModel.getDestinations();

    if (pointCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();

    render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);

    this._renderPoints(points, offers, destinations);
  }
}
