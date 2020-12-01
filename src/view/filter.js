export const createFilterTemplate = (filters) => {
  let template = ``;

  for (const filter of filters) {
    template += `
    <div class="trip-filters__filter">
      <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
    </div>
  `;
  }

  return template;
};
