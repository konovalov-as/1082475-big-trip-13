import Observer from '../utils/observer';

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
    const adaptOffers = () => {

      const readyOffers = [];

      offers.offers.forEach((offer) => {
        readyOffers.push(Object.assign(
            {},
            offer,
            {
              condition: offer.title,
              cost: offer.price,
            }
        ));
      });

      readyOffers.forEach((offer) => {
        delete offer.title;
        delete offer.price;
      });

      return readyOffers;
    };

    const adaptedOffers = Object.assign(
        {},
        offers,
        {
          pointType: offers.type,
          offers: adaptOffers(offers.offers),
        }
    );

    delete adaptedOffers.type;
    return adaptedOffers;
  }

}
