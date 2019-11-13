// 为了让system能够引入这个文件，使用webpack打包成umd格式
export default [
    {
        name:'main-project',
        base:true,
        path:'/',
        // 项目的入口
        projectIndex:'http://localhost:8082',
        // 项目的入口js文件的路径。
        // 从项目入口html文件中用正则匹配到入口js文件的路径，将得到的路径保存到main字段中
        main:''
    },
    {
        name:'mis-new',
        base:false,
        path:'/saasfe/mis-new',
        domID:'main',
        projectIndex:'http://127.0.0.1:8081',
        main:''
    }
]
