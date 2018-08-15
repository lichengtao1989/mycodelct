import DataCard from './src/data-card';

DataCard.install = function (Vue) {
  Vue.component(DataCard.name, DataCard);
};

export default DataCard;
