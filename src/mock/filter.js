export const generateFilter = () => {
  const filters = [{
    name: `everything`,
    isChecked: true,
  },
  {
    name: `future`,
    isChecked: false,
  },
  {
    name: `past`,
    isChecked: false,
  }];

  return {
    filters
  };
};
