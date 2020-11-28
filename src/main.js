import {createInfoTemplate} from './view/info';
import {createTabsTemplate} from './view/tabs';
import {createFilterContainerTemplate} from './view/filter-container';
import {createFilterTemplate} from './view/filter';
import {createSortingContainerTemplate} from './view/sorting-container';
import {createSortingTemplate} from './view/sorting';
import {createPointContainerTemplate} from './view/point-container';
import {createPointTemplate} from './view/point';
import {createPointEditTemplate} from './view/point-edit';
import {createPointAddTemplate} from './view/point-add';

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
for (const point of points) {
  render(pointElement, createPointTemplate(point), `beforeend`);
}

const tripEventsItemElement = pointElement.querySelector(`.trip-events__item:first-child`);
tripEventsItemElement.innerHTML = ``;
render(tripEventsItemElement, createPointEditTemplate(), `beforeend`);
render(tripEventsItemElement, createPointAddTemplate(), `beforeend`);
