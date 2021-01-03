import PointView from '../view/point';
import PointEditView from '../view/point-edit';

import {render, RenderPosition, replace, remove} from '../utils/render';

import {UserAction, UpdateType, Key} from '../const';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export default class Point {
  constructor(tripListContainer, changeData, changeMode) {
    this._tripListContainer = tripListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
    this._onEditFormClose = this._onEditFormClose.bind(this);

    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onFormSubmitClick = this._onFormSubmitClick.bind(this);
    this._onFormDeleteClick = this._onFormDeleteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(point, offers, destinations) {
    this._point = point;
    this._offers = offers;
    this._destinations = destinations;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point, this._offers, this._destinations);

    this._pointComponent.setOnRollupButtonClick(this._onRollupButtonClick);
    this._pointEditComponent.setOnEditFormClose(this._onEditFormClose);

    this._pointComponent.setOnFavoriteClick(this._onFavoriteClick);
    this._pointEditComponent.setOnFormSubmitClick(this._onFormSubmitClick);
    this._pointEditComponent.setOnFormDeleteClick(this._onFormDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._tripListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormToPoint();
    }
  }

  _onRollupButtonClick() {
    this._replacePointToForm();
  }

  _onEditFormClose() {
    this._replaceFormToPoint();
  }

  _onFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }

  _onFormSubmitClick(point) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        point
    );
    this._replaceFormToPoint();
  }

  _onFormDeleteClick(point) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point
    );
  }
}
