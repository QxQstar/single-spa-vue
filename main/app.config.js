// 为了让system能够引入这个文件，使用webpack打包成umd格式
export default [
    {
        name:"main-project",
        base:true,
        path:'/',
        main:'http://localhost:8080/app.js'
    },
    {
        name:'mis-new',
        base:false,
        path:'/saasfe/mis-new',
        domID:'main',
        main:'http://127.0.0.1:8081/mis-vue/app.js'
    },
    {
        name:'goods',
        base:false,
        path:'/goods',
        domID:'main',
        main:'http://localhost:9010/app.js'
    }
]
