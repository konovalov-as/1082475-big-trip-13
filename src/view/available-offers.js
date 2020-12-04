import {generateOptions} from '../mock/point';
import {createElement} from '../utils';

export default class AvailableOffer {
  constructor() {
    this._availableOfferTemplate = ``;
    this._element = null;
  }

  generateAvailableOfferTemplate(offers) {
    for (const offer of offers) {
      this._availableOfferTemplate += `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.condition}-1" type="checkbox" name="event-offer-${offer.condition}" ${offer.isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${offer.condition}-1">
        <span class="event__offer-title">Add ${offer.condition}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">50</span>
      </label>
    </div>
    `;
    }

    return this._availableOfferTemplate;
  }

  createAvailableOfferTemplate() {
    const offers = generateOptions();
    return `${this.generateAvailableOfferTemplate(offers)}`;
  }

  getTemplate() {
    return this.createAvailableOfferTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
