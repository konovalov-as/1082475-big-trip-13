import Observer from '../utils/observer';
// import {nanoid} from 'nanoid';
// import dayjs from 'dayjs';

export default class PointEdit extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(updateType, offers) {
    // console.log(offers)
    this._offers = offers.slice();

    this._notify(updateType);
  }

  getOffers() {
    // console.log(this._offers.length)
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
