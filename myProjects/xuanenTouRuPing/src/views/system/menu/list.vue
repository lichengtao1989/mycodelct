<template>
  <div class="form-content" style="padding: 0 30px">
    <nz-form class="form clear" label-wifth="150px">
      <nz-tabs v-model="powerType">
        <nz-tab-pane label="运营商" name="3">
          <menu-tree powerType="3"></menu-tree>
        </nz-tab-pane>

        <nz-tab-pane label="政府菜单" name="1">
          <menu-tree powerType="1"></menu-tree>
        </nz-tab-pane>

        <nz-tab-pane label="经营主体菜单" name="2">
          <menu-tree powerType="2"></menu-tree>
        </nz-tab-pane>

      </nz-tabs>
    </nz-form>
  </div>
</template>
<script>
import menuTree from './menu-tree.vue';
export default {
  components: { menuTree },
  data() {
    return {
      powerType: '3'
    };
  },
  methods: {}
};
</script>
