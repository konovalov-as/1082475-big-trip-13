import {createInfoTemplate} from './view/info.js';
import {createTabsTemplate} from './view/tabs.js';
import {createFilterContainerTemplate} from './view/filterContainer';
import {createFilterTemplate} from './view/filter';
import {createSortingContainerTemplate} from './view/sorting-container';
import {createSortingTemplate} from './view/sorting';
import {createTripEventsElementTemplate} from './view/trip-events-element.js';
import {createPointTemplate} from './view/point.js';
import {createTripEventEditTemplate} from './view/trip-event-edit.js';
import {createTripEventAddTemplate} from './view/trip-event-add.js';
import {generatePoint} from './mock/point.js';
import {generateInfo} from './mock/info.js';
import {generateTab} from './mock/tabs.js';
import {generateFilter} from './mock/filter';
import {generateSorting} from './mock/sorting';

const TRIP_COUNT = 15;

const points = new Array(TRIP_COUNT).fill().map(generatePoint);
const info = new Array(1).fill().map(generateInfo);
const tabs = new Array(1).fill().map(generateTab);
const filters = generateFilter();
const sorting = generateSorting();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// header
const headerElement = document.querySelector(`.page-header`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripControlsElement = headerElement.querySelector(`.trip-controls`);

// main
const mainElement = document.querySelector(`.page-main`);
const pointsContainer = mainElement.querySelector(`.trip-events`);

// tabs
render(tripMainElement, createInfoTemplate(info[0]), `afterbegin`);
tripControlsElement.innerHTML = ``;
render(tripControlsElement, createTabsTemplate(tabs[0]), `beforeend`);

// filters
render(tripControlsElement, createFilterContainerTemplate(), `beforeend`);
const filterContainer = headerElement.querySelector(`.trip-filters`);
render(filterContainer, createFilterTemplate(filters), `beforeend`);

// sort
render(pointsContainer, createSortingContainerTemplate(), `beforeend`);
const sortContainer = pointsContainer.querySelector(`.trip-sort`);
for (const sort of sorting) {
  render(sortContainer, createSortingTemplate(sort), `beforeend`);
}

render(pointsContainer, createTripEventsElementTemplate(), `beforeend`);

const pointElement = mainElement.querySelector(`.trip-events__list`);
for (let i = 0; i < TRIP_COUNT; i++) {
  render(pointElement, createPointTemplate(points[i]), `beforeend`);
}

const tripEventsItemElement = pointElement.querySelector(`.trip-events__item:first-child`);
tripEventsItemElement.innerHTML = ``;
render(tripEventsItemElement, createTripEventEditTemplate(), `beforeend`);
render(tripEventsItemElement, createTripEventAddTemplate(), `beforeend`);
