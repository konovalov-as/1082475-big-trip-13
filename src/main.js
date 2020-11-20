import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripTabsTemplate} from './view/trip-tabs.js';
import {createTripFiltersTemplate} from './view/trip-filters.js';
import {createTripSortTemplate} from './view/trip-sort.js';
import {createTripEventsElementTemplate} from './view/trip-events-element.js';
import {createTripEventsListTemplate} from './view/trip-events-list.js';
import {createTripEventEditTemplate} from './view/trip-event-edit.js';
import {createTripEventAddTemplate} from './view/trip-event-add.js';

const TRIP_COUNT = 3;

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

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);
tripControlsElement.innerHTML = ``;
render(tripControlsElement, createTripTabsTemplate(), `beforeend`);
render(tripControlsElement, createTripFiltersTemplate(), `beforeend`);

render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createTripEventsElementTemplate(), `beforeend`);

const tripEventsListElement = mainElement.querySelector(`.trip-events__list`);
for (let i = 0; i < TRIP_COUNT; i++) {
  render(tripEventsListElement, createTripEventsListTemplate(), `beforeend`);
}

const tripEventsItemElement = tripEventsListElement.querySelector(`.trip-events__item:first-child`);
tripEventsItemElement.innerHTML = ``;
render(tripEventsItemElement, createTripEventEditTemplate(), `beforeend`);
render(tripEventsItemElement, createTripEventAddTemplate(), `beforeend`);
