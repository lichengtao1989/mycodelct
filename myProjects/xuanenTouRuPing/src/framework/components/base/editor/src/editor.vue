<template>
  <textarea :id="'nz_editor_'+editorId" v-html="value">
  </textarea>
</template>

<script>
import '../../../../../../static/lib/kindeditor';
import '../../../../../../static/lib/kindeditor/lang/zh-CN.js';
import apiUrl from '../../../../../data/apiUrl/modules/common/index';

let editorId = 1;
export default {
  name: 'nz-editor',
  data() {
    return {
      editorId: 0,
      editor: null
    };
  },
  props: {
    value: String,
    /**
     * 是否禁用
     */
    disabled: Boolean,
    /**
     * 高度
     */
    height: {
      type: Number,
      default: 300
    }
  },
  watch: {
    value: function(val) {
      if (this.editor && this.editor.html() != val) {
        this.editor.html(val);
      }
    }
  },
  mounted() {
    let self = this;
    this.editor = window.KindEditor.create('#nz_editor_' + this.editorId, {
      basePath: 'static/lib/kindeditor/',
      uploadJson: apiUrl.UPLOAD_EDITOR,
      themeType: 'default',
      width: '100%',
      height: self.height + 'px',
      cssData: 'img{width:100%;height:auto;}',
      resizeType: 1,
      items: [
        'source',
        'preview',
        '|',
        'fontname',
        'fontsize',
        '|',
        'forecolor',
        'hilitecolor',
        'bold',
        'italic',
        'underline',
        'removeformat',
        '|',
        'justifyleft',
        'justifycenter',
        'justifyright',
        'insertorderedlist',
        'insertunorderedlist',
        '|',
        'flash',
        'media',
        'image',
        'link'
      ],
      afterBlur: function() {
        self.$emit('input', this.html());
      }
    });
    if (this.disabled) {
      this.editor.readonly(true);
    }
  },
  created() {
    this.editorId = editorId++;
  },
  destroyed() {}
};
</script>

<style rel='stylesheet/less' lang='less'>
@import '../../../../assets/css/config.less';

.ke-container {
  border-radius: 3px;
  border: 1px solid @Gray !important;
}

.ke-statusbar,
.ke-toolbar {
  background-color: @ExtraLightGray !important;
}

.ke-statusbar {
  border-top: 1px solid @Gray !important;
}

.ke-toolbar {
  border-bottom: 1px solid @Gray !important;
}
</style>
