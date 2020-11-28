import {createInfoTemplate} from './view/info.js';
import {createTabsTemplate} from './view/tabs.js';
import {createFilterContainerTemplate} from './view/filterContainer';
import {createFilterTemplate} from './view/filter';
import {createTripSortTemplate} from './view/trip-sort.js';
import {createTripEventsElementTemplate} from './view/trip-events-element.js';
import {createPointTemplate} from './view/point.js';
import {createTripEventEditTemplate} from './view/trip-event-edit.js';
import {createTripEventAddTemplate} from './view/trip-event-add.js';
import {generatePoint} from './mock/point.js';
import {generateInfo} from './mock/info.js';
import {generateTab} from './mock/tabs.js';
import {generateFilter} from './mock/filter';

const TRIP_COUNT = 15;

const points = new Array(TRIP_COUNT).fill().map(generatePoint);
const info = new Array(1).fill().map(generateInfo);
const tabs = new Array(1).fill().map(generateTab);
const filters = generateFilter();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// header
const headerElement = document.querySelector(`.page-header`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripControlsElement = headerElement.querySelector(`.trip-controls`);

// main
const mainElement = document.querySelector(`.page-main`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

// tabs
render(tripMainElement, createInfoTemplate(info[0]), `afterbegin`);
tripControlsElement.innerHTML = ``;
render(tripControlsElement, createTabsTemplate(tabs[0]), `beforeend`);

// filters
render(tripControlsElement, createFilterContainerTemplate(), `beforeend`);
const filterContainer = headerElement.querySelector(`.trip-filters`);
render(filterContainer, createFilterTemplate(filters), `beforeend`);

render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createTripEventsElementTemplate(), `beforeend`);

const pointElement = mainElement.querySelector(`.trip-events__list`);
for (let i = 0; i < TRIP_COUNT; i++) {
  render(pointElement, createPointTemplate(points[i]), `beforeend`);
}

const tripEventsItemElement = pointElement.querySelector(`.trip-events__item:first-child`);
tripEventsItemElement.innerHTML = ``;
render(tripEventsItemElement, createTripEventEditTemplate(), `beforeend`);
render(tripEventsItemElement, createTripEventAddTemplate(), `beforeend`);
