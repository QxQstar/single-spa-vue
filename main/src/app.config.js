// 为了让system能够引入这个文件，使用webpack打包成umd格式
export default [
    {
        name:'main-project',
        base:true,
        path:'/',
        // 项目的入口
        projectIndex:'http://localhost:9100',
        // 项目的入口js文件的路径。
        // 从项目入口html文件中用正则匹配到入口js文件的路径，将得到的路径保存到main字段中
        main:'',
        // 在html文件中的js脚本路径，这里的js脚本路径是过滤掉入口js之后的路径
        scripts:[]
    },
    {
        name:'customers',
        base:false,
        path:'/customers',
        domID:'main',
        projectIndex:'http://localhost:5100',
        main:'',
        scripts:[]
    },
    {
        name:'goods',
        base:false,
        path:'/goods',
        domID:'main',
        projectIndex:'http://localhost:9010',
        main:'',
        scripts:[]
    }
]
