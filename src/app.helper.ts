export const sum = (a: number, b: number) => a + b;
export const sortable = (field: string, sort: any) => {
  const sortType = field === sort.column ? sort.type : 'default';
  if (sortType === 'asc') {
    return `
    <a href="?_sort&column=${field}&type=desc"><i class="fas fa-sort-down"></i></a>
  `;
  }
  if (sortType === 'desc') {
    return `
      <a href="?_sort&column=${field}&type=asc"><i class="fas fa-sort-up"></i></a>
    `;
  }
  if (sortType === 'default') {
    return `
      <a href="?_sort&column=${field}&type=desc"><i class="fas fa-sort"></i></a>
    `;
  }
};

export const sortableTrash = (field: string, sort: any) => {
  const sortType = field === sort.column ? sort.type : 'default';
  if (sortType === 'asc') {
    return `
    <a href="?_sortTrash&column=${field}&type=desc"><i class="fas fa-sort-down"></i></a>
  `;
  }
  if (sortType === 'desc') {
    return `
      <a href="?_sortTrash&column=${field}&type=asc"><i class="fas fa-sort-up"></i></a>
    `;
  }
  if (sortType === 'default') {
    return `
      <a href="?_sortTrash&column=${field}&type=desc"><i class="fas fa-sort"></i></a>
    `;
  }
};
