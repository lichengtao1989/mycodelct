import {TableColumn} from 'element-ui'
export default {
  name: 'nz-table-column',
  mixins: [TableColumn],
  props: {
    enumName: {
      type: String
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    enumFormatter(row, col){
      const enumData = this.$enum(this.enumName);
      let value = row[col.property];
      const matchEnumItem = enumData.values.find(item => item.value == value);
      if (matchEnumItem) {
        return matchEnumItem.name;
      }
      return ''
    },
    enumInit(){
      if (this.enumName && !this.formatter) {
        this.columnConfig.formatter = (row, col) => {
          return this.enumFormatter(row, col);
        }
      }
    }
  },
  created(){
    this.enumInit();
  }
};
