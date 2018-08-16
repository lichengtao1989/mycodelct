import StackCard from '../card/src/stack-card.vue';

StackCard.install = function (Vue) {
  Vue.component(StackCard.name, StackCard);
};

export default StackCard;
