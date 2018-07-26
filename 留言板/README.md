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
