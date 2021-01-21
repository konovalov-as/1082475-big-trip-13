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
      const readyOffers = [];

      offers.map((offer) => {
        readyOffers.push(Object.assign(
            {},
            offer,
            {
              id: nanoid(),
              condition: offer.title,
              cost: offer.price,
            }
        ));
      });

      readyOffers.map((offer) => {
        delete offer.title;
        delete offer.price;
      });

      return readyOffers;
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
            photos: point.destination.pictures.map((photo) => photo.src),
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
    const getOffers = (offers) => {
      const readyOffers = [];

      offers.map((offer) => {
        readyOffers.push(Object.assign(
            {},
            offer,
            {
              title: offer.condition,
              price: offer.cost,
            }
        ));
      });

      readyOffers.map((offer) => {
        delete offer.id;
        delete offer.cost;
        delete offer.condition;
      });

      return readyOffers;
    };

    const getPhotos = (photos) => {
      const readyPhotos = [];

      photos.map((photo) => {
        readyPhotos.push({
          'src': photo,
          'description': `description`,
        });
      });

      return readyPhotos;
    };

    console.log(point);
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          'base_price': parseInt(point.cost, 10),
          'date_from': point.dateTimeStartEvent instanceof dayjs ? point.dateTimeStartEvent.toISOString() : null,
          'date_to': point.dateTimeEndEvent instanceof dayjs ? point.dateTimeEndEvent.toISOString() : null,
          'destination': {
            'name': point.destinationCity,
            'description': point.destinationInfo.description,
            'pictures': getPhotos(point.destinationInfo.photos),
          },
          'is_favorite': point.isFavorite,
          'offers': getOffers(point.offers),
          'type': point.pointType,
        }
    );

    delete adaptedPoint.cost;
    delete adaptedPoint.dateTimeStartEvent;
    delete adaptedPoint.dateTimeEndEvent;
    delete adaptedPoint.destinationCity;
    delete adaptedPoint.destinationInfo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.pointType;

    console.log(adaptedPoint);
    return adaptedPoint;
  }
}
