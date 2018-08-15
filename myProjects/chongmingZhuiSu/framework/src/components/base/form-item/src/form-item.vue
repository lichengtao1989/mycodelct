<template>
  <div class="el-form-item" :class="[{
      'el-form-item--feedback': elForm && elForm.statusIcon,
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-required': isRequired || required
    },
    sizeClass ? 'el-form-item--' + sizeClass : ''
  ]">
    <label :for="labelFor" class="el-form-item__label" v-bind:style="labelStyle" v-if="label || $slots.label">
      <slot name="label">{{label + form.labelSuffix}}</slot>
    </label>
    <div class="el-form-item__content" v-bind:style="contentStyle">
      <slot></slot>
      <transition name="el-zoom-in-top">
        <div
          v-if="validateState === 'error' && showMessage && form.showMessage"
          class="el-form-item__error"
          :class="{
            'el-form-item__error--inline': typeof inlineMessage === 'boolean'
              ? inlineMessage
              : (elForm && elForm.inlineMessage || false)
          }"
        >
          {{validateMessage}}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { FormItem } from 'element-ui';
import { getPropByPath } from 'element-ui/src/utils/util';

export default {
  name: 'cjm-form-item',
  mixins: [FormItem],
  methods: {
    getRules() {
      var formRules = this.form.rules;
      var selfRules = this.rules;
      //去掉了默认的必填验证，所有的验证规则都需要手动填写
      // var requiredRule = this.required !== undefined ? { required: !!this.required } : [];
      var requiredRule = { required: false };
      formRules = formRules ? getPropByPath(formRules, this.prop || '').o[this.prop || ''] : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    }
  }
};
</script>
