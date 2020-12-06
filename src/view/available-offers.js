import AbstractView from './abstract';
import {generateOptions} from '../mock/point';

const generateAvailableOfferTemplate = (offers) => {
  let availableOfferTemplate = ``;
  for (const offer of offers) {
    availableOfferTemplate += `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.condition}-1" type="checkbox" name="event-offer-${offer.condition}" ${offer.isChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${offer.condition}-1">
      <span class="event__offer-title">Add ${offer.condition}</span>
      &plus;&euro;&nbsp;
    <span class="event__offer-price">50</span>
    </label>
  </div>`;
  }

  return availableOfferTemplate;
};

const createAvailableOfferTemplate = () => {
  const offers = generateOptions();
  return `${generateAvailableOfferTemplate(offers)}`;
};

export default class AvailableOffer extends AbstractView {
  getTemplate() {
    return createAvailableOfferTemplate();
  }
}
