import InfoView from './view/info';
import TabsView from './view/tabs';
import FilterContainerView from './view/filter-container';
import FilterView from './view/filter';
import SortingContainerView from './view/sorting-container';
import SortingView from './view/sorting';
import PointContainerView from './view/point-container';
import PointView from './view/point';
import PointEditContainerView from './view/point-edit-container';
// import PointHeaderAddView from './view/point-header-add';
// import PointHeaderEditView from './view/point-header-edit'; // move to point-edit-container
// import AvailableOfferView from './view/available-offers'; // move to point-edit-container
// import PointDescriptionView from './view/point-description'; // move to point-edit-container
// import PointPhotosView from './view/point-photos'; // move to point-edit-container

import {generatePoint} from './mock/point';
import {generateInfo} from './mock/info';
import {generateTab} from './mock/tabs';
import {generateFilter} from './mock/filter';
import {generateSorting} from './mock/sorting';

import {render, RenderPosition} from "./utils.js";

const pointsCount = 20;

const points = new Array(pointsCount).fill().map(generatePoint);
const info = generateInfo();
const tabs = generateTab();
const filters = generateFilter();
const sorting = generateSorting();

// header
const headerContainer = document.querySelector(`.page-header`);
const tripContainer = headerContainer.querySelector(`.trip-main`);
const controlsContainer = headerContainer.querySelector(`.trip-controls`);

// main
const mainContainer = document.querySelector(`.page-main`);
const pointsContainer = mainContainer.querySelector(`.trip-events`);

// tabs
render(tripContainer, new InfoView(info).getElement(), RenderPosition.AFTERBEGIN);
controlsContainer.innerHTML = ``;
render(controlsContainer, new TabsView(tabs).getElement(), RenderPosition.BEFOREEND);

// filters
render(controlsContainer, new FilterContainerView().getElement(), RenderPosition.BEFOREEND);
const filterContainer = headerContainer.querySelector(`.trip-filters`);
render(filterContainer, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

// sorting
render(pointsContainer, new SortingContainerView().getElement(), RenderPosition.BEFOREEND);
const sortContainer = pointsContainer.querySelector(`.trip-sort`);

let fragment = document.createDocumentFragment();
for (const sort of sorting) {
  fragment.appendChild(new SortingView(sort).getElement());
}
render(sortContainer, fragment, RenderPosition.BEFOREEND);

const renderPoint = (pointElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditContainerView(point);

  const replacePointToForm = () => {
    pointElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector(`.event--edit`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

// points
// const pointListComponent = new PointContainerView();
// render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
render(pointsContainer, new PointContainerView().getElement(), RenderPosition.BEFOREEND);
const pointElement = mainContainer.querySelector(`.trip-events__list`);
for (const point of points) {
  // todo - получается здесь тоже сделать вставку точек через фрагмент?
  renderPoint(pointElement, point);
}

// point add / edit
// const pointItemContainer = pointElement.querySelector(`.trip-events__item`);
// pointItemContainer.innerHTML = ``;
// render(pointItemContainer, new PointEditContainerView().getElement(), RenderPosition.BEFOREEND);

// edit
// const pointHeaderEditContainer = pointElement.querySelector(`div:first-child .event--edit .event__header`);
// render(pointHeaderEditContainer, new PointHeaderEditView(points[0]).getElement(), RenderPosition.BEFOREEND);

// const pointEditAvailableOffersContainer = pointElement.querySelector(`div:first-child .event--edit .event__available-offers`);
// render(pointEditAvailableOffersContainer, new AvailableOfferView().getElement(), RenderPosition.BEFOREEND);

// const pointEditDescription = pointElement.querySelector(`div:first-child .event--edit .event__section--destination`);
// render(pointEditDescription, new PointDescriptionView(points[0]).getElement(), RenderPosition.BEFOREEND);

// add
// render(pointItemContainer, new PointEditContainerView().getElement(), RenderPosition.BEFOREEND);
// const pointHeaderAddContainer = pointElement.querySelector(`div:nth-child(2) .event--edit .event__header`);
// render(pointHeaderAddContainer, new PointHeaderAddView(points[0]).getElement(), RenderPosition.BEFOREEND);
// const pointAddAvailableOffersContainer = pointElement.querySelector(`div:nth-child(2) .event--edit .event__available-offers`);
// render(pointAddAvailableOffersContainer, new AvailableOfferView().getElement(), RenderPosition.BEFOREEND);
// const pointAddDescription = pointElement.querySelector(`div:nth-child(2) .event--edit .event__section--destination`);
// render(pointAddDescription, new PointDescriptionView(points[0]).getElement(), RenderPosition.BEFOREEND);
// render(pointAddDescription, new PointPhotosView(points[0]).getElement(), RenderPosition.BEFOREEND);
