const express = require('express');
const mongodb = require('mongodb');
const formidable = require('formidable');
const mongo = require('mongo');
const Doa = require('./doa');

const server = express();
const url = `mongodb://localhost:27017/note`;
const collectName = 'note';
const dbName = 'note';
let doa = new Doa(url,dbName,collectName);
server.use(express.static('./public'));

server.post('/add',function(req,res){
	let form = new formidable.IncomingForm();
	form.parse(req,(err,fields,files)=>{
		let obj = {
			name: fields.name,
			text: fields.text,
			time: new Date()
		};
		// console.log(fields)
		doa.insert(obj).then(result=>{
			res.send(obj);
		});
	})
})

server.post('/init',function(req,res){
	doa.query().then(result=>{
		res.send(result);
	})
})
server.listen(8080,function(){
	console.log('this service is running in port 8080');
})