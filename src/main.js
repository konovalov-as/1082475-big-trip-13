// import ControlsView from './view/controls';
// import NewEventButtonView from './view/new-event-button';
import StatsView from './view/stats';

// import {generatePoint} from './mock/point';
// import {generateTab} from './mock/tabs';
// import {generateFilter} from './mock/filter';

import InfoPresenter from './presenter/info';
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
const bodyContainer = document.querySelector(`.page-body`);
const infoContainer = bodyContainer.querySelector(`.page-header .trip-main`);

const headerContainer = document.querySelector(`.page-header`);
const tripContainer = headerContainer.querySelector(`.trip-main`);
tripContainer.innerHTML = ``;

// main
const mainContainer = document.querySelector(`.page-main`);
const pointsContainer = mainContainer.querySelector(`.trip-events`);

// tabs
// render(tripContainer, new ControlsView(tabs, filters, `everything`), RenderPosition.BEFOREEND);
// render(tripContainer, new NewEventButtonView(), RenderPosition.BEFOREEND);

const statsContainer = mainContainer.querySelector(`.page-body__container`);
render(statsContainer, new StatsView(), RenderPosition.BEFOREEND);

// const onSiteMenuClick = (evt) => {
//   evt.preventDefault();

//   if(!evt.target.matches(`a`) && !evt.target.matches(`button`)) {
//     return;
//   }

//   switch (evt.target.attributes.id.value) {
//     case MenuItem.ADD_NEW_POINT:
//       // Скрыть статистику
//       // Показать список точек
//       // Показать форму добавления новой точки
//       // Убрать выделение с ADD NEW TASK после сохранения
//       console.log(evt.target.attributes.id.value)
//       break;
//     case MenuItem.POINTS:
//       // Показать доску
//       // Скрыть статистику
//       console.log(evt.target.attributes.id.value)
//       break;
//     case MenuItem.STATISTICS:
//       // Скрыть доску
//       // Показать статистику
//       console.log(evt.target.attributes.id.value)
//       break;
//   }
// };

// tripContainer.addEventListener('click', onSiteMenuClick);

// trip
const pointsModel = new PointsModel();
// pointsModel.setPoints(points);
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter(infoContainer, pointsModel);
const tripPresenter = new TripPresenter(pointsContainer, pointsModel, filterModel, offersModel, destinationsModel, api);
const controlPresenter = new ControlPresenter(tripContainer, filterModel, pointsModel);

infoPresenter.init();
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
