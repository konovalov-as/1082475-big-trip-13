import PointEditView from '../view/point-edit';

import {remove, render, RenderPosition} from '../utils/render';
import {UserAction, UpdateType, Key, POINT_TYPES} from '../const';
import dayjs from 'dayjs';

import {isOnline} from '../utils/common';
import {toast} from '../utils/toast/toast.js';

export default class PointNew {
  constructor(pointListContainer, changeData, newEventButton) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._newEventButton = newEventButton;

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._listCities = [];
    this._BLANK_POINT = {
      pointType: POINT_TYPES[0].toLowerCase(),
      destinationCity: ``,
      offers: [],
      destinationInfo: {
        description: ``,
        photos: ``,
      },
      dateTimeStartEvent: dayjs(),
      dateTimeEndEvent: dayjs().add(1, `day`),
      cost: 0,
      isFavorite: false,
    };
  }

  init(callback, offers, destinations) {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._destroyCallback = callback;

    this._getOffers(offers);
    this._getDestinations(destinations);
    this._getListCities(destinations);

    this._pointEditComponent = new PointEditView(this._BLANK_POINT, offers, destinations, this._newEventButton);
    this._pointEditComponent.setOnFormSubmitClick(this._onFormSubmit);
    this._pointEditComponent.setOnFormDeleteClick(this._onDeleteClick);
    this._pointEditComponent.setOnEditFormClose(this._onCloseClick);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _getOffers(offers) {
    for (const offer of offers) {
      if (offer.pointType === (this._BLANK_POINT.pointType.toLowerCase())) {
        this._BLANK_POINT.offers = offer.offers;
        break;
      }
    }
  }

  _getDestinations(destinations) {
    for (const destination of destinations) {
      if (destination.name === this._BLANK_POINT.destinationCity) {
        this._BLANK_POINT.destinationInfo.description = destination.destinationInfo.description;
        this._BLANK_POINT.destinationInfo.photos = this._getPhotos(destination.destinationInfo.photos);
        break;
      }
    }
  }

  _getListCities(destinations) {
    destinations.map((destination) => {
      this._listCities.push(destination.name);
    });
    this._BLANK_POINT.destinationCity = this._listCities[0];
  }

  _getPhotos(photos) {
    const readyPhotos = [];

    photos.map((photo) => {
      readyPhotos.push(Object.assign(
          {},
          photo,
          {
            src: photo.src,
            alt: photo.alt,
          }
      ));
    });

    readyPhotos.map((photo) => delete photo.description);
    return readyPhotos;
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

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _onFormSubmit(point) {
    if (!isOnline()) {
      toast(`You can't save a point offline`);
      return;
    }

    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point
    );
  }

  _onDeleteClick() {
    if (!isOnline()) {
      toast(`You can't delete a point offline`);
      return;
    }

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
