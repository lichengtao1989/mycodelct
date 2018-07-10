 <template>
  <el-date-picker v-model="innerValue" :readonly="readonly" :disabled="disabled" :editable="editable" :size="size" :type="type" :format="myFormat" :value-format="myFormat" :placeholder="placeholder" :start-placeholder="startPlaceholder" :end-placeholder="endPlaceholder" :range-separator="rangeSeparator" :picker-options="myPickerOptions">
  </el-date-picker>
</template>
 <script>
/**
 * 日期选择组件，基本用法和element-ui的datepicker相同<br/>
 * 区别1：value为string类型，而不是date或array<br/>
 * 区别2：若type='datetimerange'或'daterange'，value格式为'2017/1/1 ~ 2017/1/2'，中间以'~'隔开
 */
// import { DatePicker } from 'element-ui';
import valueComponent from '../../value';
export default {
  name: 'nz-datepicker',
  mixins: [valueComponent],
  data() {
    return {
      innerValue: this.formatValue(this.value)
    };
  },
  props: {
    value: String,
    placeholder: String,
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    /**
     * 只读，默认否
     */
    readonly: Boolean,
    /**
     * 禁用，默认否
     */
    disabled: Boolean,
    /**
     * 可编辑，默认否
     */
    editable: Boolean,
    /**
     * 尺寸
     */
    size: {
      type: String
    },
    /**
     * 类型 默认：date 可选值参考element-ui
     */
    type: {
      type: String,
      default: 'date'
    },
    /**
     * 时间格式 默认：yyyy/MM/dd 可选值参考element-ui
     */
    format: {
      type: String
    },
    /**
     * 分隔符
     */
    rangeSeparator: {
      type: String,
      default: ' ~ '
    },
    /**
     * 是否需要快捷选项（type为datetimerange或daterange时有效）
     */
    needShortcuts: {
      type: Boolean,
      default: true
    },
    /**
     * 是否允许选择未来的某个时间，默认否
     */
    chooseFuture: {
      type: Boolean
    },
    /**
     * 具体参考element-ui
     */
    pickerOptions: {
      type: Object
    }
  },
  watch: {
    value(val) {
      this.innerValue = this.formatValue(val);
    },
    innerValue(val) {
      if (Array.isArray(val)) {
        this.$emit('input', val.join(this.rangeSeparator));
      } else {
        this.$emit('input', val || '');
      }
    }
  },
  computed: {
    myPickerOptions() {
      const that = this;
      let options = this.pickerOptions || {};
      if (this.needShortcuts && (this.type === 'datetimerange' || this.type === 'daterange')) {
        options.shortcuts = options.shortcuts || [
          {
            text: '今天',
            onClick(picker) {
              const end = that.dateMax(new Date());
              const start = that.dateMin(new Date());
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近3天',
            onClick(picker) {
              const end = that.dateMax(new Date());
              const start = that.dateMin(new Date());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = that.dateMax(new Date());
              const start = that.dateMin(new Date());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = that.dateMax(new Date());
              const start = that.dateMin(new Date());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = that.dateMax(new Date());
              const start = that.dateMin(new Date());
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ];
      }
      //禁用今天之后的日期
      if (!this.chooseFuture) {
        options.disabledDate =
          options.disabledDate ||
          function(date) {
            return date.getTime() > Date.now();
          };
      }
      // 设置结束日期的时分秒默认为23:59:59
      if (this.type === 'datetimerange') {
        options.onPick =
          options.onPick ||
          function(param) {
            const maxDate = new Date(param.maxDate * 1);
            const hour = maxDate.getHours();
            const minute = maxDate.getMinutes();
            const second = maxDate.getSeconds();
            if (hour === 0 && minute === 0 && second === 0) {
              param.maxDate.setHours(23);
              param.maxDate.setMinutes(59);
              param.maxDate.setSeconds(59);
            }
          };
      }
      //
      return options;
    },
    myFormat() {
      if (!this.format) {
        if (this.type === 'datetimerange' || this.type === 'datetime') {
          return 'yyyy/MM/dd HH:mm:ss';
        } else {
          return 'yyyy/MM/dd';
        }
      }
      return this.format;
    }
  },
  methods: {
    //传入date得到 同一天的00:00:00
    dateMin(date) {
      if (date && date.constructor === Date) {
        const newDate = new Date(date.getTime());
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
        return newDate;
      } else {
        return date;
      }
    },
    //传入date得到 同一天的23:59:59
    dateMax(date) {
      if (date && date.constructor === Date) {
        const newDate = new Date(date.getTime());
        newDate.setHours(23);
        newDate.setMinutes(59);
        newDate.setSeconds(59);
        newDate.setMilliseconds(59);
        return newDate;
      } else {
        return date;
      }
    },
    formatValue(val) {
      if (this.type === 'datetimerange' || this.type === 'daterange') {
        return val ? val.split(this.rangeSeparator) : val;
      }
      return val;
    }
  }
};
</script>
