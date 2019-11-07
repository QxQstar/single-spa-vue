const path = require("path");
module.exports = {
    entry:{
        index:'./app.config.js',
    },
    mode:"development",
    output:{
        path:path.resolve(__dirname,'./appConf'),
        filename:'index.js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: '',
    }
};
