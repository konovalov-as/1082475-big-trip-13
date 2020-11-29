import {createInfoTemplate} from './view/info';
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

const TRIP_COUNT = 15;

const points = new Array(TRIP_COUNT).fill().map(generatePoint);
const info = generateInfo();
const tabs = generateTab();
const filters = generateFilter();
const sorting = generateSorting();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// header
const headerContainer = document.querySelector(`.page-header`);
const tripContainer = headerContainer.querySelector(`.trip-main`);
const controlsContainer = headerContainer.querySelector(`.trip-controls`);

// main
const mainContainer = document.querySelector(`.page-main`);
const pointsContainer = mainContainer.querySelector(`.trip-events`);

// tabs
render(tripContainer, createInfoTemplate(info), `afterbegin`);
controlsContainer.innerHTML = ``;
render(controlsContainer, createTabsTemplate(tabs), `beforeend`);

// filters
render(controlsContainer, createFilterContainerTemplate(), `beforeend`);
const filterContainer = headerContainer.querySelector(`.trip-filters`);
render(filterContainer, createFilterTemplate(filters), `beforeend`);

// sorting
render(pointsContainer, createSortingContainerTemplate(), `beforeend`);
const sortContainer = pointsContainer.querySelector(`.trip-sort`);
for (const sort of sorting) {
  render(sortContainer, createSortingTemplate(sort), `beforeend`);
}

// points
render(pointsContainer, createPointContainerTemplate(), `beforeend`);
const pointElement = mainContainer.querySelector(`.trip-events__list`);
for (let point = 1; point < points.length; point++) {
  render(pointElement, createPointTemplate(points[point]), `beforeend`);
}

// point add / edit
const pointItemContainer = pointElement.querySelector(`.trip-events__item:first-child`);
pointItemContainer.innerHTML = ``;
render(pointItemContainer, createPointEditContainerTemplate(), `beforeend`);

// edit
const pointHeaderEditContainer = pointElement.querySelector(`.event--edit:first-child .event__header`);
render(pointHeaderEditContainer, createPointHeaderEditTemplate(points[0]), `beforeend`);
const pointEditAvailableOffersContainer = pointElement.querySelector(`.event--edit:first-child .event__available-offers`);
render(pointEditAvailableOffersContainer, createAvailableOfferTemplate(), `beforeend`);
const pointEditDescription = pointElement.querySelector(`.event--edit:first-child .event__section--destination`);
render(pointEditDescription, createPointDescriptionTemplate(points[0]), `beforeend`);

// add
render(pointItemContainer, createPointEditContainerTemplate(), `beforeend`);
const pointHeaderAddContainer = pointElement.querySelector(`.event--edit:nth-child(2) .event__header`);
render(pointHeaderAddContainer, createPointHeaderAddTemplate(points[0]), `beforeend`);
const pointAddAvailableOffersContainer = pointElement.querySelector(`.event--edit:nth-child(2) .event__available-offers`);
render(pointAddAvailableOffersContainer, createAvailableOfferTemplate(), `beforeend`);
const pointAddDescription = pointElement.querySelector(`.event--edit:nth-child(2) .event__section--destination`);
render(pointAddDescription, createPointDescriptionTemplate(points[0]), `beforeend`);
render(pointAddDescription, createPointPhotosTemplate(points[0]), `beforeend`);
