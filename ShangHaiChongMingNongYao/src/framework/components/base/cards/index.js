import Cards from './src/cards';

Cards.install = function (Vue) {
  Vue.component(Cards.name, Cards);
};

export default Cards;
