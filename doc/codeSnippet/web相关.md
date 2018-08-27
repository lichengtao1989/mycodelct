##promise 和async await 
    validateForm() {
      return new Promise(resolve => {
        this.$refs.form
          .validate()
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      });
    },
      async submit(callback) {
      const valid = await this.validateForm();
      if (valid) {
        try {
          await this.$refs.recordEdit.submit();
          this.visible = false;
          this.$emit('save-success');
        } catch (err) {}
      }
      callback();
    },

##vue中解决object中属性改变试图不改变的方法
 1.方案一：利用Vue.set(object,key,val)
 例：Vue.set(vm.obj,'k1','v1')
 2方案二：利用this.$set(this.obj,key,val)
 例：this.$set(this.obj,'k1','v1')
 3方案三：利用Object.assign({}，this.obj)创建新对象
 例：  
this.obj.k1='v1'；
this.obj = Object.assign({}, this.obj)
或
this.obj = Object.assign({}, this.obj,{'k1','v1'})
