// import ControlsView from './view/controls';
// import NewEventButtonView from './view/new-event-button';
import MainNavView from './view/main-nav';
import StatsView from './view/stats';

// import {generatePoint} from './mock/point';
// import {generateTab} from './mock/tabs';
// import {generateFilter} from './mock/filter';

import InfoPresenter from './presenter/info';
import TripPresenter from './presenter/trip';
import FiltersPresenter from './presenter/filter';

import PointsModel from './model/points';
import FilterModel from './model/filter';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';

import {render, RenderPosition} from './utils/render';

import Api from './api/api';
import Store from './api/store';
import Provider from './api/provider';

import {UpdateType, MenuItem, FilterType} from './const';

const AUTHORIZATION = `Basic m48tbw5p39vw2beoyh`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

// const pointsCount = 20;

// const points = new Array(pointsCount).fill().map(generatePoint);
// const tabs = generateTab();
// const filters = generateFilter();

// const filters = [
//   {
//     type: `everything`,
//     name: `EVERYTHING`,
//     count: 1
//   }
// ];

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

// header
const bodyContainer = document.querySelector(`.page-body`);
const infoContainer = bodyContainer.querySelector(`.page-header .trip-main`);
const newEventButton = infoContainer.querySelector(`.trip-main__event-add-btn`);
const mainNavTitle = infoContainer.querySelector(`.trip-main__title`);
const filtersTitle = infoContainer.querySelector(`.trip-main__filter`);


// const headerContainer = document.querySelector(`.page-header`);
// const tripContainer = headerContainer.querySelector(`.trip-main`);
// tripContainer.innerHTML = ``;

// main
const mainContainer = document.querySelector(`.page-main`);
const pointsContainer = mainContainer.querySelector(`.trip-events`);

// tabs
// render(tripContainer, new ControlsView(tabs, filters, `everything`), RenderPosition.BEFOREEND);
// render(tripContainer, new NewEventButtonView(), RenderPosition.BEFOREEND);

const statsContainer = mainContainer.querySelector(`.page-body__container`);
// render(statsContainer, new StatsView(), RenderPosition.BEFOREEND);

// trip
const pointsModel = new PointsModel();
// pointsModel.setPoints(points);
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter(infoContainer, pointsModel);
const tripPresenter = new TripPresenter(pointsContainer, pointsModel, filterModel, offersModel, destinationsModel, apiWithProvider, newEventButton);
const filtersPresenter = new FiltersPresenter(filtersTitle, filterModel, pointsModel);

const mainNavComponent = new MainNavView(newEventButton, MenuItem.TABLE);

const statsComponent = new StatsView();

infoPresenter.init();
filtersPresenter.init();
tripPresenter.init();

render(statsContainer, statsComponent, RenderPosition.AFTEREND);

const onPointNewFormClose = () => {
  mainNavComponent.getElement().querySelector(`.trip-tabs__btn:first-child`).classList.add(`trip-tabs__btn--active`);
  newEventButton.disabled = false;
};

const onMainNavClick = (mainNavItem) => {
  switch (mainNavItem) {
    case MenuItem.NEW_EVENT:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      tripPresenter.createPoint(onPointNewFormClose);
      statsComponent.hide();
      break;
    case MenuItem.TABLE:
      tripPresenter.destroy();
      tripPresenter.init();
      statsComponent.hide();
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statsComponent.init(pointsModel.getPoints());
      statsComponent.show();
      break;
    default:
      throw new Error(`Unknown item of main nav: '${mainNavItem}'!`);
  }
};

apiWithProvider.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    render(mainNavTitle, mainNavComponent, RenderPosition.AFTEREND);
    mainNavComponent.setOnMainNavClick(onMainNavClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

apiWithProvider.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.MINOR, offers);
  })
  .catch(() => {
    offersModel.setOffers(UpdateType.MINOR, []);
  });

apiWithProvider.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.MINOR, destinations);
  })
  .catch(() => {
    destinationsModel.setDestinations(UpdateType.MINOR, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  if (apiWithProvider.isSync) {
    apiWithProvider
      .sync()
      .then((points) => {
        pointsModel.setPoints(UpdateType.MINOR, points);
      });
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
