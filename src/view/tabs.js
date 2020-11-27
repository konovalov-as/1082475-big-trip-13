export const createTabsTemplate = (tabs) => {
  const [table, stats] = tabs;

  return `<h2 class="visually-hidden">Switch trip view</h2>
  <nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn" href="#">${table}</a>
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${stats}</a>
  </nav>`;
};
