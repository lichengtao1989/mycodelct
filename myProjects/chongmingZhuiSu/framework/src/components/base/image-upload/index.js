import ImgUpload from './src/image-upload';

ImgUpload.install = function (Vue) {
  Vue.component(ImgUpload.name, ImgUpload);
};

export default ImgUpload;
