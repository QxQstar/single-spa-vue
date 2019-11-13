import appConfig from './app.config.js';
import importHTML from './fetchProjectIndexJsName.js';
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

function bootstrapApp() {
    // 注册应用
    Promise.all([System.import('single-spa')]).then(modules => {
        const singleSpa = modules[0];
        registerApp(singleSpa,appConfig);
        singleSpa.start();
    })
}
function insertScript(path) {
    const scriptDom = document.createElement('script');
    scriptDom.src=path;
    scriptDom.type='module';
    document.body.appendChild(scriptDom);

    return new Promise(function (resolve) {
        if (scriptDom.readyState) {
            scriptDom.onreadystatechange = () => {
                if (scriptDom.readyState === "complete" || scriptDom.readyState === 'loaded') {
                    resolve()
                }
            }
        } else {
            scriptDom.onload = function () {
                resolve()
            }
        }
    })
}
function insertScriptsBootstrap(scriptsPath) {
    return function () {
        return new Promise(function (resolve) {
            const allPromise = [];
            scriptsPath.forEach(path => {
                allPromise.push(insertScript(path))
            });
            Promise.all(allPromise).then(() => {
                resolve();
            })
        })
    }

}
// 注册项目
function registerApp(singleSpa,projects) {

    projects.forEach(function (project) {
        function start(app) {
            // 确保应用挂载点在页面中存在
            if(!app.domID || document.getElementById(app.domID)) {
                singleSpa.registerApplication(app.name,
                    () => {
                        return System.import(app.main).then(resData => {
                            return {
                                bootstrap:[resData.bootstrap,insertScriptsBootstrap(app.scripts)],
                                mount:resData.mount,
                                unmount:resData.unmount
                            }
                        })
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


importHTML(appConfig).then(() => {
    bootstrapApp();
})
