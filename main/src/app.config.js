export default [
    {
        name:'main-project',
        // 需要一直在页面中显示
        base:true,
        path:'/',
        // 项目的入口
        projectIndex:process.env.mode === 'prod' ? 'http://mainproject.heyudesign.cn' : 'http://localhost:9100',
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
        name:'customers',
        base:false,
        path:'/customers',
        domID:'main',
        projectIndex:process.env.mode === 'prod'?'http://customers.heyudesign.cn':'http://localhost:5100',
        main:'',
        scripts:[],
        outerStyles:[],
        innerStyles:[]
    },
    {
        name:'goods',
        base:false,
        path:'/goods',
        domID:'main',
        projectIndex:process.env.mode === 'prod'? 'http://goods.heyudesign.cn' : 'http://localhost:9010',
        main:'',
        scripts:[],
        outerStyles:[],
        innerStyles:[]
    }
]
