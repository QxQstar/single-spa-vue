import processTpl from './processTpl.js';
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
export default function analyzeHTML(projects) {
    return new Promise(function (resolve, reject) {
        const successProjects = [];
        const failProjects = [];
        projects.forEach(project => {
            fetch(project.projectIndex)
                .then(response => response.text())
                .then(html => {
                    // 从html文件中匹配出这个项目的css，js路径
                    const { entry,scripts,innerStyles,outerStyles } = processTpl(html,getDomain(project.projectIndex));
                    // 入口js路径
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
