import SearchContainer from './src/search-container';

SearchContainer.install = function (Vue) {
  Vue.component(SearchContainer.name, SearchContainer);
};

export default SearchContainer;
