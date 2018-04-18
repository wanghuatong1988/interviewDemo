import inputSearch from './components/inputSearch.vue';
const inputsearch = {
  install(Vue) {
    Vue.component(inputSearch.name, inputSearch);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(inputsearch);
}
export default inputsearch;