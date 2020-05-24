export const show = (a) => (a ? '' : 'display:none');

export const findById = (items, id) => {
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if ('' + item.id === '' + id) {
      return item;
    }
  }
  return null;
};
