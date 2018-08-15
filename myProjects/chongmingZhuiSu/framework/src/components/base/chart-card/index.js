import ChartCard from '../card/src/chart-card.vue';

ChartCard.install = function (Vue) {
  Vue.component(ChartCard.name, ChartCard);
};

export default ChartCard;
