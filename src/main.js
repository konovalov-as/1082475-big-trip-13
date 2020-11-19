import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripTabsTemplate} from "./view/trip-tabs.js";
import {createTripFiltersTemplate} from "./view/trip-filters.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);

const siteMainElement = document.querySelector(`.page-main`);

render(siteTripMainElement, createTripInfoTemplate(), `afterbegin`);
render(siteTripControlsElement, createTripTabsTemplate(), `beforeend`);
render(siteTripControlsElement, createTripFiltersTemplate(), `beforeend`);
