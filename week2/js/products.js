import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
// 產品資料格式
createApp({
  data() {
    return {
      url:'https://vue3-course-api.hexschool.io',
      apiPath:'junapi',
      products:[],
      tempProduct:{},
     }
  },
  methods:{
    checkAdmin(){
      const apiUrl = `${this.url}/v2/api/user/check`;
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
      const apiUrl = `${this.url}/v2/api/${this.apiPath}/admin/products`;
      axios.get(url)
      .then((res)=>{
         this.products = res.data.products;    
      })
      .catch((err)=>{
        alert(err.data.message)
      })
     },
     productDetail(item){
      this.tempProduct = item;
     }
  },
  mounted(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin()
  }
}).mount("#app");