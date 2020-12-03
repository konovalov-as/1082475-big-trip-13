import InfoView from './view/info';
import TabsView from './view/tabs';
import FilterContainerView from './view/filter-container';
import FilterView from './view/filter';
import SortingContainerView from './view/sorting-container';
import SortingView from './view/sorting';
import PointContainerView from './view/point-container';
import PointView from './view/point';
import PointEditContainerView from './view/point-edit-container';
import PointHeaderAddView from './view/point-header-add';
import PointHeaderEditView from './view/point-header-edit';
import AvailableOfferView from './view/available-offers';
import PointDescriptionView from './view/point-description';
import PointPhotosView from './view/point-photos';

import {generatePoint} from './mock/point';
import {generateInfo} from './mock/info';
import {generateTab} from './mock/tabs';
import {generateFilter} from './mock/filter';
import {generateSorting} from './mock/sorting';

import {renderElement, RenderPosition} from "./utils.js";

const pointsCount = 15;

const points = new Array(pointsCount).fill().map(generatePoint);
const info = generateInfo();
const tabs = generateTab();
const filters = generateFilter();
const sorting = generateSorting();

// header
const headerContainer = document.querySelector(`.page-header`);
const tripContainer = headerContainer.querySelector(`.trip-main`);
const controlsContainer = headerContainer.querySelector(`.trip-controls`);

// main
const mainContainer = document.querySelector(`.page-main`);
const pointsContainer = mainContainer.querySelector(`.trip-events`);

// tabs
renderElement(tripContainer, new InfoView(info).getElement(), RenderPosition.AFTERBEGIN);
controlsContainer.innerHTML = ``;
renderElement(controlsContainer, new TabsView(tabs).getElement(), RenderPosition.BEFOREEND);

// filters
renderElement(controlsContainer, new FilterContainerView().getElement(), RenderPosition.BEFOREEND);
const filterContainer = headerContainer.querySelector(`.trip-filters`);
renderElement(filterContainer, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

// sorting
renderElement(pointsContainer, new SortingContainerView().getElement(), RenderPosition.BEFOREEND);
const sortContainer = pointsContainer.querySelector(`.trip-sort`);
for (const sort of sorting) {
  // сделать вставку через фрагмент
  renderElement(sortContainer, new SortingView(sort).getElement(), RenderPosition.BEFOREEND);
}

// points
renderElement(pointsContainer, new PointContainerView().getElement(), RenderPosition.BEFOREEND);
const pointElement = mainContainer.querySelector(`.trip-events__list`);
for (let point = 1; point < points.length; point++) {
  renderElement(pointElement, new PointView(points[point]).getElement(), RenderPosition.BEFOREEND);
}

// point add / edit
const pointItemContainer = pointElement.querySelector(`.trip-events__item:first-child`);
pointItemContainer.innerHTML = ``;
renderElement(pointItemContainer, new PointEditContainerView().getElement(), RenderPosition.BEFOREEND);

// edit
const pointHeaderEditContainer = pointElement.querySelector(`div:first-child .event--edit .event__header`);
renderElement(pointHeaderEditContainer, new PointHeaderEditView(points[0]).getElement(), RenderPosition.BEFOREEND);
const pointEditAvailableOffersContainer = pointElement.querySelector(`div:first-child .event--edit .event__available-offers`);
renderElement(pointEditAvailableOffersContainer, new AvailableOfferView().getElement(), RenderPosition.BEFOREEND);
const pointEditDescription = pointElement.querySelector(`div:first-child .event--edit .event__section--destination`);
renderElement(pointEditDescription, new PointDescriptionView(points[0]).getElement(), RenderPosition.BEFOREEND);

// add
renderElement(pointItemContainer, new PointEditContainerView().getElement(), RenderPosition.BEFOREEND);
const pointHeaderAddContainer = pointElement.querySelector(`div:nth-child(2) .event--edit .event__header`);
renderElement(pointHeaderAddContainer, new PointHeaderAddView(points[0]).getElement(), RenderPosition.BEFOREEND);
const pointAddAvailableOffersContainer = pointElement.querySelector(`div:nth-child(2) .event--edit .event__available-offers`);
renderElement(pointAddAvailableOffersContainer, new AvailableOfferView().getElement(), RenderPosition.BEFOREEND);
const pointAddDescription = pointElement.querySelector(`div:nth-child(2) .event--edit .event__section--destination`);
renderElement(pointAddDescription, new PointDescriptionView(points[0]).getElement(), RenderPosition.BEFOREEND);
renderElement(pointAddDescription, new PointPhotosView(points[0]).getElement(), RenderPosition.BEFOREEND);
