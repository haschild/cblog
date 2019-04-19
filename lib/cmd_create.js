let path = require("path");
let util = require("./utils");
let fes = require("fs-extra");
let moment = require("moment");
module.exports = function (dir) {
    dir = dir || ".";
    fes.mkdirsSync(path.resolve(dir, "page"));
    fes.mkdirsSync(path.resolve(dir, "css"));
    fes.mkdirsSync(path.resolve(dir, "assets"));
    fes.mkdirsSync(path.resolve(dir, "posts"));
    // 复制模板文件
    let tplDir = path.resolve(dir, '../example');
    fes.copySync(tplDir, dir);

    // 创建一篇文章, 我这里用数据代替
    let pageData = [
        'title:战争峡谷',
        'content:草丛三嫖客的故事',
        'date:' + moment().format("YYYY-MM-DD"),
        'layout:template'
    ]
    let name = '战争峡谷.md';
    let file = path.resolve(dir, "posts", name)
    fes.outputFileSync(file, pageData.join("\n")); // 会将字符串信息写入md文件（如果不是字符串类型的会自动转义）

}