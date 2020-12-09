import PointView from '../view/point';
import PointEditContainerView from '../view/point-edit-container';
import {render, RenderPosition, replace} from '../utils/render';

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

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditContainerView(point);

    this._pointComponent.setOnRollupButtonClick(this._onRollupButtonClick);
    this._pointEditComponent.setOnFormSubmitClick(this._onFormSubmitClick);

    render(this._tripListContainer, this._pointComponent, RenderPosition.BEFOREEND);
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
