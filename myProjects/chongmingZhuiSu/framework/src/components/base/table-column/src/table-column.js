import {TableColumn} from 'element-ui'
export default {
  name: 'cjm-table-column',
  mixins: [
    TableColumn
  ],
  props: {
    enumName: {
      type: String
    },
    /**
     * 枚举命名空间
     */
    enumNamespace: {
      type: String
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true
    }
  },
  created(){
    /**
     * 格式化枚举列
     */
    if (this.enumName && !this.formatter) {
      let enumData;
      if(this.enumNamespace){
        enumData = this.$globalData.get(this.enumNamespace, 'enums')[this.enumName];
      } else {
        enumData = this.$globalData.get('enums')[this.enumName];
      }
      this.columnConfig.formatter = function (row, col) {
        let value = row[col.property];
        if (Array.isArray(value)) {
          return value.map(function (t) {
            for (let key in enumData) {
              if (enumData[key] == t) {
                return key;
              }
            }
          }).join(' , ');
        } else {
          for (let key in enumData) {
            if (enumData[key] == value) {
              return key;
            }
          }
        }
        return '';
      }
    }
  }
};
