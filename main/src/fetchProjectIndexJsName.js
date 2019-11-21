import processTpl from './process-tpl.js';
function fetch(path) {
    return window.fetch(path)
}
function getDomain(url) {
    try {
        // URL 构造函数不支持使用 // 前缀的 url
        const href = new URL(url.startsWith('//') ? `${location.protocol}${url}` : url);
        return href.origin;
    } catch (e) {
        return '';
    }
}
// 获取各个项目入口js文件的名字
export default function analyzeHTML(projects) {
    return new Promise(function (resolve, reject) {
        const successProjects = [];
        const failProjects = [];
        projects.forEach(project => {
            fetch(project.projectIndex)
                .then(response => response.text())
                .then(html => {
                    const { entry,scripts,innerStyles,outerStyles } = processTpl(html,getDomain(project.projectIndex));
                    project.main = entry;
                    project.innerStyles.push(...innerStyles);
                    project.outerStyles.push(...outerStyles);
                    scripts.forEach(script => {
                        if(script !== entry) {
                            project.scripts.push(script)
                        }
                    });
                    successProjects.push(project);
                },() => {
                    failProjects.push(project);
                    console.error(project.name + ' load error')
                })
                .then(() => {
                    // 所以的promise的状态都改变之后返回结果
                    if(successProjects.length + failProjects.length >= projects.length) {
                        if(successProjects.length >0 ) resolve(successProjects);
                        else reject(failProjects);
                    }
                });
        })
    })
}
