import{a as c}from"./axios-L6U4YIEh.js";import{_ as u,c as m,a as s,g as p,h as l,v as d,F as _,o as h}from"./index-qgoE3cgc.js";var f={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"junapi",BASE_URL:"/undefined/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:w}=f,g={data(){return{user:{username:"",password:""}}},methods:{login(){const n=`${w}/admin/signin`;c.post(n,this.user).then(e=>{const{token:r,expired:a}=e.data;document.cookie=`hexToken=${r};expires=${new Date(a)}; path=/`,this.$router.push("/admin/products")}).catch(e=>{alert(e.data.message),this.$router.push("/login")})}}},v=s("h2",null,"登入",-1),b={class:"container"},x={class:"row justify-content-center"},E=s("h1",{class:"h3 mb-3 font-weight-normal"}," 請先登入 ",-1),V={class:"col-8"},T={class:"form-floating mb-3"},k=s("label",{for:"username"},"Email address",-1),y={class:"form-floating"},D=s("label",{for:"password"},"Password",-1),R=s("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1),U=s("p",{class:"mt-5 mb-3 text-muted"}," © 2021~∞ - 六角學院 ",-1);function B(n,e,r,a,t,i){return h(),m(_,null,[v,s("div",b,[s("div",x,[E,s("div",V,[s("form",{id:"form",class:"form-signin",onSubmit:e[2]||(e[2]=p((...o)=>i.login&&i.login(...o),["prevent"]))},[s("div",T,[l(s("input",{type:"email",class:"form-control",id:"username","onUpdate:modelValue":e[0]||(e[0]=o=>t.user.username=o),placeholder:"name@example.com",required:"",autofocus:""},null,512),[[d,t.user.username]]),k]),s("div",y,[l(s("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":e[1]||(e[1]=o=>t.user.password=o),placeholder:"Password",required:""},null,512),[[d,t.user.password]]),D]),R],32)])]),U])],64)}const S=u(g,[["render",B]]);export{S as default};
