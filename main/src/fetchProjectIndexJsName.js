import processTpl from './process-tpl.js';

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
export default function importHTML(projects) {
    const fetchPromises = [];
    projects.forEach(project => {
        const promise = window.fetch(project.projectIndex)
                            .then(response => response.text())
                            .then(html => {
                                const { entry,scripts } = processTpl(html,getDomain(project.projectIndex));
                                project.main = entry;
                                scripts.forEach(script => {
                                    if(script !== entry) {
                                        project.scripts.push(script)
                                    }
                                });
                                return project;
                            });
        fetchPromises.push(promise);
    })

    return Promise.all(fetchPromises)
}
