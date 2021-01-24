import PointsModel from '../model/points';
import {isOnline} from '../utils/common';

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSync = false;
  }

  get isSync() {
    return this._isSync;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._store.setItems(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems());

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(point.id, PointsModel.adaptToServer(Object.assign({}, point)));
    this._isSync = true;

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    this._isSync = true;

    return Promise.reject(new Error(`Add a point failed`));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(point.id));
    }

    this._isSync = true;

    return Promise.reject(new Error(`Delete a point failed`));
  }

  getOffers() {
    const key = `${this._store.storeKey}-offers`;

    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = Object.assign({}, offers);
          this._store.setItems(items, key);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems(key));

    return Promise.resolve(storeOffers);
  }

  getDestinations() {
    const key = `${this._store.storeKey}-destinations`;

    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = Object.assign({}, destinations);
          this._store.setItems(items, key);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getItems(key));

    return Promise.resolve(storeDestinations);
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные точки
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          // Добавляем синхронизированные точки в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items);
          this._isSync = false;
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
