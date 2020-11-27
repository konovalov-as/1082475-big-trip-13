export const generateFilter = () => {
  const filters = [`everything`, `future`, `past`];
  const isChecked = [`checked`, ``, ``];

  return {
    filters,
    isChecked,
  };
};
