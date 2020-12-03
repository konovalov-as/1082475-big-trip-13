import InfoView from './view/info';
import {createTabsTemplate} from './view/tabs';
import {createFilterContainerTemplate} from './view/filter-container';
import {createFilterTemplate} from './view/filter';
import {createSortingContainerTemplate} from './view/sorting-container';
import {createSortingTemplate} from './view/sorting';
import {createPointContainerTemplate} from './view/point-container';
import {createPointTemplate} from './view/point';
import {createPointEditContainerTemplate} from './view/point-edit-container';
import {createPointHeaderEditTemplate} from './view/point-header-edit';
import {createPointHeaderAddTemplate} from './view/point-header-add';
import {createAvailableOfferTemplate} from './view/available-offers';
import {createPointDescriptionTemplate} from './view/point-description';
import {createPointPhotosTemplate} from './view/point-photos';

import {generatePoint} from './mock/point';
import {generateInfo} from './mock/info';
import {generateTab} from './mock/tabs';
import {generateFilter} from './mock/filter';
import {generateSorting} from './mock/sorting';

import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

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
renderTemplate(controlsContainer, createTabsTemplate(tabs), `beforeend`);

// filters
renderTemplate(controlsContainer, createFilterContainerTemplate(), `beforeend`);
const filterContainer = headerContainer.querySelector(`.trip-filters`);
renderTemplate(filterContainer, createFilterTemplate(filters), `beforeend`);

// sorting
renderTemplate(pointsContainer, createSortingContainerTemplate(), `beforeend`);
const sortContainer = pointsContainer.querySelector(`.trip-sort`);
for (const sort of sorting) {
  // сделать вставку через фрагмент
  renderTemplate(sortContainer, createSortingTemplate(sort), `beforeend`);
}

// points
renderTemplate(pointsContainer, createPointContainerTemplate(), `beforeend`);
const pointElement = mainContainer.querySelector(`.trip-events__list`);
for (let point = 1; point < points.length; point++) {
  renderTemplate(pointElement, createPointTemplate(points[point]), `beforeend`);
}

// point add / edit
const pointItemContainer = pointElement.querySelector(`.trip-events__item:first-child`);
pointItemContainer.innerHTML = ``;
renderTemplate(pointItemContainer, createPointEditContainerTemplate(), `beforeend`);

// edit
const pointHeaderEditContainer = pointElement.querySelector(`.event--edit:first-child .event__header`);
renderTemplate(pointHeaderEditContainer, createPointHeaderEditTemplate(points[0]), `beforeend`);
const pointEditAvailableOffersContainer = pointElement.querySelector(`.event--edit:first-child .event__available-offers`);
renderTemplate(pointEditAvailableOffersContainer, createAvailableOfferTemplate(), `beforeend`);
const pointEditDescription = pointElement.querySelector(`.event--edit:first-child .event__section--destination`);
renderTemplate(pointEditDescription, createPointDescriptionTemplate(points[0]), `beforeend`);

// add
renderTemplate(pointItemContainer, createPointEditContainerTemplate(), `beforeend`);
const pointHeaderAddContainer = pointElement.querySelector(`.event--edit:nth-child(2) .event__header`);
renderTemplate(pointHeaderAddContainer, createPointHeaderAddTemplate(points[0]), `beforeend`);
const pointAddAvailableOffersContainer = pointElement.querySelector(`.event--edit:nth-child(2) .event__available-offers`);
renderTemplate(pointAddAvailableOffersContainer, createAvailableOfferTemplate(), `beforeend`);
const pointAddDescription = pointElement.querySelector(`.event--edit:nth-child(2) .event__section--destination`);
renderTemplate(pointAddDescription, createPointDescriptionTemplate(points[0]), `beforeend`);
renderTemplate(pointAddDescription, createPointPhotosTemplate(points[0]), `beforeend`);
