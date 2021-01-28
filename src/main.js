import {render, RenderPosition} from './utils/render';
import {UpdateType, MenuItem, FilterType} from './const';
import {isOnline} from './utils/common';
import {toast} from './utils/toast/toast.js';

import MainNavView from './view/main-nav';
import StatsView from './view/stats';

import InfoPresenter from './presenter/info';
import TripPresenter from './presenter/trip';
import FiltersPresenter from './presenter/filter';

import PointsModel from './model/points';
import FilterModel from './model/filter';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';

import Api from './api/api';
import Store from './api/store';
import Provider from './api/provider';

const AUTHORIZATION = `Basic m48tbw5p39vw2beoyh`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const bodyContainer = document.querySelector(`.page-body`);
const infoContainer = bodyContainer.querySelector(`.page-header .trip-main`);
const newEventButton = infoContainer.querySelector(`.trip-main__event-add-btn`);
const mainNavTitle = infoContainer.querySelector(`.trip-main__title`);
const filtersTitle = infoContainer.querySelector(`.trip-main__filter`);
const mainContainer = bodyContainer.querySelector(`.page-main`);
const pointsContainer = mainContainer.querySelector(`.trip-events`);
const statsContainer = mainContainer.querySelector(`.page-body__container`);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter(infoContainer, pointsModel);
const tripPresenter = new TripPresenter(pointsContainer, pointsModel, filterModel, offersModel, destinationsModel, apiWithProvider, newEventButton);
const filtersPresenter = new FiltersPresenter(filtersTitle, filterModel, pointsModel);

const mainNavComponent = new MainNavView(newEventButton);

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
      if (!isOnline()) {
        toast(`You can't create a new point offline`);
        mainNavComponent.setMenuItem(MenuItem.TABLE);
        newEventButton.disabled = false;
        return;
      }
      newEventButton.disabled = true;
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
