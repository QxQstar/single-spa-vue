export default [
    {
        name:'main-project',
        // 需要一直在页面中显示
        base:true,
        path:'/',
        // 项目的入口
        projectIndex:'http://localhost:9050',
        // 项目的入口js文件的路径。
        // 从项目入口html文件中用正则匹配到入口js文件的路径，将得到的路径保存到main字段中
        main:'',
        // 在html文件中的js脚本路径，这里的js脚本路径是过滤掉入口js之后的路径
        scripts:[],
        // 在html文件中用link引入的外部样式
        outerStyles:[],
        // html文件中style标签内嵌样式
        innerStyles:[]
    },
    {
        name:'mis-new',
        base:false,
        path:'/saasfe/mis-new',
        domID:'main',
        projectIndex:'http://127.0.0.1:9060',
        main:'',
        scripts:[],
        outerStyles:[],
        innerStyles:[]
    }
]
