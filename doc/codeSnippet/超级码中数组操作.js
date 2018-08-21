productDataGetOption(chartData) {
  // console.log(chartData);
  return new Promise(resolve => {
    let data = Object.deepClone(chartData);
    const values = [];
    const weightData = data.values.find(item => item.option.name === '重量');
    const orderData = data.values.find(item => item.option.name === '单数');
    const purchaseData = data.values.find(item => item.option.name === '金额');
    weightData.values.forEach((item, index) => {
      values.push({
        option: { name: item.name },
        values: [{ name: 'parentCount', value: weightData.values[index].value }, { name: 'sonCount', value: orderData.values[index].value }, { name: 'grandsonCount', value: purchaseData.values[index].value }]
      });
    });

    data.values = values;
    console.log(data);
    //从小到大排序
    data.values.sort((item1, item2, item3) => {
      const sonCount1 = item1.values.find(citem => citem.name === 'sonCount').value * 1 || 0;
      const parentCount1 = item1.values.find(citem => citem.name === 'parentCount').value * 1 || 0;
      const grandsonCount1 = item1.values.find(citem => citem.name === 'grandsonCount').value * 1 || 0;
      const sonCount2 = item2.values.find(citem => citem.name === 'sonCount').value * 1 || 0;
      const parentCount2 = item2.values.find(citem => citem.name === 'parentCount').value * 1 || 0;
      const grandsonCount2 = item2.values.find(citem => citem.name === 'grandsonCount').value * 1 || 0;

      if (sonCount1 + parentCount1 + grandsonCount1 > sonCount2 + parentCount2 + grandsonCount2) {
        return -1;
      }
      return 1;
    });
    //去掉0的数据
    data.values = data.values.filter(item => {
      const sonCount = item.values.find(citem => citem.name === 'sonCount').value * 1 || 0;
      const parentCount = item.values.find(citem => citem.name === 'parentCount').value * 1 || 0;
      return sonCount + parentCount > 0;
    });
    //从大到小排序
    data.values.reverse();
    const productNames = data.values.map(item => {
      item.option.name = item.option.name + '';
      const nameLength = chartData.option.nameLength;
      return item.option.name.length > nameLength ? item.option.name.substr(0, nameLength) + '...' : item.option.name;
      // return item.option.name.length > nameLength ? item.option.name.substr(0, 8) + '...' : item.option.name;
    });
    const parentCounts = data.values.map(item => item.values.find(citem => citem.name === 'parentCount').value);
    const sonCounts = data.values.map(item => item.values.find(citem => citem.name === 'sonCount').value);
    const grandsonCounts = data.values.map(item => item.values.find(citem => citem.name === 'grandsonCount').value);
    const series = [
      { name: '重量', stack: '总量', barWidth: 20, type: 'bar', data: parentCounts },
      { name: '单数', stack: '总量', barWidth: 20, type: 'bar', data: sonCounts },
      { name: '金额', stack: '总量', barWidth: 20, type: 'bar', data: grandsonCounts }
    ];
    const tooltipFormatter = params => {
      const productName = data.values[params[0].dataIndex].option.name;
      const content = params.map(item => `${item.seriesName}:${item.value}`).join('&nbsp;&nbsp;&nbsp;');
      return `产品：<span class="col-21a0ff">${productName}</span><br/><span class="col-21a0ff">${content}</span>`;
    };
    const option = {
      tooltip: { trigger: 'axis', formatter: tooltipFormatter },
      legend: { data: [{ name: '重量' }, { name: '单数' }, { name: '金额' }] },
      grid: { left: '20', right: '80', top: '30', bottom: '10', containLabel: true },
      color: ['#409eff', '#f8cb4a', '#b5e253'],
      xAxis: { type: 'value', minInterval: 1 },
      yAxis: { type: 'category', data: productNames },
      series: series
    };
    resolve(option);
  });
},