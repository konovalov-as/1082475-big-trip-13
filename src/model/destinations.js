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
    const getPhotos = (photos) => {
      const readyPhotos = [];

      photos.forEach((photo) => {
        readyPhotos.push(photo.src);
      });

      return readyPhotos;
    };

    const adaptedDestination = Object.assign(
        {},
        destinations,
        {
          destinationInfo: {
            description: destinations.description,
            photos: getPhotos(destinations.pictures),
          },
        }
    );

    delete adaptedDestination.description;
    delete adaptedDestination.pictures;
    return adaptedDestination;
  }
}
