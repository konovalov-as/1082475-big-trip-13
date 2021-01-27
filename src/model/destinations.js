import Observer from '../utils/observer';
import {adaptPhotosToClient} from '../utils/point';

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(updateType, destinations) {
    this._destinations = destinations.slice();

    this._notify(updateType);
  }

  getDestinations() {
    return this._destinations;
  }

  static adaptToClient(destinations) {
    const adaptedDestination = Object.assign(
        {},
        destinations,
        {
          destinationInfo: {
            description: destinations.description,
            photos: adaptPhotosToClient(destinations.pictures),
          },
        }
    );

    delete adaptedDestination.description;
    delete adaptedDestination.pictures;
    return adaptedDestination;
  }
}
