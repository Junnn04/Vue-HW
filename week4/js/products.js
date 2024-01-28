import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

const app = createApp({
  data() {
    return {
      apiUrl: 'https://ec-course-api.hexschool.io/v2',
      apiPath: 'junapi',
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
      isNew: false,
    }
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message)
          window.location = 'login.html';
        })
    },
    getData(page=1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
      axios.get(url)
        .then((response) => {
          const {products,pagination} = response.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          alert(err.data.message);
          window.location='login.html';
        })
    },
    openModal(isNew,item){
      if(isNew === 'new'){
        this.tempProduct = {
          imagesUrl:[],
        };
        this.isNew = true;
        productModal.show();
      }else if (isNew === 'edit'){
        this.tempProduct = {...item};
        this.isNew = false;
        productModal.show();
      }else if (isNew === 'delete'){
        this.tempProduct = {...item};
        delProductModal.show();
      }
    }
  }
});

//分頁元件
app.component('pagination',{
  template: '#pagination',
  props:['pages'],
  methods:{
    emitPages(item){
      this.$emit('emit-page',item);
    },
  },
});

//產品編輯元件
app.component('productModal',{
  template:'#productModal',
  props:['product','isNew'],
  data(){
    return{
      apiUrl:'https://ec-course-api.hexschool.io/v2',
      apiPath:'junapi',
    };
  },
  mounted(){
    productModal = new bootstrap.Modal(document.getElementById('productModal'),{
      keyboard:false,
      backdrop:'static'
    });
  },
  methods:{
    updateProduct(){
      //新增產品
      let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let httpMethod = 'post';
      //切換成編輯商品api
      if(!this.isNew){
        api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.product.id}`;
        httpMethod = 'put';
      }
    axios[httpMethod](api,{data: this.product})
    .then((response)=>{
      alert(response.data.message);
     this.hideModal();
     this.$emit('update');
    })
    .catch((err)=>{
      alert(err.data.message);
    });
    },
    createImages(){
      this.product.imagesUrl=[];
      this.product.imagesUrl.push('');
    },
    openModal(){
      productModal.show();
    },
    hideModal(){
      productModal.hide();
    },
  },
})

//刪除產品元件
app.component('delProductModal',{
  template:'#delProductModal',
  prop:['item'],
  data(){
    return{
      apiUrl:'https://ec-course-api.hexschool.io/v2',
      apiPath:'junapi',
    };
  },
  mounted(){
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'),{
      keyboard: false,
      backdrop:'static',
    });
  },
  methods:{
    delProduct(){
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.item.id}`)
      .then((response) => {
        this.hideModal();
        this.$emit('update');
      })
      .catch((err)=>{
        alert(err.data.message);
      });
    },
    openModal(){
      delProductModal.show();
    },
    hideModal(){
      delProductModal.hide();
    },
  },
});

app.mount('#app');