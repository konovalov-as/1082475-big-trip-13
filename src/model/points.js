import Observer from '../utils/observer';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const getOffers = (offers) => {
      const incomingOffers = [];

      offers.forEach((offer) => {
        incomingOffers.push(Object.assign(
            {},
            offer,
            {
              id: nanoid(),
              condition: offer.title,
              cost: offer.price,
            }
        ));
      });

      incomingOffers.forEach((offer) => {
        delete offer.title;
        delete offer.price;
      });

      return incomingOffers;
    };

    const getPhotos = (photos) => {
      const incomingPhotos = [];

      photos.forEach((photo) => {
        incomingPhotos.push(photo.src);
      });

      return incomingPhotos;
    };

    const adaptedPoint = Object.assign(
        {},
        point,
        {
          pointType: point.type,
          destinationCity: point.destination.name,
          offers: getOffers(point.offers),
          destinationInfo: {
            description: point.destination.description,
            photos: getPhotos(point.destination.pictures),
          },
          dateTimeStartEvent: dayjs(point.date_from),
          dateTimeEndEvent: dayjs(point.date_to),
          cost: point.base_price,
          isFavorite: point.is_favorite,
        }
    );

    delete adaptedPoint.type;
    delete adaptedPoint.destination;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          'base_price': point.cost,
          'date_from': point.dateTimeStartEvent instanceof Date ? point.dateTimeEndEvent.toISOString() : null,
          'date_to': point.dateTimeEndEvent instanceof Date ? point.dateTimeEndEvent.toISOString() : null,
          'destination': {
            name: point.destinationCity,
            description: point.destinationInfo.description,
            pictures: point.destinationInfo.photos,
          },
          'is_favorite': point.isFavorite,
          'offers': [{
            price: point.cost,
            title: point.offers.condition,
          }],
          'type': point.pointType,
        }
    );

    delete adaptedPoint.cost;
    delete adaptedPoint.dateTimeStartEvent;
    delete adaptedPoint.dateTimeEndEvent;
    delete adaptedPoint.destinationCity;
    delete adaptedPoint.destinationInfo;
    delete adaptedPoint.isFavorite;
    // delete adaptedPoint.offers;
    delete adaptedPoint.pointType;

    return adaptedPoint;
  }
}
