import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data(){
    return{
       user:{
        user:'',
        password:'',
       },
    }
  },
  methods:{
    login(){
      const url = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(url,this.user)
      .then((res)=>{
        const {token,expired} = res.data;
        //寫入cookie
        document.cookie = `hextoken=${token};expired=${new Data(expired)}`;
        window.location = 'products.html';
      })
       .catch((err)=>{
        alert(err.res.data.message)
       });
    },
    
  },
}).mount("#app");