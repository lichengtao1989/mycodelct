<template>
  <div>
    <div class="list" v-if="currentPage == 'list'">
      <cjm-list :request-url="requestUrl" :need-base-search="true" :need-advanced-search="true" :format-data="formatTableData" base-search-placeholder="活动名称、机构、产品" ref="list">
        <div slot="operate">
          <cjm-button power-code="salesRedPackAdd" type="primary" @click="edit('add')">
            <i class="cjm-icon-add"></i>新建活动</cjm-button>
          <span class="switch-title">红包提现审核</span>
          <cjm-switch @change="redPackExamine" v-model="switchValue" active-color="#3cd66d" inactive-color="#e74c3c" active-value="1" inactive-value="0"></cjm-switch>
        </div>
        <div slot="search">
          <cjm-search-item label="活动开始时间" search-key="beginTime" v-model="search.beginTime">
            <cjm-date-picker v-model="search.beginTime" :picker-options="beginTimeOption" type="date"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="活动结束时间" search-key="endTime" v-model="search.endTime">
            <cjm-date-picker v-model="search.endTime" :picker-options="endingTimeOption" type="date"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="活动机构" search-key="orgID" v-model="search.orgID">
            <cjm-remote-select v-model="search.orgID" :remote-url="$globalData.get('marketing','apiUrl').autoComplete.ORG">
            </cjm-remote-select>
          </cjm-search-item>
          <cjm-search-item label="状态" v-model="search.status" search-key="status">
            <cjm-enum-select v-model="search.status" enum-name="活动列表活动状态" enum-namespace="marketing" :clearable="true"></cjm-enum-select>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column sortable="custom" prop="activityName" label="活动标题" min-width="120"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="beginTime" label="活动开始时间" width="180"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="endTime" label="活动结束时间" width="180"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="activityOrg" label="活动机构" :show-overflow-tooltip="false" min-width="180">
            <template slot-scope="scope">
              <cjm-popover ref="popover1" placement="top-start" width="300" trigger="hover">
                <div v-html="scope.row.activityOrg.split(',').join('<br />')" :style="scope.row.activityOrg.split(',').length > 15 ? columHeight : columHeightAuto"></div>
              </cjm-popover>
              <div v-html="listEditHTML(scope.row,'activityOrg')" v-popover:popover1></div>
            </template>
          </cjm-table-column>
          <cjm-table-column sortable="custom" prop="activityProduct" label="活动产品" :show-overflow-tooltip="false" min-width="180">
            <template slot-scope="scope">
              <cjm-popover ref="popover2" placement="top-start" width="300" trigger="hover">
                <div v-html="scope.row.activityProduct.split(',').join('<br />')" :style="scope.row.activityProduct.split(',').length > 15 ? columHeight : columHeightAuto"></div>
              </cjm-popover>
              <div v-html="listEditHTML(scope.row,'activityProduct')" v-popover:popover2></div>
            </template>
          </cjm-table-column>
          <cjm-table-column sortable="custom" prop="createByName" label="更新者" min-width="100"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="lastUpdateTime" label="更新时间" min-width="150"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="status" label="活动状态" enum-name="活动列表活动状态" enum-namespace="marketing" width="150"></cjm-table-column>
          <cjm-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <cjm-button type="text" power-code="salesRedPackEdit" @click="edit('edit',scope.row)">编辑</cjm-button>
              <cjm-button type="text" power-code="salesRedPackCopy" @click="edit('copy',scope.row)">复制</cjm-button>
              <cjm-button type="text" power-code="salesRedPackControl" @click="handleActivity(scope.row)" v-if="scope.row.status === '1'">停用</cjm-button>
              <cjm-button type="text" power-code="salesRedPackControl" @click="handleActivity(scope.row)" v-if="scope.row.status === '0'">启用</cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div class="edit" v-if="currentPage == 'edit'">
      <add-edit></add-edit>
    </div>
  </div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import addEdit from './edit.vue';
