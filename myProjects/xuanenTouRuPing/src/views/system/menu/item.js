import Vue from 'vue';
export default function(data, localEventBus, isFirstItem, isLastItem) {
  return Vue.component('menu-item', {
    template: `
              <div class="menu-item">
                <div class="menu-name">{{menuItemData.powerName}}</div>
                <div class="ctrl">
                  <span @click.stop.prevent="add" v-if="!menuItemData.parentID"><i class="nz-icon-add"></i></span>
                  <span @click.stop.prevent="edit"><i class="nz-icon-edit"></i></span>
                  <span @click.stop.prevent="moveDown" v-if="!isLastItem"><i class="nz-icon-movedown"></i></span>
                  <span @click.stop.prevent="moveUp" v-if="!isFirstItem"><i class="nz-icon-moveup"></i></span>
                  <span @click.stop.prevent="del"><i class="nz-icon-close"></i></span>
                </div>
              </div>
              `,
    data() {
      return { menuItemData: data, localEventBus, isFirstItem, isLastItem }
    },
    methods: {
      add() {
        this.localEventBus.$emit('addMenuItem', this.menuItemData);
      },
      edit() {
        this.localEventBus.$emit('editMenuItem', this.menuItemData);
      },
      moveUp() {
        this.localEventBus.$emit('moveUpMenuItem', this.menuItemData);
      },
      moveDown() {
        this.localEventBus.$emit('moveDownMenuItem', this.menuItemData);
      },
      del() {
        this.localEventBus.$emit('delMenuItem', this.menuItemData);
      }
    }
  });
}
