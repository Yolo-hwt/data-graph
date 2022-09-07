module.exports = {
    pages: {
        index: {
            //入口
            entry: 'src/main.js',
        },
    },
    lintOnSave: false, //关闭语法检查
    //开启代理服务器（方式一）
    /* devServer: {
      proxy: 'http://localhost:5000'
    }, */
    //开启代理服务器（方式二）
    devServer: {
        proxy: {
            '/demo': {
                target: 'http://10.138.68.200/dangshi',
                pathRewrite: { '^/demo': '' },
            }
        }
    }
}