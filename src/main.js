import InfoView from './view/info';
import ControlsView from './view/controls';
import NewEventButtonView from './view/new-event-button';
import SortingView from './view/sorting';
import PointContainerView from './view/point-container';
import PointView from './view/point';
import PointEditContainerView from './view/point-edit-container';

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
tripContainer.innerHTML = ``;

// main
const mainContainer = document.querySelector(`.page-main`);
const pointsContainer = mainContainer.querySelector(`.trip-events`);

// tabs
render(tripContainer, new InfoView(info).getElement(), RenderPosition.BEFOREEND);
render(tripContainer, new ControlsView(tabs, filters).getElement(), RenderPosition.BEFOREEND);
render(tripContainer, new NewEventButtonView().getElement(), RenderPosition.BEFOREEND);

// sorting
render(pointsContainer, new SortingView(sorting).getElement(), RenderPosition.BEFOREEND);

// points
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

render(pointsContainer, new PointContainerView().getElement(), RenderPosition.BEFOREEND);
const pointElement = mainContainer.querySelector(`.trip-events__list`);
for (const point of points) {
  // todo - получается здесь тоже сделать вставку точек через фрагмент?
  renderPoint(pointElement, point);
}

