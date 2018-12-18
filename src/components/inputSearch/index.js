import ctSelect from './components/ct-select.vue';
import ctOption from './components/ct-option.vue';

export default function(Vue) {
    Vue.component(ctSelect.name, ctSelect);
    Vue.component(ctOption.name, ctOption);
}
export { ctSelect, ctOption }