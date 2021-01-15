import ControlsView from '../view/controls';
import NewEventButtonView from '../view/new-event-button';

import {render, RenderPosition, replace, remove} from '../utils/render';
import {filter} from '../utils/filter';

import {FilterType, UpdateType, MenuItem} from '../const';

// import {generateTab} from '../mock/tabs';

export default class Filter {
  constructor(filterContainer, filterModel, pointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._currentFilter = null;
    this._filters = null;

    // this._currentTab = null;
    this._currentTab = MenuItem.STATS;

    this._prevFilterComponent = null;
    this._filterComponent = null;
    this._newEventButtonComponent = null;

    // this._tabs = generateTab();

    this._onModelEvent = this._onModelEvent.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._onMenuClick = this._onMenuClick.bind(this);

    this._pointsModel.addObserver(this._onModelEvent);
    this._filterModel.addObserver(this._onModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    this._filters = this._getFilters();
    this._prevFilterComponent = this._filterComponent;

    this._filterComponent = new ControlsView(this._filters, this._currentFilter, this._currentTab);
    this._filterComponent.setOnFilterTypeChange(this._onFilterTypeChange);
    this._filterComponent.setOnMenuClick(this._onMenuClick);

    this._newEventButtonComponent = new NewEventButtonView();
    this._newEventButtonComponent.setOnNewEventClick(this._onMenuClick);

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

  _onMenuClick(currentTab) {
    // console.log(currentTab)
    // evt.preventDefault();

    if (this._currentTab === currentTab) {
      return;
    }

    // if(!evt.target.matches(`.trip-tabs__btn`)) {
    //   return;
    // }

    this._currentTab = currentTab;

    switch (currentTab) {
      case MenuItem.NEW_EVENT:
        // Скрыть статистику
        // Показать список точек
        // Показать форму добавления новой точки
        // console.log(currentTab)
        break;
      case MenuItem.TABLE:
        // Показать список точек
        // Скрыть статистику
        // console.log(currentTab)
        break;
      case MenuItem.STATS:
        // Скрыть список точек
        // Показать статистику
        // console.log(currentTab)
        break;
    }
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
