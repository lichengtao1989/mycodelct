import {Tooltip} from 'element-ui'
export default {
  name: 'cjm-tooltip',
  mixins: [
    Tooltip
  ],
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    enterable: {
      type: Boolean,
      default: false
    },
    effect: {
      type: String,
      default: 'light'
    }
  }
}