export default {
  components: {
    addEdit
  },
  mixins: [pageSwitch],
  data() {
    let search = {
      beginTime: '',
      endTime: '',
      status: '',
      orgID: ''
    };
    return {
      requestUrl: this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack
        .GET_ACTIVITY_LIST,
      search: search,
      switchValue: '',
      currentPage: 'list',
      tooltipStatus: false,
      beginTimeOption: {
        disabledDate(time) {
          if (search.endTime !== '') {
            return time.getTime() > new Date(search.endTime).getTime();
          }
        }
      },
      endingTimeOption: {
        disabledDate(time) {
          if (search.beginTime !== '') {
            return time.getTime() < new Date(search.beginTime).getTime();
          }
        }
      },
      columHeight: {
        height: '200px',
        overflow: 'auto'
      },
      columHeightAuto: {
        height: 'auto'
      }
    };
  },
  methods: {
    /**
     * 红包提现审核切换
     * 提交的是切换后的状态
     * val == '1'（是）
     * val == '0' (否)
     * String类型
     **/
    redPackExamine(val) {
      let params = {
        itemValue: String(val)
      };
      this.$ajax
        .post(
          this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.RED_PACK_EXAMINE,
          params
        )
        .then(res => {
          if (res.resultCode == '200') {
            this.$message.success('切换成功!');
          }
        });
    },
    /*
       * 列表操作项 停用按钮
       * */
    handleActivity(row) {
      let params = {
        activityID: row.activityID,
        status: row.status == '1' ? '0' : '1'
      };
      this.$ajax
        .post(
          this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.UP_DATE_STATUS,
          params
        )
        .then(res => {
          if (res.resultCode === '200') {
            if (row.status === '1') {
              row.status = '0';
              this.$message.success('已停用');
            } else {
              row.status = '1';
              this.$message.success('已启用');
            }
          }
        });
    },
    /*
       * 点击跳转到编辑页面
       * */
    edit(type, row) {
      switch (type) {
        case 'add':
          this.pushPage('edit', '新建活动', { id: type });
          break;
        case 'edit':
          this.$ajax
            .get(this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.GET_DETAIL, {
              activityID: row.activityID
            })
            .then(res => {
              this.pushPage('edit', '编辑', { id: type, data: res.data });
            });
          break;
        case 'copy':
          this.$ajax
            .get(this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.GET_DETAIL, {
              activityID: row.activityID
            })
            .then(res => {
              this.pushPage('edit', '编辑', { id: type, data: res.data });
            });
          break;
      }
    },
    listEditHTML(row, type) {
      let arr = row[type].split(',');
      if (arr.length > 2) {
        arr = arr.map((val, index) => {
          if (index < 1) {
            return (
              '<p style="white-space:nowrap; width: 150px;text-overflow:ellipsis;overflow: hidden;">' +
              val +
              '</p>'
            );
          }
        });
        return arr.join('') + '...';
      } else {
        arr = arr.map((val, index) => {
          if (index < 2) {
            return (
              '<p style="white-space:nowrap; width: 150px;text-overflow:ellipsis;overflow: hidden;">' +
              val +
              '</p>'
            );
          }
        });
        return arr.join('');
      }
    },
    mouseEnter(e, row) {
      row.tooltipShow = true;
    },
    mouseLeave(e, row) {
      row.tooltipShow = false;
    },
    formatTableData(data) {
      data.forEach(item => {
        item.tooltipShow = false;
      });
      return data;
    },
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    }
  },
  mounted() {
    this.$ajax
      .post(this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.GET_AUDIT)
      .then(res => {
        if (res.resultCode === '200') {
          this.switchValue = res.data;
        }
      });
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../../assets/css/config';

.switch-title {
  font-size: 14px;
  color: #475669;
}

.maxLenth {
  max-height: 300px;
  overflow: auto;
}
</style>
