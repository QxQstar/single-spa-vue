// 为了让system能够引入这个文件，使用webpack打包成umd格式
export default [
    {
        name:'main-project',
        base:true,
        path:'/',
        main:'http://localhost:9100/app.js'
    },
    {
        name:'customers',
        base:false,
        path:'/customers',
        domID:'main',
        main:'http://localhost:5100/app.js'
    },
    {
        name:'goods',
        base:false,
        path:'/goods',
        domID:'main',
        main:'http://localhost:9010/app.js'
    },
    // {
    //     name:"main-project",
    //     base:true,
    //     path:'/',
    //     main:'http://localhost:8081/app.js'
    // }
]
