#封装一个mongodb的doa集合
需要安装的依赖包如下


npm install mongodb   
文档连接  https://github.com/KenNaNa/node-mongodb-native


npm install mongoose  
文档链接  https://github.com/KenNaNa/mongoose


npm install express   
文档链接  https://www.npmjs.com/package/express


npm install formidable  
文档链接 https://www.npmjs.com/package/formidable


npm install mongo


doa.js
/**
 * 封装一个类
 * @url 数据库链接地址
 * @collectionName 集合的名称
 *
 * _connect()函数用于查询链接数据库的
 * 	返回一个promise对象
 *
 * insert(document,insertMany)函数用于插入文档
 *
 * query(document)查询文档
 *
 * del(query,deleteMany)删除文档
 *
 * update(filter,updater)更新文档
 */


app.js
//实现留言板
其中有两个接口
一个是页面初始化接口   /init
另一个接口是添加留言接口   /add


视频教程  https://www.bilibili.com/video/av13941591/?p=7



留言界面的效果图
https://github.com/KenNaNa/mongoose/blob/master/%E7%95%99%E8%A8%80%E6%9D%BF/%E7%95%99%E8%A8%80.png



formidable是一个用于解析form表单数据，尤其是表单数据上传时的Node.js模块

下面来一个表单上传的例子
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
 
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    // 解析一个文件上传
    var form = new formidable.IncomingForm();
 
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
 
    return;
  }
 
  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);

API如下
创建一个form表单
var form = new formidable.IncomingForm();

设置表单域的编码方式
form.encoding = 'utf-8';

设置上传的文件保存路径
form.uploadDir = "/my/dir";

如果要将写入的文件form.uploadDir包含原始文件的扩展名，请将此属性设置为true
form.keepExtensions = false;


解析request包含表单数据的传入node.js。如果cb提供，则收集所有字段和文件并将其传递给回调
form.parse （ req ，function （err ，fields ，files ） {    
  //  ...
} ） ;
