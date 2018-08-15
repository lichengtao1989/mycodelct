<template>
  <div>
    <cjm-search-container theme="theme2">
      <cjm-search-item label="快速查询" search-key="dateStatistics" v-model="search.dateStatistics">
        <cjm-date-range-quick-picker ref="datePiker"
                                     v-model="search.dateStatistics"
                                     :radioOptions="radioOption"
                                     :pickerOptions="dateTimeOptions"
                                     @input="refreshData"></cjm-date-range-quick-picker>
      </cjm-search-item>
      <cjm-search-item label="活动标题" search-key="activityName" v-model="search.activityName">
        <cjm-remote-select v-model="search.activityName"
                           value-key="activityName"
                           label-key="activityName"
                           @select="selectOrg"
                           placeholder="搜索活动标题"
                           :remote-url="$globalData.get('marketing','apiUrl').activity.operatingActivities.GET_ACTIVITYNAME_LIST"></cjm-remote-select>
      </cjm-search-item>
      <cjm-search-item label="活动机构" search-key="orgID" v-model="search.orgID">
        <cjm-remote-select v-model="search.orgID"
                           @select="selectOrg"
                           placeholder="搜索活动机构"
                           :remote-url="$globalData.get('marketing','apiUrl').activity.operatingActivities.GET_ORG_LIST">
          <template slot-scope="scope">
            {{scope.item.orgName}}({{scope.item.corpID}})
          </template>
        </cjm-remote-select>
      </cjm-search-item>
    </cjm-search-container>
    <div>
      <cjm-cards class="border-none">
        <cjm-data-card ref="jumpRate" title="日跳转率" size="large"
                       :chart-option-factory="optionFactory"
                       :data-factory="jumpRateData" chart-type="line">
          <div slot="toolbar">
            <span class="limited-date">截止昨日24：00</span>
          </div>
        </cjm-data-card>
        <cjm-data-card ref="conversionRate"
                       title="日转化率"
                       size="large"
                       :chart-option-factory="optionFactory"
                       :data-factory="conversionRateData"
                       chart-type="line">
          <div slot="toolbar">
            <span class="limited-date">截止昨日24：00</span>
          </div>
        </cjm-data-card>
      </cjm-cards>
    </div>
  </div>
