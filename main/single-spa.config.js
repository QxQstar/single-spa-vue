function isActive(location,page) {
    let isShow = false;
    if(location.hash.startsWith(`#${page}`)){
        isShow = true
    }
    return isShow;
}
function activeFns(app) {
    return function (location) {
        return isActive(location,app.path)
    }
}

function bootstrap() {
    // 注册应用
    Promise.all([System.import('single-spa'),System.import('./appConf/index.js')]).then(modules => {
        const singleSpa = modules[0];
        registerApp(singleSpa,modules[1]);
        singleSpa.start();
    })
}
function genSandbox(appName) {

    return {
        sandbox:{},
        sandboxMount(){
            return Promise.resolve();
        },
        sandboxUnmount(){
            return Promise.resolve()
        }
    }
}
function genAppLoadPromise(appPromise,appName) {
    return appPromise.then((app) => {
                const Sandbox = genSandbox(appName);
                console.log(Sandbox,'ssss')
                return {
                    bootstrap:[app.bootstrap],
                    mount:[app.mount,Sandbox.sandboxUnmount],
                    unmount:[app.unmount,Sandbox.sandboxUnmount]
                };
            })
}
// 注册项目
function registerApp(singleSpa,projects) {
    projects.forEach(function (project) {
        function start(app) {
            // 确保应用挂载点在页面中存在
            if(!app.domID || document.getElementById(app.domID)) {
                singleSpa.registerApplication(project.name,
                    () => {
                        const data = System.import(project.main);
                        // 只要data是一个promise并且promise resolve的值是一个对象，对象必须包含bootstrap，mount，unmount

                        // bootstrap，mount，unmount是函数，并且函数返回promise
                        return genAppLoadPromise(data,project.name)
                    },
                    project.base ? (function () { return true }) : activeFns(project))
            } else {
                setTimeout(function () {
                    start(app);
                },50)
            }
        }

        start(project);
    })
}


bootstrap()
