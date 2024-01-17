import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let productModal = null;
let delProductModal = null;

// 產品資料格式
createApp({
  data() {
    return {
      apiUrl:'https://vue3-course-api.hexschool.io',
      apiPath:'junapi',
      products:[],
      tempProduct:{
        imagesUrl:[],
      },
      isNew: false,
     }
  },
  methods:{
    checkAdmin(){
      const url = `${this.apiUrl}/v2/api/user/check`;
      axios.post(apiUrl)
      .then(()=>{
        this.getData();
      })
      .catch((err)=>{
        alert(err.data.message)
        window.location = `login.html`;
      })
     },
     getData(){
      const url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/products/all`;
      axios.get(url)
      .then((response)=>{
         this.products = response.data.products;    
      })
      .catch((err)=>{
        alert(err.data.message);
      })
     },
     updateProduct(){
      let url =`${this.apiUrl}/v2/api/${this.apiPath}/admin/product`;
      let http = 'post';

      if(!this.isNew){
        url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http = 'put';
      }

      axios[http](url,{data:this.tempProduct})
      .then((response)=>{
        alert(response.data.message);
        productsModal.hide();
        this.getData();
      })
      .catch((err)=>{
        alert(err.response.data.message);
      })
     },
     openModal(isNew,item){
      if (isNew === 'new'){
        this.tempProduct = {
          imagesUrl:[],
        };
        this.isNew = true;
        productsModal.show();
        }else if(isNew === 'edit'){
          this.tempProduct = {...item};
          this.isNew = false;
          productsModal.show()
        }else if(isNew === 'delete'){
          this.tempProduct = {...item};
          delProductsModal.show()
        }
     },
     delProducts(){
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios.delete(url)
      .then((response)=>{
        alert(response.data.message);
        delProductsModal.hide();
        this.getData();
      })
      .catch((err)=>{
        alert(err.data.message);
      })
     },
     createImage(){
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
     },
  },
  mounted(){
    productsModal = new bootstrap.Modal(document.getElementById('productModal'),{
      Keyboard: false
    });

    delProductsModal = new bootstrap.Modal(document.getElementById('delProductModal'),{
      Keyboard: false
    });
      
    //取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin()
  }
}).mount("#app");