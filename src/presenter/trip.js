import TripView from '../view/trip';
import SortingView from '../view/sorting';
import NoPointView from '../view/no-point';

import PointPresenter from './point';

import {updateItem} from '../utils/common';
import {render, RenderPosition} from '../utils/render';

export default class Trip {
  constructor(tripContainer, sorting) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._sorting = sorting;
    this._points = null;

    this._tripListComponent = new TripView();
    this._sortingComponent = new SortingView(this._sorting);
    this._noPointComponent = new NoPointView();

    this._onPointChange = this._onPointChange.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
  }

  init(points) {
    this._points = points;
    this._renderTrip();
  }

  _onModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _onPointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._onPointChange, this._onModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._points.forEach((point) => this._renderPoint(point));
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
    if (this._points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();

    render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);

    this._renderPoints();
  }
}
