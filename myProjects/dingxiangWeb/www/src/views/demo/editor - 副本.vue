<template>
  <div style="padding: 20px">
    <div>
      <iframe class="editor-frame" src="/static/editor/index.html" ref="editorFrame"></iframe>
    </div>
    <nz-button @click="getContent">获取编辑器内容</nz-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    setContent() {
      const editor = this.$refs.editorFrame;
      console.log(editor);
      const contentHtml = '<div>设置编辑器内容</div>';
      if (editor.contentWindow.init) {
        editor.contentWindow.init(contentHtml);
      } else {
        editor.onload = () => {
          editor.contentWindow.init(contentHtml);
        };
      }
    },
    getContent() {
      const editor = this.$refs.editorFrame;
      const content = editor.contentWindow.getContent();
      alert(content);
    }
  },
  mounted() {
    this.setContent();
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.editor-frame {
  border: none;
  width: 500px;
  height: 350px;
}
</style>
