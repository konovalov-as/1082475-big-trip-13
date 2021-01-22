import Observer from '../utils/observer';

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
            photos: destinations.pictures.map((photo) => photo.src),
          },
        }
    );

    delete adaptedDestination.description;
    delete adaptedDestination.pictures;
    return adaptedDestination;
  }
}
