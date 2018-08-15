import {
  Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Input, Autocomplete, Option,
  Switch, Cascader, TimePicker, Table, Progress, Pagination,
  Message, MessageBox, Tabs, TabPane, Loading,
  RadioButton, Dropdown, DropdownItem, DropdownMenu, Popover, Upload, Select, Step
} from 'element-ui'
import PopupManager from 'element-ui/lib/utils/popup/popup-manager'
import Dialog from './base/dialog'
import SearchInput from './base/search-input'
import SearchItem from './base/search-item'
import SearchContainer from './base/search-container'
import Form from './base/form'
import FormItem from './base/form-item'
import DatePicker from './base/date-picker'
import Steps from './base/steps'
import RegionSelect from './base/region-select'
import ImageUpload from './base/image-upload'
import RemoteSelect from './base/remote-select'
import Tooltip from './base/tooltip'
import TableColumn from './base/table-column'
import EnumSelect from './base/enum-select'
import Button from './base/button'
import ScrollBar from './base/scrollbar'
import Transfer from './base/transfer'
import DateRangePicker from './base/date-range-picker'
import List from './composite/list'
import SelectMultiple from './base/select-multiple'

//重置弹出组件的初始z-index为20000，为了使得弹出组件能够在老版本的easy-ui组件之上
PopupManager.zIndex = 20000;

export default {
  install (Vue) {
    Vue.prototype.$ELEMENT = {size: 'medium'}
    // 引入element组件
    Vue.component('cjm-alert', Alert);
    Vue.component('cjm-input', Input);
    Vue.component('cjm-autocomplete', Autocomplete);
    Vue.component('cjm-option', Option);
    Vue.component('cjm-radio', Radio);
    Vue.component('cjm-radio-group', RadioGroup);
    Vue.component('cjm-checkbox', Checkbox);
    Vue.component('cjm-checkbox-group', CheckboxGroup);
    Vue.component('cjm-switch', Switch);
    Vue.component('cjm-time-picker', TimePicker);
    Vue.component('cjm-table', Table);
    Vue.component('cjm-progress', Progress);
    Vue.component('cjm-pagination', Pagination);
    Vue.component('cjm-tabs', Tabs);
    Vue.component('cjm-tab-pane', TabPane);
    Vue.component('cjm-cascader', Cascader);
    Vue.component('cjm-scrollbar', ScrollBar);
    Vue.component('cjm-radio-button', RadioButton);
    Vue.component('cjm-dropdown', Dropdown);
    Vue.component('cjm-dropdown-item', DropdownItem);
    Vue.component('cjm-dropdown-menu', DropdownMenu);
    Vue.directive('popover', Popover.directive);
    Vue.component('cjm-popover', Popover);
    Vue.component('cjm-upload', Upload);
    Vue.component('cjm-select', Select);
    Vue.component('cjm-step', Step);

    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;

    // todo 搞清楚为什么不能使用 Vue.prototype.$message = Message
    Vue.prototype.$message = function (options) {
      Message(options);
    };
    Vue.prototype.$message.success = Message.success;
    Vue.prototype.$message.warning = Message.warning;
    Vue.prototype.$message.info = Message.info;
    Vue.prototype.$message.error = Message.error;

    Vue.use(Loading.directive);
    Vue.prototype.$loading = Loading.service;

    // 引入自己的组件
    Vue.use(Dialog);
    Vue.use(List);
    Vue.use(SearchInput);
    Vue.use(SearchItem);
    Vue.use(SearchContainer);
    Vue.use(RegionSelect);
    Vue.use(ImageUpload);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(DatePicker);
    Vue.use(Steps);
    Vue.use(RemoteSelect);
    Vue.use(Tooltip);
    Vue.use(TableColumn);
    Vue.use(EnumSelect);
    Vue.use(Button);
    Vue.use(Transfer);
    Vue.use(DateRangePicker);
    Vue.use(SelectMultiple);
  }
}
