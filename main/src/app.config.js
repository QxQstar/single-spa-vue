export default [
    {
        name:'main-project',
        // 需要一直在页面中显示
        base:true,
        customProps:{},
        // 项目的入口
        projectIndex:process.env.mode === 'prod' ? 'http://mainproject.heyudesign.cn' : 'http://localhost:9100'
    },
    {
        name:'customers',
        base:false,
        path:['#/customers'],
        domID:'main',
        projectIndex:process.env.mode === 'prod'?'http://customers.heyudesign.cn':'http://localhost:5100'
    },
    {
        name:'goods',
        base:false,
        path:'#/goods',
        domID:'main',
        projectIndex:process.env.mode === 'prod'? 'http://goods.heyudesign.cn' : 'http://localhost:9010'
    }
]
