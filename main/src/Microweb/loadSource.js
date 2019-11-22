function createScript(path) {
    const scriptDom = document.createElement('script');
    scriptDom.src=path;
    scriptDom.type='module';
    document.body.appendChild(scriptDom);

    return scriptDom;
}
function createLink(path) {
    const linkDom = document.createElement('link');
    linkDom.href=path;
    linkDom.rel='stylesheet';
    document.head.appendChild(linkDom);

    return linkDom;
}
function load(path,type) {
    const dom = type === 'script' ? createScript(path) : createLink(path);
    return new Promise(function (resolve) {
        if (dom.readyState) {
            dom.onreadystatechange = () => {
                if (dom.readyState === "complete" || dom.readyState === 'loaded') {
                    resolve()
                }
            }
        } else {
            dom.onload = function () {
                resolve()
            }
        }
    })
}
// 将外部js脚本/css样式插入到html中
export function loadSourceBootstrap(scriptsPath,type='script') {
    return function () {
        return new Promise(function (resolve) {
            const allPromise = [];
            scriptsPath.forEach(path => {
                allPromise.push(load(path,type))
            });
            Promise.all(allPromise).then(() => {
                resolve();
            })
        })
    }

}

