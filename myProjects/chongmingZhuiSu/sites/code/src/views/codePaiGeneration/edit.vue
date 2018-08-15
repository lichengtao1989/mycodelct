<template>
  <div class="preview" onselectstart="return false">
    <div class="row clear">
      <div class="left-block">
        <div class="block-title">标识底图</div>
        <div class="clear">
          <cjm-image-upload v-model="renderData.tagBackgroundImageUrl"></cjm-image-upload>
        </div>
      </div>
      <div class="right-block">
        <div class="block-title">批次信息</div>
        <ul class="batch-information">
          <li>
            <span class="batch-information-title">企业名称</span>:
            <span>{{corpName}}</span>
          </li>
          <li>
            <span class="batch-information-title">码批次</span>:
            <span>{{batchID}}</span>
          </li>
          <li>
            <span class="batch-information-title">生码时间</span>:
            <span>{{createTime}}</span>
          </li>
          <li>
            <span class="batch-information-title">更新时间</span>: {{updateTime}}
          </li>
        </ul>
      </div>
    </div>
    <div class="row clear">
      <div class="left-block">
        <div class="block-title">动态元素</div>
        <div class="preview-edit clear">
          <div class="element-nav">
            <ul @click="tabsChange($event)">
              <!--<li v-for="(item, index) in elementNav" :data-nav="item.activeName"-->
              <!--:class="{active: item.activeName == activeNav}">-->
              <!--<cjm-checkbox></cjm-checkbox>-->
              <!--<span class="element-nav-span">{{item.navName}}</span>-->
              <!--</li>-->
              <li data-nav="QRcode" :class="{active: 'QRcode' == activeNav}">
                <cjm-checkbox v-model="renderData.qR.enabled"></cjm-checkbox>
                <span class="element-nav-span">二维码</span>
              </li>
              <li data-nav="antifake" :class="{active: 'antifake' == activeNav}">
                <cjm-checkbox v-model="renderData.antifake.enabled"></cjm-checkbox>
                <span class="element-nav-span">防伪码</span>
              </li>
              <li data-nav="verification" :class="{active: 'verification' == activeNav}">
                <cjm-checkbox v-model="renderData.verification.enabled"></cjm-checkbox>
                <span class="element-nav-span">4位验正码</span>
              </li>
              <li data-nav="logistics" :class="{active: 'logistics' == activeNav}">
                <cjm-checkbox v-model="renderData.logistics.enabled"></cjm-checkbox>
                <span class="element-nav-span">物流码</span>
              </li>
              <li data-nav="randomCode" :class="{active: 'randomCode' == activeNav}">
                <cjm-checkbox v-model="renderData.randomCode.enabled"></cjm-checkbox>
                <span class="element-nav-span">随机码</span>
              </li>
              <li data-nav="randomImage" :class="{active: 'randomImage' == activeNav}">
                <cjm-checkbox v-model="renderData.randomImage.enabled"></cjm-checkbox>
                <span class="element-nav-span">随机图</span>
              </li>
              <li data-nav="serialNumber" :class="{active: 'serialNumber' == activeNav}">
                <cjm-checkbox v-model="renderData.serialNumber.enabled"></cjm-checkbox>
                <span class="element-nav-span">序列号</span>
              </li>
              <li data-nav="pointImage" :class="{active: 'pointImage' == activeNav}">
                <cjm-checkbox v-model="renderData.pointImage.enabled"></cjm-checkbox>
                <span class="element-nav-span">点阵图</span>
              </li>
              <li data-nav="interiorCode" :class="{active: 'interiorCode' == activeNav}">
                <cjm-checkbox v-model="renderData.interiorCode.enabled"></cjm-checkbox>
                <span class="element-nav-span">内部码</span>
              </li>
              <li data-nav="logo" :class="{active: 'logo' == activeNav}">
                <cjm-checkbox v-model="renderData.logo.enabled"></cjm-checkbox>
                <span class="element-nav-span">logo</span>
              </li>
            </ul>
          </div>
          <div class="element-edit">
            <cjm-scrollbar>
              <ul>
                <li v-show="activeNav == 'QRcode'">
                  <edit-detail-qrcode :editData="renderData.qR"></edit-detail-qrcode>
                </li>
                <li v-show="activeNav == 'antifake'">
                  <edit-detail-code type="antifake" :fontNames="fontNames" :editData="renderData.antifake"
                                    @createSpaceArr="createSpaceArr"></edit-detail-code>
                </li>
                <li v-show="activeNav == 'verification'">
                  <edit-detail-code type="verification" :fontNames="fontNames" :editData="renderData.verification"
                                    @createSpaceArr="createSpaceArr"></edit-detail-code>
                </li>
                <li v-show="activeNav == 'logistics'">
                  <edit-detail-code type="logistics" :fontNames="fontNames" :editData="renderData.logistics"
                                    @createSpaceArr="createSpaceArr"></edit-detail-code>
                </li>
                <li v-show="activeNav == 'randomCode'">
                  <edit-detail-code type="randomCode" :fontNames="fontNames" :editData="renderData.randomCode"
                                    @createSpaceArr="createSpaceArr"></edit-detail-code>
                </li>
                <li v-show="activeNav == 'randomImage'">
                  <edit-detail-image type="randomImage" :editData="renderData.randomImage"
                                     :randomImageLibraries="randomImageLibraries"></edit-detail-image>
                </li>
                <li v-show="activeNav == 'serialNumber'">
                  <edit-detail-code type="serialNumber" :fontNames="fontNames" :editData="renderData.serialNumber"
                                    @createSpaceArr="createSpaceArr"></edit-detail-code>
                </li>
                <li v-show="activeNav == 'pointImage'">
                  <edit-detail-image type="pointImage" :editData="renderData.pointImage"></edit-detail-image>
                </li>
                <li v-show="activeNav == 'interiorCode'">
                  <edit-detail-code type="interiorCode" :fontNames="fontNames" :editData="renderData.interiorCode"
                                    @createInteriorCode="createInteriorCode"
                                    @createSpaceArr="createSpaceArr"></edit-detail-code>
                </li>
                <li v-show="activeNav == 'logo'">
                  <edit-detail-image type="logo" :editData="renderData.logo"></edit-detail-image>
                </li>
              </ul>
            </cjm-scrollbar>
          </div>
        </div>
      </div>
      <div class="right-block">
        <div class="block-title">编辑处</div>
        <div class="preview-contrl">
          <div class="preview-contrl-content">
            <img ondragstart="return false" :src="renderData.tagBackgroundImageUrl" alt="">
            <canvas id="preview"></canvas>
          </div>
          <div class="preview-clear-btn">
            <cjm-button @click="reset">一键清空元素</cjm-button>
          </div>
        </div>
      </div>
    </div>
    <div class="save-data">
      <cjm-button type="primary" @click="submitData" class="cjm-icon-save"> 保存</cjm-button>
    </div>
  </div>
