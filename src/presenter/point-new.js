import PointEditView from '../view/point-edit';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render';
import {UserAction, UpdateType, Key, POINT_TYPES, DESTINATION_CITIES} from '../const';
import dayjs from 'dayjs';

const BLANK_POINT = {
  pointType: POINT_TYPES[0],
  destinationCity: DESTINATION_CITIES[0],
  offers: [],
  destinationInfo: {
    description: ``,
    photos: [],
  },
  dateTimeStartEvent: dayjs(),
  dateTimeEndEvent: dayjs(),
  cost: 0,
  isFavorite: false,
};

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(callback, offers, destinations) {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._destroyCallback = callback;

    this._pointEditComponent = new PointEditView(BLANK_POINT, offers, destinations);
    this._pointEditComponent.setOnFormSubmitClick(this._onFormSubmit);
    this._pointEditComponent.setOnFormDeleteClick(this._onDeleteClick);
    this._pointEditComponent.setOnEditFormClose(this._onCloseClick);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: nanoid()}, point)
    );
    this.destroy();
  }

  _onDeleteClick() {
    this.destroy();
  }

  _onEscKeyDown(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _onCloseClick() {
    this.destroy();
  }
}
