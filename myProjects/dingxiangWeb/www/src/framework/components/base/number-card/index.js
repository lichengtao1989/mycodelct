import NumberCard from '../card/src/number-card.vue';

NumberCard.install = function (Vue) {
  Vue.component(NumberCard.name, NumberCard);
};

export default NumberCard;