</template>
<script>
  import editDetailQrcode from './components/edit-detail-qrcode.vue';
  import editDetailCode from './components/edit-detail-code.vue';
  import editDetailImage from './components/edit-detail-image.vue';
  import util from './util';
  export default {
    components: {
      editDetailQrcode,
      editDetailCode,
      editDetailImage
    },
    data() {
      return {
        renderWordSpace: {
          antifake: [],
          verification: [],
          logistics: [],
          randomCode: [],
          serialNumber: [],
          interiorCode: []
        },
        renderData: {}, //数据
        corpName: '', //企业名称
        batchID: '', //批次ID
        createTime: '', //
        updateTime: '',
        staticImgObject: {
          qrCodeColor: 'static/images/qrcode-color.png',
          qrcode: 'static/images/qrcode.png',
          randomColor: 'static/images/random-color.png',
          random: 'static/images/random.png',
          point: 'static/images/point.jpg'
        }, //静态图片路径
        oCanvas: '', // canvas对象
        ctx: '', // 人称上下文
        isDragged: false, //判断是否可以拖拽
        dragElement: {},
        activeNav: 'QRcode',
        fontNames: [], //字体库
        randomImageLibraries: [], //图库
        saveInterfaceLock: true,
        number: 0,
        k: 0.75
      };
    },
    methods: {
      //初始化canvas
      canvasInit() {
        this.oCanvas = document.getElementById('preview');
        this.ctx = this.oCanvas.getContext('2d');
        this.oCanvas.height = this.renderData.height;
        this.oCanvas.width = this.renderData.width;
        this.oCanvas.addEventListener('mousedown', this.startDrag);
        this.oCanvas.addEventListener('mouseup', this.stopDrag);
        this.oCanvas.addEventListener('mousemove', this.moveDrag);
      },
      //静态图片加载
      staticImageInit() {
        for (let key in this.staticImgObject) {
          let img = new Image();
          img.src = this.staticImgObject[key];
          img.onload = () => {
            this.staticImgObject[key] = img;
          }
        }
      },
      //初始化data
      dataInit() {
        let params = {
          id: util.getPageParam('id')
        };
        this.$ajax.get(this.$globalData.get('code', 'apiUrl').codePaiGeneration.GET_DETAIL, params).then(res => {
          if (res.resultCode === '200') {
            if (res.data.config) {
              this.renderData = util.copyObject(this.renderData, res.data.config);
              this.renderData.tagBackgroundImageUrl = res.data.config.tagBackgroundImageUrl;
            }
            this.fontNames = res.data.fontNames ? res.data.fontNames : [];
            this.randomImageLibraries = res.data.randomImageLibraries
              ? res.data.randomImageLibraries
              : [];
            if (!res.data.config) {
              for (let i = 0; i < res.data.antifakeLength; i++) {
                this.renderWordSpace.antifake.push(0);
              }
              for (let i = 0; i < res.data.logisticsLength; i++) {
                this.renderWordSpace.logistics.push(0);
              }
              for (let i = 0; i < 22; i++) {
                this.renderWordSpace.interiorCode.push(0);
              }
            }
            this.renderData.antifake.code = util.createRandomCode(res.data.antifakeLength);
            this.renderData.logistics.code = util.createRandomCode(res.data.logisticsLength);
            this.renderData.interiorCode.code = '';
            let startIndex = this.renderData.interiorCode.contentStartPosition;
            let endIndex = this.renderData.interiorCode.contentEndPosition;
            if (startIndex != null && endIndex != null) {
              this.createInteriorCode({
                type: this.renderData.interiorCode.contentSourceType,
                startIndex: startIndex,
                endIndex: endIndex
              });
            }
            this.corpName = res.data.corpName;
            this.createTime = res.data.createTime;
            this.updateTime = res.data.updateTime;
            this.batchID = res.data.batchID;
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      //渲染画布
      renderCanvas() {
        this.ctx.clearRect(0, 0, 640, 500); // 清空页面
        let arr = util.elementSortID(this.renderData); // 动态元素按层级排序
        for (let i = 0; i < arr.length; i++) {
          this.renderSingleElement(arr[i]);
        }
      },
      //渲染动态元素
      renderSingleElement(data) {
        let type = data.type;
        if (this.renderData[type].enabled) {
          if (this.renderData[type].code) {
            this.renderCodeElement(data);
          } else {
            this.renderImageElement(data);
          }
        }
      },
      //渲染码动态元素
      renderCodeElement(data) {
        let renderCodeArr = [],
          code = data.code,
          centerPoint = {};
        let x,
          y,
          maxWidth = 0,
          maxHeight = 0,
          currentLineWidth = 0,
          currentLineHeight = 0,
          singleLineHeight = [parseInt(data.fontSize), parseInt(data.fontSize)];
        let newLineIndex = data.newLineIndex ? data.newLineIndex : []; //newLineIndex 字段为换行；数组类型；[9] => 表示在第9位开始换行；
        data.width = 0;
        data.height = 0;
        if (data.bigNumberIndex.length > 0) {
          data.bigNumberIndex.forEach(p => {
            if (parseInt(p) <= Math.ceil(data.code.length / 2)) {
              singleLineHeight[0] = data.bigNumberFontSize;
            } else {
              singleLineHeight[1] = data.bigNumberFontSize;
            }
          });
        }
        code.split('').forEach((target, i) => {
          let textWidth,
            maxTextWidth = 0,
            fontSize;
          if (data.bigNumberIndex.length > 0 && data.bigNumberIndex.includes(i)) {
            //判断是否是大小码
            fontSize = data.bigNumberFontSize;
          } else {
            fontSize = data.fontSize;
          }
          this.ctx.font = fontSize + 'px ' + data.fontName;
          this.ctx.fillStyle = data.fontColor;
          textWidth = this.ctx.measureText(data.code[i]).width;
          maxTextWidth = maxTextWidth >= textWidth ? maxTextWidth : textWidth;
          if (newLineIndex.length > 0) {
            //两行
            let positionX = 0,
              positionY = 0;
            for (let j = 0; j < newLineIndex.length; j++) {
              positionX = i % newLineIndex[j];
              positionY = parseInt(i / newLineIndex[j]);
            }
            if (positionX === 0) {
              currentLineWidth = 0;
            }
            currentLineHeight =
              (parseInt(singleLineHeight[0]) + parseInt(singleLineHeight[1])) * this.k +
              parseInt(data.rowSpace); // 计算动态元素高度
            if (positionY > 0) {
              //第二行
              y =
                parseInt(data.Y) +
                (parseInt(singleLineHeight[0]) + parseInt(singleLineHeight[1])) * this.k +
                parseInt(data.rowSpace);
            } else {
              //第一行
              y = parseInt(data.Y) + parseInt(singleLineHeight[0]) * this.k;
            }
          } else {
            //单行
            currentLineHeight = parseInt(singleLineHeight[0]) * this.k;
            y = parseInt(data.Y) + parseInt(singleLineHeight[0]) * this.k;
          }
          x = parseInt(data.X) + currentLineWidth;
          currentLineWidth += textWidth + this.renderWordSpace[data.type][i];
          maxWidth = maxWidth >= currentLineWidth ? maxWidth : currentLineWidth;
          maxHeight = maxHeight >= currentLineHeight ? maxHeight : currentLineHeight;
          renderCodeArr.push({
            x: x,
            y: y,
            font: this.ctx.font,
            rotate: data.rotate,
            fillStyle: this.ctx.fillStyle,
            code: target,
            textWidth: parseInt(maxTextWidth)
          });
        });
        data.width = maxWidth;
        data.height = maxHeight;
        centerPoint.x = parseInt(data.X) + maxWidth / 2;
        centerPoint.y = parseInt(data.Y) + maxHeight / 2;
        this.renderData[data.type].width = parseInt(data.width);
        this.renderData[data.type].height = parseInt(data.height);
        renderCodeArr.forEach(p => {
          this.ctx.save();
          this.ctx.translate(centerPoint.x, centerPoint.y);
          this.ctx.rotate(parseInt(p.rotate) * (Math.PI / 180));
          this.ctx.translate(-centerPoint.x, -centerPoint.y);
          this.ctx.font = p.font;
          this.ctx.fillStyle = p.fillStyle;
          this.ctx.fillText(p.code, p.x, p.y);
          this.ctx.restore();
        });
        //        this.ctx.rect(data.X, data.Y, maxWidth, maxHeight);
        //        this.ctx.stroke();
      },
      //渲染图片动态元素
      renderImageElement(data) {
        let img;
        switch (data.type) {
          case 'logo':
            img = new Image();
            img.src = data.url;
            break;
          case 'qR':
            if (data.isColour) {
              img = this.staticImgObject.qrCodeColor;
            } else {
              img = this.staticImgObject.qrcode;
            }
            break;
          case 'randomImage':
            if (data.isColour) {
              img = this.staticImgObject.randomColor;
            } else {
              img = this.staticImgObject.random;
            }
            break;
          case 'pointImage':
            img = this.staticImgObject.point;
            break;
        }
        let centerPoint = {
          x: (parseInt(data.width) / 2) + data.X,
          y: (parseInt(data.width) / 2) + data.Y
        };
        if ((typeof img).toLowerCase() === 'object') {
          this.ctx.save();
          console.log(data);
          this.ctx.translate(centerPoint.x, centerPoint.y);
          this.ctx.rotate(parseInt(data.rotate) * (Math.PI / 180));
          this.ctx.translate(-centerPoint.x, -centerPoint.y);
          this.ctx.drawImage(img, data.X, data.Y, data.width, data.height);
          this.ctx.restore();
        }
      },
      //拖拽开始事件
      startDrag(e) {
        this.dragElement = {};
        let dragElementArr = [];
        let data = this.renderData;
        let clickPoint = {
          // 获取点击坐标
          x: e.layerX,
          y: e.layerY
        };
        for (let key in data) {
          if ((typeof data[key]).toLowerCase() === 'object' && data[key] && data[key].enabled) {
            let pointA = {
              x: data[key].X,
              y: data[key].Y
            };
            let pointB = {
              x: data[key].X + data[key].width,
              y: data[key].Y + data[key].height
            };
            let centerPoint = {
              x: (pointA.x + pointB.x) / 2,
              y: (pointA.y + pointB.y) / 2
            };
            //判断点击的坐标是否在元素所在的矩形中
            if (
              util.isInside(
                centerPoint.x,
                centerPoint.y,
                data[key].width,
                data[key].height,
                clickPoint.x,
                clickPoint.y,
                data[key].rotate
              )
            ) {
              data[key].distanceX = e.layerX - data[key].X;
              data[key].distanceY = e.layerY - data[key].Y;
              dragElementArr.push(data[key]);
              this.isDragged = true;
            }
          }
        }
        let maxIndex = util.elementSortID(this.renderData)[util.elementSortID(this.renderData).length - 1].index;
        this.dragElement = util.elementSortMaxIndex(dragElementArr, 'index').maxObject;
        this.dragElement.index = maxIndex + 1;
      },
      //拖拽结束事件
      stopDrag() {
        this.isDragged = false;
      },
      //拖拽时的事件
      moveDrag(e) {
        if (this.isDragged) {
          this.dragElement.X = e.layerX - this.dragElement.distanceX;
          this.dragElement.Y = e.layerY - this.dragElement.distanceY;
          this.renderCanvas();
        }
      },
      //切换tabs
      tabsChange(e) {
        let $nav = util.elementNavSelect(e.target);
        if ($nav) {
          this.activeNav = $nav.getAttribute('data-nav');
        }
      },
      //修改renderWordSpace
      createSpaceArr(val) {
        this.renderWordSpace[val.type] = [];
        let len = val.len ? val.len : val.code.length;
        for (let i = 0; i < len; i++) {
          if (val.data[0].position && val.data[0].distance) {
            if (val.data[0].position == i + 1) {
              this.renderWordSpace[val.type].push(parseInt(val.data[0].distance));
            } else if (val.data[1].position == i + 1) {
              this.renderWordSpace[val.type].push(parseInt(val.data[1].distance));
            } else {
              this.renderWordSpace[val.type].push(this.renderData[val.type].wordSpace);
            }
          } else {
            this.renderWordSpace[val.type].push(this.renderData[val.type].wordSpace);
          }
        }
        this.renderCanvas();
      },
      //生成内部码
      createInteriorCode(data) {
        if (data.type == 0) {
          this.renderData.interiorCode.code = this.renderData.logistics.code.substr(
            data.startIndex - 1,
            data.endIndex - data.startIndex + 1
          );
        } else {
          this.renderData.interiorCode.code = this.renderData.antifake.code.substr(
            data.startIndex - 1,
            data.endIndex - data.startIndex + 1
          );
        }
        while (this.renderWordSpace.interiorCode.length < this.renderData.interiorCode.code.length) {
          this.renderWordSpace.interiorCode.push(this.renderData.interiorCode.wordSpace);
        }
      },
      //提交数据
      submitData() {
        if (this.saveInterfaceLock) {
          this.saveInterfaceLock = false;
          let submitDataObject = Object.deepClone(this.renderData);
          let params = {
            data: JSON.stringify(submitDataObject),
            id: util.getPageParam('id')
          };
          this.$ajax
            .post(this.$globalData.get('code', 'apiUrl').codePaiGeneration.SAVE_CONFIG, params)
            .then(res => {
              this.saveInterfaceLock = true;
              if (res.resultCode == '200') {
                this.$message.success('保存成功!');
                setTimeout(() => {
                  location.reload();
                }, 1000);
              } else {
                this.$message.error(res.msg);
              }
            });
        }
      },
      //重置
      reset() {
        this.renderData = {
          antifake: {
            X: 0,
            Y: 0,
            code: '',
            type: 'antifake',
            bigNumberFontSize: 20,
            bigNumberIndex: [],
            enabled: false,
            fontColor: '#000000',
            fontName: '宋体',
            fontSize: 30,
            height: 0,
            width: 0,
            wordSpace: 0,
            wordSpaceArr: [],
            specialWordSpace: [],
            newLine: 0,
            newLineIndex: [],
            rotate: 0,
            rowSpace: 0,
            index: 9
          }, //防伪码
          logistics: {
            X: 0,
            Y: 0,
            code: '',
            type: 'logistics',
            bigNumberFontSize: 20,
            bigNumberIndex: [],
            enabled: false,
            fontColor: '#000000',
            fontName: '宋体',
            fontSize: 30,
            height: 0,
            width: 0,
            wordSpace: 0,
            wordSpaceArr: [],
            specialWordSpace: [],
            newLine: 0,
            newLineIndex: [],
            rotate: 0,
            rowSpace: 0,
            index: 8
          }, //物流码
          logo: {
            X: 0,
            Y: 0,
            type: 'logo',
            enabled: false,
            height: 50,
            width: 50,
            isColour: false,
            rotate: 0,
            index: 2,
            url: ''
          }, //logo
          qR: {
            X: 0,
            Y: 0,
            type: 'qR',
            barEdition: 0,
            colors: [],
            dPI: 0,
            edgLen: 0,
            enabled: false,
            height: 100,
            width: 100,
            isColour: false,
            isLogistics: true,
            level: 1,
            mask: 0,
            rotate: 0,
            scale: 3,
            index: 1
          }, //二维码
          randomCode: {
            X: 0,
            Y: 0,
            code: 'QLPEYQMPL3',
            type: 'randomCode',
            bigNumberFontSize: 20,
            bigNumberIndex: [],
            enabled: false,
            fontColor: '#000000',
            fontName: '微软雅黑',
            fontSize: 16,
            height: 0,
            width: 0,
            newLine: 0,
            newLineIndex: [],
            specialWordSpace: [],
            rotate: 0,
            rowSpace: 0,
            wordSpace: 0,
            wordSpaceArr: [],
            index: 7
          }, //随机码
          randomImage: {
            X: 0,
            Y: 0,
            type: 'randomImage',
            imageLibraryName: 'png',
            enabled: false,
            height: 70,
            width: 70,
            isColour: true,
            rotate: 0,
            index: 3
          }, //随机图片
          serialNumber: {
            X: 0,
            Y: 0,
            code: 'ZJ0000001',
            type: 'serialNumber',
            bigNumberFontSize: 20,
            bigNumberIndex: [],
            enabled: false,
            fontColor: '#000000',
            fontName: '宋体',
            fontSize: 30,
            height: 0,
            width: 0,
            wordSpace: 0,
            wordSpaceArr: [],
            specialWordSpace: [],
            newLine: 0,
            newLineIndex: [],
            rotate: 0,
            rowSpace: 0,
            index: 7
          }, //序列号
          verification: {
            X: 0,
            Y: 0,
            code: '0147',
            type: 'verification',
            bigNumberFontSize: 20,
            bigNumberIndex: [],
            enabled: false,
            fontColor: '#000000',
            fontName: '宋体',
            fontSize: 30,
            height: 0,
            width: 0,
            wordSpace: 0,
            wordSpaceArr: [],
            specialWordSpace: [],
            newLine: 0,
            newLineIndex: [],
            rotate: 0,
            rowSpace: 0,
            index: 5
          }, //验证码
          interiorCode: {
            X: 0,
            Y: 0,
            code: '',
            type: 'interiorCode',
            bigNumberFontSize: 20,
            bigNumberIndex: [],
            enabled: false,
            fontColor: '#000000',
            fontName: '宋体',
            fontSize: 30,
            height: 0,
            width: 0,
            wordSpace: 0,
            wordSpaceArr: [],
            specialWordSpace: [],
            newLine: 0,
            newLineIndex: [],
            rotate: 0,
            rowSpace: 0,
            contentSourceType: 0, //0-物流码 1-防伪码
            contentStartPosition: 1, //第几位开始
            contentEndPosition: 6, //第几位结束
            index: 6
          }, //内部码
          pointImage: {
            X: 0,
            Y: 0,
            type: 'pointImage',
            enabled: false,
            height: 33,
            width: 101,
            isColour: true,
            rotate: 0,
            index: 4
          }, //点阵图
          height: 500, //画布高度
          width: 620, //画布宽度
          tagBackgroundImageUrl: '', //标签底图
          tagImageUrl: '', //标签嵌套logo
          _id: ''
        };
      }
    },
    created() {
      this.reset();
    },
    mounted() {
      this.canvasInit();
      this.staticImageInit();
      this.dataInit();
    },
    watch: {
      renderData: {
        handler() {
          this.renderCanvas();
        },
        deep: true
      },
      'renderData.tagBackgroundImageUrl'(val) {
        let img = new Image();
        img.src = val;
        img.onload = () => {
          this.renderData.width = img.width > 620 ? 620 : parseInt(img.width);
          this.renderData.height = img.height > 500 ? 500 : parseInt(img.height);
          this.canvasInit();
          this.renderCanvas();
        };
      }
    }
  };
</script>
<style scoped="scoped" lang="less">
  .preview {
    width: 1200px;
    .row {
      margin-bottom: 40px;
      &:first-child {
        height: 220px;
      }
      .block-title {
        font-size: 18px;
        color: #1f2d3d;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .left-block {
        float: left;
        margin-right: 10px;
        width: 500px;
      }
      .batch-information {
        background: #fafbfc;
        padding: 20px 10px;
        li {
          margin-bottom: 15px;
        }
        .batch-information-title {
          display: inline-block;
          width: 70px;
          color: #536173;
          font-size: 14px;
        }
      }
      .right-block {
        float: left;
        width: 650px;
        .preview-contrl {
          width: 650px;
          height: 600px;
          background: #fafbfc;
          padding-top: 20px;
          .preview-contrl-content {
            position: relative;
            width: 620px;
            height: 500px;
            overflow: hidden;
            border: 1px solid #d7dee7;
            margin: auto;
            border-radius: 10px;
            canvas {
              position: absolute;
              top: 0;
              left: 0;
            }
            & > div {
              position: absolute;
              top: 0;
            }
          }
          .preview-clear-btn {
            text-align: center;
            margin-top: 50px;
          }
        }
      }
      .preview-edit {
        position: relative;
        background: #f9fafc;
        min-height: 410px;
        padding-bottom: 10px;
        & > div {
          float: left;
          &.element-nav {
            width: 125px;
            background: #eff2f7;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            ul {
              li {
                font-size: 14px;
                color: #475669;
                padding: 10px 13px;
                cursor: pointer;
                &.active {
                  background: #f9fafc;
                  position: relative;
                  &:after {
                    content: '';
                    width: 3px;
                    background: #3991ee;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                  }
                  &:before {
                    content: '';
                    display: block;
                    border-left: 3px solid #3991ee;
                    border-top: 3px solid transparent;
                    border-bottom: 3px solid transparent;
                    position: absolute;
                    top: 50%;
                    left: 3px;
                    margin-top: -3px;
                  }
                }
                .element-nav-span {
                  margin-left: 10px;
                }
              }
            }
          }
          &.element-edit {
            width: 375px;
            height: 600px;
            overflow: hidden;
            margin-left: 125px;
            padding: 5px 0;
          }
        }
      }
    }
    .save-data {
      text-align: center;
    }
  }
</style>
