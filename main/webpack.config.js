const path = require("path");
module.exports = {
    entry:{
        index:'./app.config.js',
    },
    mode:"development",
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'app.config.js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: '',
    }
};
