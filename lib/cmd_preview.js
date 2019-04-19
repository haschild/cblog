let express = require("express");
let open = require("open")
let serveStatic = require('serve-static')
let path = require("path");
let fs = require("fs");
let swig = require("swig");
swig.setDefaults({ cache: false })
let markdownIt = require("markdown-it");
let md = new markdownIt({
    html: true,
    langPrefix: 'code-',
})
let rd = require("rd");
let util = require("./utils.js")

module.exports = function (dir) {
    dir = dir || ".";  // 当前路径
    // 初始化express
    let app = express();
    let router = express.Router();
    app.use("./assets", serveStatic(path.resolve(dir, "assets")));
    app.use(router);

    // 渲染文章
    router.get("/posts/*", function (req, res, next) {
        let name = util.stripExtname(req.params[0]);
        let file = path.resolve(dir, "posts", name + ".md")
        let html = util.renderPost(dir, file)
        res.end(html)


    })
    // render list
    router.get("/", function (req, res, next) {
        let html = util.renderIndex(dir)
        res.end(html)
    })

    let config = util.loadConfig(dir);
    let port = config.port || 3000;
    let url = 'http://127.0.0.1:' + port;
    app.listen(port)
    open(url)









}