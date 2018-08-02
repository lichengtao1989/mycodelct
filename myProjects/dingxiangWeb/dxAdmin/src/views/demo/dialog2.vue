<template>
  <nz-dialog ref="dialog" title="标题" customClass="width-800">
    <nz-scrollbar style="height:400px">
      <nz-form label-width="80px">
        <div class="left-group">
          <nz-form-item label="字段1">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段3">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段5">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段7">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段9">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段11">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段13">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段15">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段17">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段19">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段21">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段23">
            <nz-input></nz-input>
          </nz-form-item>
        </div>
        <div class="right-group">
          <nz-form-item label="字段2">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段4">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段6">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段8">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段10">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段12">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段14">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段16">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段18">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段20">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段22">
            <nz-input></nz-input>
          </nz-form-item>
          <nz-form-item label="字段24">
            <nz-input></nz-input>
          </nz-form-item>
        </div>
      </nz-form>
    </nz-scrollbar>
  </nz-dialog>
</template>
<script>
  export default {
    data(){
      return {};
    },
    methods: {
      show(){
        this.$refs.dialog.show();
      }
    }
  }
</script>
