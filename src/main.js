import InfoView from './view/info';
// import ControlsView from './view/controls';
// import NewEventButtonView from './view/new-event-button';

// import {generatePoint} from './mock/point';
import {generateInfo} from './mock/info';
// import {generateTab} from './mock/tabs';
// import {generateFilter} from './mock/filter';

import TripPresenter from './presenter/trip';
import ControlPresenter from './presenter/controls';

import PointsModel from './model/points';
import FilterModel from './model/filter';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';

import {render, RenderPosition} from './utils/render';

import Api from './api';
import {UpdateType} from './const';
const AUTHORIZATION = `Basic m48tbw5p39vw2beoyh`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

// const pointsCount = 20;

// const points = new Array(pointsCount).fill().map(generatePoint);
const info = generateInfo();
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

// header
const headerContainer = document.querySelector(`.page-header`);
const tripContainer = headerContainer.querySelector(`.trip-main`);
tripContainer.innerHTML = ``;

// main
const mainContainer = document.querySelector(`.page-main`);
const pointsContainer = mainContainer.querySelector(`.trip-events`);

// tabs
render(tripContainer, new InfoView(info), RenderPosition.BEFOREEND);
// render(tripContainer, new ControlsView(tabs, filters, `everything`), RenderPosition.BEFOREEND);
// render(tripContainer, new NewEventButtonView(), RenderPosition.BEFOREEND);

// trip
const pointsModel = new PointsModel();
// pointsModel.setPoints(points);
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(pointsContainer, pointsModel, filterModel, offersModel, destinationsModel, api);
const controlPresenter = new ControlPresenter(tripContainer, filterModel, pointsModel);

controlPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.MINOR, offers);
  })
  .catch(() => {
    offersModel.setOffers(UpdateType.MINOR, []);
  });

api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.MINOR, destinations);
  })
  .catch(() => {
    destinationsModel.setDestinations(UpdateType.MINOR, []);
  });
