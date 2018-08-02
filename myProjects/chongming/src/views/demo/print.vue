<template>
  <div>
    <nz-button @click="print">打印小票</nz-button>
  </div>
</template>
<script>
  import lodopFuncs from '@static/print/lodopFuncs'
  import ticketTpl from './ticket.ejs';
  import _ from 'underscore';
  export default {
    data(){
      return {}
    },
    methods: {
      print(){
        const LODOP = lodopFuncs.getLodop();
        LODOP.PRINT_INIT('');
        LODOP.SET_PRINT_MODE('WINDOW_DEFPRINTER');
        const template = _.template(ticketTpl);
        const ticketContent = template({});
        LODOP.ADD_PRINT_HTM(7, 0, '100%', '100%', ticketContent);
        LODOP.SET_PRINT_PAGESIZE(3, '60mm', 45, '');
        LODOP.PREVIEW(); //预览
        //LODOP.PRINT(); //打印
      }
    }
  }
</script>