</template>
<script>
  import CjmDatePicker from 'framework/components/base/date-picker/src/date-picker'
  import CjmDataCard from 'framework/components/base/data-card/src/data-card'
  import CjmCards from 'framework/components/base/cards/'
  import CjmDateRangeQuickPicker from 'framework/components/base/date-range-quick-picker'
  export default{
    components: {
      CjmDatePicker,
      CjmDataCard,
      CjmCards,
      CjmDateRangeQuickPicker
    },
    data(){
      let self = this;
      return {
        search: {
          dateStatistics: '',
          beginTime: '',
          endTime: '',
          selectTime: '',
          activityName: '',
          orgID: ''
        },
        dateTimeOptions: {
          disabledDate(time){
            return false;
          },
          onPick(date){
            self.selectDateTime(date)
          }
        },
        limitedDate: ''
      }
    },
    computed: {
      radioOption(){
        let currentMonth = new Date().getMonth() + 1;
        let prevQuarterMonth = new Date().getMonth() - 2 < 0 ? 0 : new Date().getMonth() - 2;
        return [
          {label: '上季', value: this.getCurrentQuarter(prevQuarterMonth)},
          {label: '当季', value: this.getCurrentQuarter(currentMonth)}
        ]
      }
    },
    methods: {
      selectDateTime(date){
        this.$refs.datePiker.radioIndex = '';
        if (date.maxDate) {
          let maxDate = new Date(date.maxDate);
          let maxDateMonth = maxDate.getMonth() + 1 > 9 ? maxDate.getMonth() + 1 : '0' + (maxDate.getMonth() + 1);
          let maxDateDay = maxDate.getDate() > 9 ? maxDate.getDate() : '0' + maxDate.getDate();
          let minDate = new Date(date.minDate);
          let minDateMonth = minDate.getMonth() + 1 > 9 ? minDate.getMonth() + 1 : '0' + (minDate.getMonth() + 1);
          let minDateDay = minDate.getDate() > 9 ? minDate.getDate() : '0' + minDate.getDate();
          this.search.dateStatistics = minDate.getFullYear() + '/' + minDateMonth + '/' + minDateDay + ' ~ ' + maxDate.getFullYear() + '/' + maxDateMonth + '/' + maxDateDay;
          this.refreshData();
        }
      },
      refreshData(){ // 获取日跳转率的数据
        this.$refs.jumpRate.refresh();
        this.$refs.conversionRate.refresh();
      },
      jumpRateData(){ // 跳转率数据图表更新
        let params = {
          type: '1',
          activityName: this.search.activityName || '',
          dateStatistics: this.search.dateStatistics || '',
          orgID: this.search.orgID || ''
        };
        return new Promise((resolve, reject) => {
          this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.operatingActivities.GET_DATA_STATISTICS, params).then((res) => {
            if (res.resultCode === '200' && res.data) {
              if (res.data.values) {
                if (!res.data.option) {
                  res.data.option = {}
                }
                resolve(res.data);
              } else {
                resolve(null);
              }
            }
          })
        })
      },
      conversionRateData(){ // 获取日转化率的数据
        let params = {
          type: '2',
          activityName: this.search.activityName || '',
          dateStatistics: this.search.dateStatistics || '',
          orgID: this.search.orgID || ''
        };
        return new Promise((resolve, reject) => {
          this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.operatingActivities.GET_DATA_STATISTICS, params).then((res) => {
            if (res.resultCode === '200' && res.data) {
              if (res.data.values) {
                if (!res.data.option) {
                  res.data.option = {}
                }
                resolve(res.data);
              } else {
                resolve(null);
              }
            }
          })
        })
      },
      optionFactory(){ //图表配置项
        return new Promise((resolve, reject) => {
          resolve({
            yAxis: {
              name: '转化率(%)'
            },
            grid: {
              top: '15%',
              left: '1%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              formatter(params){
                let content = params[0].axisValue;
                params.forEach((p, index) => {
                  if (p.data) {
                    content += '<p>' + p.seriesName + ':' + p.data + '%</p>';
                  }
                });
                return content;
              }
            }
          })
        })
      },
      getCurrentQuarter(month){ //选择季度
        switch (month) {
          case 1:
          case 2:
          case 3:
            this.search.dateStatistics = new Date().getFullYear() + '/01/01 ~ ' + new Date().getFullYear() + '/03/31';
            break;
          case 4:
          case 5:
          case 6:
            this.search.dateStatistics = new Date().getFullYear() + '/04/01 ~ ' + new Date().getFullYear() + '/06/30';
            break;
          case 7:
          case 8:
          case 9:
            this.search.dateStatistics = new Date().getFullYear() + '/07/01 ~ ' + new Date().getFullYear() + '/09/30';
            break;
          case 0:
          case 10:
          case 11:
          case 12:
            this.search.dateStatistics = new Date().getFullYear() + '/10/01 ~ ' + new Date().getFullYear() + '/12/31';
            break;
        }
        return this.search.dateStatistics;
      },
      selectOrg(){ // 选择机构
        this.refreshData()
      },
      changeQuickPicker(){ //
        this.refresh();
      }
    },
    mounted(){
      let lastDay = new Date(new Date().getTime() - (24 * 3600 * 1000));
      this.limitedDate = lastDay.toString('yyyy/MM/dd');
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

  .cjm-search-container.theme2 .cjm-search-container-content .cjm-search-item {
    width: 600px;
  }

  .border-none .cjm-data-card-wrap {
    border-top: none;
  }

  .theme2 {
    .cjm-search-item {
      margin-bottom: 30px;
    }
  }

  .limited-date {
    font-weight: 300;
    font-size: 14px;
  }
</style>
