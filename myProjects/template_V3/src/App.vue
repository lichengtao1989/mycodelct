<template>
  <div id="app" v-if="h5Match">
    <main-info></main-info>
  </div>
</template>

<script>
  import mainInfo from './components/main.vue';
  import urlQuery from './common/jsonp/urlQuery';
  export default {
    name: 'app',
    data() {
      return {
        showtype: 1,
        h5Match: false
      };
    },
    components: {
      mainInfo
    },
    created() {
      this.h5ModelMatch();
    },
    mounted() {
    },
    methods: {
      toggleClass(element, className) {
        if(!element || !className){
          return
        }
        element.className = className;
      },
      async h5ModelMatch(){
        const { code = '', uuid = ''} = urlQuery();
        if (!code) {
          setTimeout(() => {
            this.h5Match = true;
          }, 500);
          return;
        }
        this.$jsonp({function: 'GetH5Mode', Code: code, type: 'ncp'}).then(res => {
          if (res.Result == 1) {
            let targetHref = '';
            if (res.Data.H5Mode == 1) { //模版2
              targetHref = `//ncp2.cjm.so/index.aspx?code=${code}` + (uuid ? `&uuid=${uuid}` : '');
              // targetHref = `${location.origin}/nywap2/index.aspx?code=${code}` + (uuid ? `&uuid=${uuid}` : '');
            } else if (res.Data.H5Mode.length > 1) { //模版3
              const colorType = {
                '0': 'red',
                '1': 'blue',
                '2': 'green',
              }
              const h5Color = res.Data.H5Mode.split('')[1];
              const theme = colorType[h5Color];
              this.toggleClass(document.body, `custom-${theme}`)
              this.h5Match = true;
            } else { //模版1
              targetHref = `//ncp.cjm.so/index.aspx?code=${code}` + (uuid ? `&uuid=${uuid}` : '');
              // targetHref = `${location.origin}/nywap/index.aspx?code=${code}` + (uuid ? `&uuid=${uuid}` : '');
            }
            if (!this.h5Match && location.href != targetHref) {
              location.href = targetHref
            } else {
              this.h5Match = true;
            }
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  @import "assets/style/blue.scss";
  @import "assets/style/red.scss";
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote,
  dl, dt, dd, ul, ol, li,
  pre,
  form, fieldset, legend, button, input, textarea,
  th, td {
    margin: 0;
    padding: 0;
  }
  body,
  button, input, select, textarea {
    font: 12px/1.5 tahoma, arial, \5b8b\4f53, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
  }
  address,
  cite,
  dfn,
  em,
  var {
    font-style: normal;
  }
  code, kbd, pre, samp {
    font-family: courier new, courier, monospace;
  }
  small {
    font-size: 12px;
  }
  ul, ol {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  legend {
    color: #000;
  }
  button, input, select, textarea {
    font-size: 100%;
  }

  html, body {
    height: 100%;
    width: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1;
    background: #eee;
    width: 100%;
    overflow-x: hidden;
  }
</style>