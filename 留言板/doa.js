const mongo = require('mongodb').MongoClient;

/**
// 测试数据库是否连接成功
// const url = 'mongodb://localhost:27017/Ken';
// mongo.connect(url,(err,db)=>{
// 	console.log(db);
// 	console.log('数据库连接成功');
// })
**/

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

class Doa{
	constructor(url,dbName,collectName){
		this.url = url;
		this.dbName = dbName;
		this.collectName = collectName;
	}
	_connect(){
		return new Promise((resolve,reject)=>{
			mongo.connect(this.url,(err,client)=>{
				if(err){
					return reject(err);
				}else{
					resolve(client);
				}
			})
		})
	}
	insert(documents,insertMany){
		return new Promise((resolve,reject)=>{
			this._connect().then(client=>{
				// console.log('数据库连接成功');
				if(insertMany){
					// 插入多条数据
					// insertMany是一个布尔值
					client.db(this.dbName).collection(this.collectName).insertMany(documents).then(res=>{
						resolve(res);
						client.close();
					}).catch(e=>{
						throw new Error(e);
					})

					return;
				}else{
					// 插入单条数据
					client.db(this.dbName).collection(this.collectName).insertOne(documents).then(res=>{
						resolve(res);
						client.close();
					}).catch(e=>{
						throw new Error(e);
					})
				}
			})
		})
	}
	query(documents={},pageConfig={count:0,page:0}){
		return new Promise((resolve,reject)=>{
			this._connect().then(client=>{
				let arr = [];
				// 查询文档
				let cursor = client.db(this.dbName)
								   .collection(this.collectName)
								   .find(documents)
								   .limit(pageConfig.count)
								   .skip((pageConfig.page-1) * pageConfig.count);
				// console.log(cursor);
				// each查询每一条数据
				cursor.each((err,data)=>{
					// console.log(data);
					if(err){
						// 如果存在错误
						// 直接放回
						reject(err);
					}
					// data最后一条数据为null
					// 以此判断依据
					if(data!==null){
						// 将每一条数据放入数组中
						arr.push(data);
					}else{
						// 当data为null时把数据返回出去
						// 并且关闭数据库
						resolve(arr);
						client.close();
					}
					
				})
				
				// resolve(cursor);
			}).catch(e=>{
				reject(e);
			})
		})
	}
	del(query,deleteMany){
		// 步骤跟insert()函数相似
		return new Promise((resolve,reject)=>{
			this._connect().then(client=>{
				if(deleteMany){
					client.db(this.dbName)
						  .collection(collectName)
						  .deleteMany(query)
						  .then(res=>{
							  resolve(res);
							  client.close();	
						  }).catch(e=>{
							reject(e);
						  })
				}else{
					client.db(this.dbName)
						  .collection(collectName)
						  .deleteOne(query)
						  .then(res=>{
							  resolve(res);
							  client.close();	
						  }).catch(e=>{
							reject(e);
						  })
				}
			}).catch(e=>{
				reject(e);
			})
		})
	}
	update(filter,updater){
		return new Promise((resolve,reject)=>{
			this._connect().then(client=>{
				let updaterCopy = {$set:updater};
				client.db(this.dbName)
					  .collection(this.collectName)
					  .updateMany(filter,updaterCopy)
					  .then(res=>{
					  	resolve(res);
					  	client.close();
					  }).catch(e=>{
					  	reject(e);
					  });
			}).catch(e=>{
				reject(e);
			})
		})
	}

}
const url = `mongodb://localhost:27017/Ken`;
const collectName = 'Ken';
const dbName = 'Ken';
let doa = new Doa(url,dbName,collectName);

/**
测试数据库的连接
// doa._connect().then(db=>{
// 	console.log(db);
// 	console.log('数据库连接成功');
// }).catch(e=>{
// 	throw new Error(e);
// })
**/


// 此时数据库连接以及插入功能
/**
// 插入多条
let arr = [];
for(let i=0;i<10;i++){
	arr.push({
		userId:'123',
		age: i
	})
}
doa.insert(arr,true).then(res=>{
	console.log(res);
}).catch(e=>{
	throw new Error(e);
});
 */


/**
// 插入单条数据
let one = {'name':'Ken',"age":20};
doa.insert(one,false).then(res=>{
	console.log(res);
}).catch(e=>{
	throw new Error(e);
});
 */

/**
// 查询字段
doa.query({userId:'123'}).then(res=>{
	console.log(res);
}).catch(e=>{
	throw new Error(e);
});
 */


/**
// 删除字段
// 删除一条数据
doa.del({userId:'123'}).then(res=>{
	console.log(res);
}).catch(e=>{
	throw new Error(e);
})

// 删除字段
// 删除多条数据
doa.del({userId:'123'},true).then(res=>{
	console.log(res);
}).catch(e=>{
	throw new Error(e);
})
 */


/**
// 更新字段
doa.update({'name':'Ken',"age":20},{'name':'Ken',"age":20,"address":"中山","sex":"boy"}).then(res=>{
	console.log(res);
}).catch(e=>{
	throw new Error(e);
})
 */

// 暴露接口
module.exports=Doa;