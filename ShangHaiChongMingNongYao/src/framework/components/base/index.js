import Dialog from './dialog';
import DatePicker from './datepicker';
import ImageUpload from './image-upload';
import EnumSelect from './enum-select';
import RemoteSelect from './remote-select';
import RegionSelect from './region-select';
import TableColumn from './table-column';
import List from './list';
import Scrollbar from './scrollbar';
import SearchContainer from './search-container';
import SearchInput from './search-input';
import SearchItem from './search-item';
import ValidReject from './valid-reject'

export default {
  install(Vue){
    Vue.use(Dialog);
    Vue.use(DatePicker);
    Vue.use(ImageUpload);
    Vue.use(EnumSelect);
    Vue.use(RemoteSelect);
    Vue.use(RegionSelect);
    Vue.use(TableColumn);
    Vue.use(List);
    Vue.use(Scrollbar);
    Vue.use(SearchContainer);
    Vue.use(SearchInput);
    Vue.use(SearchItem);
    Vue.use(ValidReject);
  }
}
