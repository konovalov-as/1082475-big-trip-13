export const createSortingTemplate = (sorting) => {
  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--${sorting.name}">
      <input id="sort-${sorting.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sorting.name}" ${sorting.isChecked ? `checked` : ``} ${sorting.isDisabled ? `disabled` : ``}>
      <label class="trip-sort__btn" for="sort-${sorting.name}">${sorting.name}</label>
    </div>
  </form>
  `;
};
