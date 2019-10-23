// import activeFns from './activityFns.js';
function isActive(location,page) {
    const hash = location.hash.slice(2),
        hashArr = hash.split('/');

    return hashArr[0] === page;
}
const activeFns = {
    goods(location) {
        return isActive(location,'goods')
    },
    customer() {
        return isActive(location,'customers')
    },
    main() {
        return true;
    }
}

function registerSub (singleSpa) {
    // 确保主项目已经装载才注册子项目
    if(document && document.getElementById('main')) {
        // 商品管理
        singleSpa.registerApplication('customers',() => System.import('customers'),activeFns.customer);
        // 商品管理
        singleSpa.registerApplication('goods',() => System.import('goods'),activeFns.goods);
    } else {
        setTimeout(function () {
            registerSub(singleSpa);
        },50)
    }

}
// 注册应用
Promise.all([System.import('single-spa'),System.import('vue')]).then(modules => {
    const singleSpa = modules[0];
    // 主项目要一直显示
    singleSpa.registerApplication('main-project',() => System.import('main-project'),activeFns.main)
    // 注册子项目
    registerSub(singleSpa);
    singleSpa.start();
})


