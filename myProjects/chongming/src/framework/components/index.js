import BaseComponents from './base/index.js'
import setting from '../setting';
export default {
  install(Vue) {
    const {ELEMENT} = setting.get();
    const {Tree, Table, Button, Form, FormItem, Radio, RadioButton, RadioGroup, Checkbox, CheckboxGroup, Select, Option, Input, DatePicker, Dialog, Progress, Cascader, Pagination, Tabs, TabPane, Autocomplete} = ELEMENT;
    //
    Vue.component('nz-tree', Tree);
    Vue.component('nz-button', Button);
    Vue.component('nz-table', Table);
    Vue.component('nz-form', Form);
    Vue.component('nz-form-item', FormItem);
    Vue.component('nz-radio', Radio);
    Vue.component('nz-radio-button', RadioButton);
    Vue.component('nz-radio-group', RadioGroup);
    Vue.component('nz-checkbox', Checkbox);
    Vue.component('nz-checkbox-group', CheckboxGroup);
    Vue.component('nz-select', Select);
    Vue.component('nz-option', Option);
    Vue.component('nz-input', Input);
    Vue.component('nz-autocomplete', Autocomplete);
    Vue.component('nz-cascader', Cascader);
    Vue.component('nz-pagination', Pagination);
    Vue.component('nz-tabs', Tabs);
    Vue.component('nz-tab-pane', TabPane);
    //
    Vue.component('el-button', Button);
    Vue.component('el-datepicker', DatePicker);
    Vue.component('el-dialog', Dialog);
    Vue.component('el-progress', Progress);
    //
    Vue.use(BaseComponents);
  }
};
