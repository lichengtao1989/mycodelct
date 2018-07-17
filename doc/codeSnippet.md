下拉使用方式：
<nz-select v-model="item.productName">
    <nz-option v-for="(item,index) in infoVal" :key="index" :label="item.ProductName" :value="item.PesticideId"></nz-option>
</nz-select>