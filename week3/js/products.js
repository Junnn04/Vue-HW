import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

//需在全域環境宣告
let productModal = null;
let delProductModal = null;

// 產品資料格式
createApp({
  data() {
    return {
      apiUrl:'https://ec-course-api.hexschool.io',
      apiPath:'junapi',
      products:[],
      tempProduct:{
        imagesUrl:[],
      },
      //表示當前的modal是新增or編輯
      isNew: false,
     }
  },
  methods:{
    //驗證登入
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
     //取得DATA
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
     //編輯產品
     updateProduct(){
      let url =`${this.apiUrl}/v2/api/${this.apiPath}/admin/product`;
      let http = 'post';
     //判斷當前isNew是新增or編輯
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
      //判斷為新增時
      if (isNew === 'new'){
        //清空當前tempProduct值
        this.tempProduct = {
          imagesUrl:[],
        };
        //變更isNew值
        this.isNew = true;
        productsModal.show();
        }
        //判斷為編輯時
        else if(isNew === 'edit'){
          //將當前資料傳入tempProduct值
          this.tempProduct = {...item};
          this.isNew = false;
          productsModal.show()
        }
        //判斷為刪除時
        else if(isNew === 'delete'){
          //將當前資料傳入tempProduct值，為了取得id
          this.tempProduct = {...item};
          //開起delProductsModal
          delProductsModal.show()
        }
     },
     delProducts(){
      //this.tempProduct.id取得產品id刪除資料
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios.delete(url)
      .then((response)=>{
        alert(response.data.message);
        //刪除後，須關閉Modal,並更新資料
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
    //建立modal,第一個參數為DOM元素，第二個參數為禁止使用ESC鍵關閉視窗
    //backdrop:'static'則是禁止點擊modal以外地方關閉視窗，避免輸入資料遺失
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