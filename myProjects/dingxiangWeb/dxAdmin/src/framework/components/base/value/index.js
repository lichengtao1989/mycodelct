import emitter from '../../../mixins/emitter';
export default {
  mixins: [emitter],
  props: ['value'],
  data() {
    return {
      val: null
    }
  },
  watch: {
    value: {
      handler: function() {
        this.onValueChange();
      },
      deep: true
    },
    val: {
      handler: function() {
        this.onValChange();
      },
      deep: true
    }
  },
  methods: {
    onValueChange() {
      this.val = this.value;
    },
    onValChange() {
      this.$emit('input', this.val);
      this.dispatch('ElFormItem', 'el.form.change');
    }
  },
  created() {
    this.val = this.value;
  }
}
