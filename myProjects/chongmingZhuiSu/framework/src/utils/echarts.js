import { ajax } from './ajax';
import Vue from 'vue';

const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/map');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/visualMap');
require('echarts/lib/component/toolbox');

const axisColor = '#666'; //坐标轴颜色
const splitLineColor = '#e1e1e1'; //分割线颜色

/**
 * 图表工具类
 */
export default {
  echarts,
  /**
   * 得到饼状图配置
   * @param data 数据格式：
   *  {
   *    values: [
   *      {name: 'example', value: 10}
   *    ],
   *    option: {
   *      name: ''
   *    }
   *  }
   * @returns 配置项
   */
  getPieChartOption(data, option) {
    data = Object.deepClone(data);
    data.values.forEach(item => {
      if (item.name.length > 4) {
        item.name = item.name.substr(0, 4) + '...';
      }
    });
    const defaultOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: '2%',
        bottom: '2%',
        data: data.values.slice(0, 7).map(item => {
          return item.name;
        })
      },
      series: [
        {
          name: data.option.name,
          type: 'pie',
          radius: ['58%', '88%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '24',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data.values
        }
      ],
      color: Vue.globalData.get('appConfig').chartColors
    };
    return Object.deepMerge(defaultOption, option);
  },
  /**
   * 得到柱状图配置
   * @param data 数据格式参考getPieChartOption方法的入参
   */
  getBarChartOption(data, option) {
    const defaultOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: '3%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.values.map(item => {
          if (data.option.nameLength) {
            return item.name.length > data.option.nameLength
              ? item.name.substr(0, data.option.nameLength) + '...'
              : item.name;
          }
          return item.name;
        }),
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: [axisColor]
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: [axisColor]
          }
        },
        splitLine: {
          lineStyle: {
            color: [splitLineColor]
          }
        },
        minInterval: data.option.minInterval
      },
      series: [
        {
          name: data.option.name,
          type: 'bar',
          barWidth: '50%',
          data: data.values.map(item => {
            return item.value;
          })
        }
      ],
      color: Vue.globalData.get('appConfig').chartColors
    };
    return Object.deepMerge(defaultOption, option);
  },
  /**
   * 得到柱状图配置（多条）
   * @param data 数据格式参考getPieChartOption方法的入参
   */
  getMultipleBarChartOption(data, option) {
    let values = []; //选择数量最多的数据
    data.values.forEach(item => {
      if (item.values.length > values.length) {
        values = item.values;
      }
    });
    const defaultOption = {
      legend: {
        top: '0%',
        left: 'center',
        width: '80%',
        data: data.values.map(item => {
          return item.option.name;
        })
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: '15%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: values.map(item => {
          if (data.option.nameLength) {
            return item.name.length > data.option.nameLength
              ? item.name.substr(0, data.option.nameLength) + '...'
              : item.name;
          }
          return item.name;
        }),
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: [axisColor]
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: [axisColor]
          }
        },
        splitLine: {
          lineStyle: {
            color: [splitLineColor]
          }
        },
        minInterval: data.option.minInterval
      },
      series: data.values.map(item => {
        return {
          name: item.option.name,
          type: 'bar',
          stack: item.option.stack,
          data: item.values.map(item2 => {
            return item2.value;
          })
        };
      }),
      color: Vue.globalData.get('appConfig').chartColors
    };
    return Object.deepMerge(defaultOption, option);
  },
  /**
   * 得到折线图配置
   * @param data 数据格式参考getPieChartOption方法的入参
   */
  getLineChartOption(data, option) {
    const defaultOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '3%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.values.map(item => {
          if (data.option.nameLength) {
            return item.name.length > data.option.nameLength
              ? item.name.substr(0, data.option.nameLength) + '...'
              : item.name;
          }
          return item.name;
        }),
        axisLine: {
          lineStyle: {
            color: [axisColor]
          }
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: [splitLineColor]
          }
        },
        axisLine: {
          lineStyle: {
            color: [axisColor]
          }
        },
        minInterval: data.option.minInterval
      },
      series: [
        {
          name: data.option.name,
          type: 'line',
          data: data.values.map(item => {
            return item.value;
          })
        }
      ],
      color: Vue.globalData.get('appConfig').chartColors
    };
    return Object.deepMerge(defaultOption, option);
  },
  /**
   * 得到折线图配置（多条）
   * @param data 数据格式参考getPieChartOption方法的入参
   */
  getMultipleLineChartOption(data, option) {
    let values = []; //选择数量最多的数据
    data.values.forEach(item => {
      if (item.values.length > values.length) {
        values = item.values;
      }
    });
    const defaultOption = {
      legend: {
        top: '0%',
        left: 'center',
        width: '80%',
        data: data.values.map(item => {
          return item.option.name;
        })
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '15%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: values.map(item => {
          if (data.option.nameLength) {
            return item.name.length > data.option.nameLength
              ? item.name.substr(0, data.option.nameLength) + '...'
              : item.name;
          }
          return item.name;
        }),
        axisLine: {
          lineStyle: {
            color: [axisColor]
          }
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: [splitLineColor]
          }
        },
        axisLine: {
          lineStyle: {
            color: [axisColor]
          }
        },
        minInterval: data.option.minInterval
      },
      series: data.values.map(item => {
        return {
          name: item.option.name,
          type: 'line',
          data: item.values.map(item2 => {
            return item2.value;
          })
        };
      }),
      color: Vue.globalData.get('appConfig').chartColors
    };
    return Object.deepMerge(defaultOption, option);
  },
  /**
   * 得到地图配置
   * @param data 数据格式参考getPieChartOption方法的入参
   */
  getMapChartOption(data, option) {
    const max = data.values.reduce((max, current) => {
      return Math.max(max, current.value);
    }, -999999);
    const defaultOption = {
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        type: 'continuous',
        min: 0,
        max: max,
        inRange: {
          color: ['#6FAFEA', '#d55353']
        },
        show: false
      },
      series: [
        {
          name: data.option.name,
          type: 'map',
          map: data.option.mapName,
          roam: false,
          top: '0',
          bottom: '0',
          itemStyle: {
            normal: {
              areaColor: '#eee',
              borderColor: '#ccc'
            },
            emphasis: { label: { show: true } }
          },
          data: data.values
        }
      ]
    };
    return Object.deepMerge(defaultOption, option);
  },
  /**
   * 初始化图表
   * @param el dom对象
   * @param type 图表类型，可选项pie、bar、line、map、custom，不填默认为custom
   * @param data 图表数据，数据格式参考getPieChartOption方法的入参
   * @param chartOption 额外的图表配置
   */
  init(el, type, data, chartOption) {
    return new Promise((resolve, reject) => {
      if (!el) {
        reject(new CjmError('缺少必要参数:el', 600));
        return;
      }
      type = type || 'custom';
      if (['pie', 'bar', 'line', 'map', 'custom'].indexOf(type) < 0) {
        reject(new CjmError('不支持的图表类型', 601));
        return;
      }

      if (!this.checkData(data, type)) {
        reject(new CjmError('数据格式错误', 602));
        return;
      }

      if (data.values.length === 0) {
        reject(new CjmError('数据为空', 603));
        return;
      }

      if (data.values[0].option && data.values[0].values) {
        let length = 0;
        data.values.forEach(item => {
          length += item.values.length;
        });
        if (length === 0) {
          reject(new CjmError('数据为空', 603));
          return;
        }
      }

      const chart = echarts.init(el);
      let option = {};
      switch (type) {
        case 'pie':
          option = this.getPieChartOption(data, chartOption);
          break;
        case 'bar':
          if (this.isMultiple(data)) {
            option = this.getMultipleBarChartOption(data, chartOption);
          } else {
            option = this.getBarChartOption(data, chartOption);
          }
          break;
        case 'line':
          if (this.isMultiple(data)) {
            option = this.getMultipleLineChartOption(data, chartOption);
          } else {
            option = this.getLineChartOption(data, chartOption);
          }
          break;
        case 'map':
          option = this.getMapChartOption(data, chartOption);
          break;
      }
      if (type === 'map') {
        let path = '';
        if (data.option.mapType === 'province') {
          path = 'province';
        }
        ajax
          .get(
            `${Vue.globalData.get('appConfig').echartMapPath}/${path}/${data.option.mapName}.json`
          )
          .then(r => {
            echarts.registerMap(data.option.mapName, r);
            chart.setOption(option);
            resolve(chart);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        chart.setOption(option);
        resolve(chart);
      }
    });
  },
  /**
   * 检查数据格式
   * @param data 图表数据
   * @param type 图表类型
   */
  checkData(data, type) {
    if (type === 'custom') {
      return true;
    }
    if (!data) {
      return false;
    }
    if (typeof data !== 'object') {
      return false;
    }
    if (
      typeof data.values !== 'object' ||
      typeof data.option !== 'object' ||
      !data.values ||
      !data.option
    ) {
      return false;
    }
    //values必须为数组
    if (!Array.isArray(data.values)) {
      return false;
    }
    if (type === 'pie' || type === 'bar' || type === 'line') {
      if (data.values.length > 0) {
        if (data.values[0].value === undefined || data.values[0].name === undefined) {
          if (data.values[0].values === undefined || data.values[0].option === undefined) {
            return false;
          }
        }
      }
    } else if (type === 'map') {
      if (data.values.length > 0) {
        if (!data.values[0].value || !data.values[0].name) {
          return false;
        }
      }
      if (!data.option.mapName || !data.option.mapType) {
        return false;
      }
    }

    return true;
  },
  /**
   * 是否是多条
   * @param data
   */
  isMultiple(data) {
    if (data.values && data.values.length > 0) {
      if (data.values[0].values && data.values[0].option) {
        return true;
      }
    }
    return false;
  }
};
