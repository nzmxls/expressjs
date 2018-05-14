//import express from 'express';
var express = require('express')
var path = require('path');
//var cookieparser = require('cookie-parser')
var app = express()
var bodyparser = require('body-parser')

var multer = require('multer')
var upload = multer();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload.array()); 
app.use(express.static('public'));
//app.get('/', (req, res) => res.send(' Home <a href="/user/">User</a>!'))

app.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname + '/template/base.html'));
    res.render(__dirname+"/template/frm.pug")
});

app.post('/new',function(req,res){
    console.log(req.body)
    res.render(path.join(__dirname+'/template/abc.pug'),{name:req.body.name,age:req.body.age})
    
})



app.post('/post', function(req,res){
    console.log()
})



app.get('/user/', (req, res) => 
res.render(path.join(__dirname+'/template/abc.pug'),{name:'ajay',age:'34'})
)




app.get('/about', (req, res) => res.send('About us Page <a href="/">Home</a>!'))

app.get('/users/:usr/:sirname',
    (req,res)=>
    res.send("this is on " + req.params.usr+" "+req.params.sirname)
)





app.listen(3000,()=>console.log("on 3000")) 

app