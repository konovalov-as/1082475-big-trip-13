import ControlsView from '../view/controls';
import NewEventButtonView from '../view/new-event-button';

import {render, RenderPosition, replace, remove} from '../utils/render';
import {filter} from '../utils/filter';

import {FilterType, UpdateType} from '../const';

import {generateTab} from '../mock/tabs';

export default class Filter {
  constructor(filterContainer, filterModel, pointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._currentFilter = null;
    this._filters = null;

    this._prevFilterComponent = null;
    this._filterComponent = null;
    this._newEventButtonComponent = null;

    this._tabs = generateTab();

    this._onModelEvent = this._onModelEvent.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._onModelEvent);
    this._filterModel.addObserver(this._onModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    this._filters = this._getFilters();
    this._prevFilterComponent = this._filterComponent;

    this._filterComponent = new ControlsView(this._tabs, this._filters, this._currentFilter);
    this._filterComponent.setOnFilterTypeChange(this._onFilterTypeChange);

    this._newEventButtonComponent = new NewEventButtonView();

    if (this._prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);

      render(this._filterContainer, this._newEventButtonComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, this._prevFilterComponent);
    remove(this._prevFilterComponent);
  }

  _onModelEvent() {
    this.init();
  }

  _onFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const points = this._pointsModel.getPoints();

    return [
      {
        type: FilterType.EVERYTHING,
        name: FilterType.EVERYTHING.toUpperCase(),
        count: filter[FilterType.EVERYTHING](points).length
      },
      {
        type: FilterType.PAST,
        name: FilterType.PAST.toUpperCase(),
        count: filter[FilterType.PAST](points).length
      },
      {
        type: FilterType.FUTURE,
        name: FilterType.FUTURE.toUpperCase(),
        count: filter[FilterType.FUTURE](points).length
      },
    ];
  }
}
