import{r as e}from"./request-24c768a8.js";const o=(t,n)=>e("/login/password","post",{mobile:t,password:n}),a=(t,n)=>e("code","get",{mobile:t,type:n}),r=(t,n)=>e("/login","post",{mobile:t,code:n}),i=()=>e("/patient/myUser"),d=()=>e("/patient/mylist"),p=t=>e("/patient/add","post",t),c=t=>{e("/patient/update","put",t)},u=t=>e(`/patient/del/${t}`,"delete");export{o as a,p as b,i as c,u as d,c as e,d as g,r as l,a as s};