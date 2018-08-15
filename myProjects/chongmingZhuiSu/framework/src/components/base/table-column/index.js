import TableColumn from './src/table-column';

TableColumn.install = function (Vue) {
  Vue.component(TableColumn.name, TableColumn);
};

export default TableColumn;
