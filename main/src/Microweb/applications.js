import {registerApplication, start} from 'single-spa'
import {loadSourceBootstrap} from "./loadSource.js";
export function bootstrapApp(apps) {
    registerApp(apps);
    start();
}

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
function registerApp(projects) {
    projects.forEach(function (project) {
        function startRegister(app) {
            // 确保应用挂载点在页面中存在
            if(!app.domID || document.getElementById(app.domID)) {
                registerApplication(app.name,
                    () => {
                        return System.import(app.main).then(resData => {
                            return {
                                bootstrap:[ resData.bootstrap,
                                    loadSourceBootstrap(app.scripts,'script'),
                                    loadSourceBootstrap(app.outerStyles,'link') ],
                                mount:resData.mount,
                                unmount:resData.unmount
                            }
                        })
                    },
                    project.base ? (function () { return true }) : activeFns(project))
            } else {
                setTimeout(function () {
                    startRegister(app);
                },50)
            }
        }

        startRegister(project);
    })
}
