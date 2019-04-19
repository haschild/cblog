let path = require("path");
let util = require("./utils.js");
let fse = require("fs-extra");
module.exports = function (dir, option) {
    dir = dir || ".";
    let outputDir = path.resolve(option.output || dir)
    // 生成文件的内容
    let sourceDir = path.resolve(dir, "posts");
    // 写入文件
    function outputFile(file, content) {
        console.log("generator %s", file.slice(outputDir.length + 1));
        fse.outputFileSync(file, content);
    }
    // 渲染单个文章
    util.eachSourceFile(sourceDir, function (f, s) {
        // let file = path.resolve(dir, "page", 'template' + ".html")
        let html = util.renderPost(dir, f);
        let relativeFile = util.stripExtname(f.slice(sourceDir.length + 1)) + ".html"
        let file = path.resolve(outputDir, "posts", relativeFile);
        outputFile(file, html);
    });
    // 渲染文章列表
    var htmlIndex = util.renderIndex(dir);
    var fileIndex = path.resolve(outputDir, "index.html");
    outputFile(fileIndex, htmlIndex);
}