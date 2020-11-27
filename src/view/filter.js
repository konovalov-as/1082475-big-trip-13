export const createFilterTemplate = (filters) => {
  let template = ``;
  for (const filter of filters.filters) {
    // console.log(filter)
    template += `
    <div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}">
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>
  `;
  }

  return template;
  //   return template `

  //   <div class="trip-filters__filter">
  //     <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
  //     <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  //   </div>

  //   <div class="trip-filters__filter">
  //     <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
  //     <label class="trip-filters__filter-label" for="filter-future">Future</label>
  //   </div>

  //   <div class="trip-filters__filter">
  //     <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
  //     <label class="trip-filters__filter-label" for="filter-past">Past</label>
  //   </div>
  //  `;
};
