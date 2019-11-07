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
function isConstructable(fn) {
    var constructableFunctionRegex = /^function\b\s[A-Z].*/;
    var classRegex = /^class\b/; // 有 prototype 并且 prototype 上有定义一系列非 constructor 属性，则可以认为是一个构造函数

    return fn.prototype && Object.getOwnPropertyNames(fn.prototype).filter(function (k) {
        return k !== 'constructor';
    }).length || constructableFunctionRegex.test(fn.toString()) || classRegex.test(fn.toString());
}
function genSandbox(appName) {
    // 沙箱期间新增的全局变量
    var addedPropsMapInSandbox = new Map(); // 沙箱期间更新的全局变量

    var modifiedPropsOriginalValueMapInSandbox = new Map(); // 持续记录更新的(新增和修改的)全局变量的 map，用于在任意时刻做 snapshot

    var currentUpdatedPropsValueMapForSnapshot = new Map();
    var freers = [];
    var sideEffectsRebuilders = []; // render 沙箱的上下文快照

    var renderSandboxSnapshot = null;
    var inAppSandbox = true;
    var boundValueSymbol = Symbol('bound value');
    const sandbox = new Proxy(window,{
        set: function set(target, p, value) {
            if (inAppSandbox) {
                if (!target.hasOwnProperty(p)) {
                    addedPropsMapInSandbox.set(p, value);
                } else if (!modifiedPropsOriginalValueMapInSandbox.has(p)) {
                    // 如果当前 window 对象存在该属性，且 record map 中未记录过，则记录该属性初始值
                    var originalValue = target[p];
                    modifiedPropsOriginalValueMapInSandbox.set(p, originalValue);
                }

                currentUpdatedPropsValueMapForSnapshot.set(p, value); // 必须重新设置 window 对象保证下次 get 时能拿到已更新的数据
                // eslint-disable-next-line no-param-reassign

                target[p] = value;
                return true;
            }

            return false;
        },
        get: function get(target, p) {
            console.log('fdfdfd',p)
            var value = target[p];
            /*
            仅绑定 !isConstructable && isCallable 的函数对象，如 window.console、window.atob 这类。目前没有完美的检测方式，这里通过 prototype 中是否还有可枚举的拓展方法的方式来判断
            @warning 这里不要随意替换成别的判断方式，因为可能触发一些 edge case（比如在 lodash.isFunction 在 iframe 上下文中可能由于调用了 top window 对象触发的安全异常）
             */

            if (typeof value === 'function' && !isConstructable(value)) {
                if (value[boundValueSymbol]) {
                    return value[boundValueSymbol];
                }

                var boundValue = value.bind(target); // some callable function has custom fields, we need to copy the enumerable props to boundValue. such as moment function.

                Object.keys(value).forEach(function (key) {
                    return boundValue[key] = value[key];
                });
                Object.defineProperty(value, boundValueSymbol, {
                    enumerable: false,
                    value: boundValue
                });
                return boundValue;
            }

            return value;
        }
    });
    return {
        sandbox:sandbox,
        sandboxMount(){
            return Promise.resolve();
        },
        sandboxUnmount(){
            return Promise.resolve()
        }
    }
}
function genAppLoadPromise(appPromise,Sandbox) {
    return appPromise.then((app) => {
                app.jsSandbox && app.jsSandbox(Sandbox.sandbox);
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
                        const Sandbox = genSandbox(project.name);
                        // 只要data是一个promise并且promise resolve的值是一个对象，对象必须包含bootstrap，mount，unmount

                        // bootstrap，mount，unmount是函数，并且函数返回promise
                        return genAppLoadPromise(data,Sandbox)
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
