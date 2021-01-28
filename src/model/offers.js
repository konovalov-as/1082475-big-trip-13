import Observer from '../utils/observer';
import {adaptOffersToClient} from '../utils/point';

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(updateType, offers) {
    this._offers = offers.slice();

    this._notify(updateType);
  }

  getOffers() {
    return this._offers;
  }

  static adaptToClient(offers) {
    const adaptedOffers = Object.assign(
        {},
        offers,
        {
          pointType: offers.type,
          offers: adaptOffersToClient(offers.offers),
        }
    );

    delete adaptedOffers.type;
    return adaptedOffers;
  }

}
