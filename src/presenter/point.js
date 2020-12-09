import PointView from '../view/point';
import PointEditContainerView from '../view/point-edit-container';
import {render, RenderPosition, replace, remove} from '../utils/render';

export default class Point {
  constructor(tripListContainer) {
    this._tripListContainer = tripListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
    this._onFormSubmitClick = this._onFormSubmitClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditContainerView(point);

    this._pointComponent.setOnRollupButtonClick(this._onRollupButtonClick);
    this._pointEditComponent.setOnFormSubmitClick(this._onFormSubmitClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._tripListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._tripListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._tripListContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _onRollupButtonClick() {
    this._replacePointToForm();
  }

  _onFormSubmitClick() {
    this._replaceFormToPoint();
  }
}
