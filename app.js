//import express from 'express';
var express = require('express')
var path = require('path');
//var cookieparser = require('cookie-parser')
var app = express()
var bodyparser = require('body-parser')

var multer = require('multer')
var upload = multer();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('C:/Users/alimx/Desktop/expressjs/sql.db')


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
    const query=`insert into student(roll_no,name) values(${req.body.rollno},"${req.body.name}")`
    //res.render(path.join(__dirname+'/template/abc.pug'),{name:req.body.name,age:req.body.age})
    //var stmt = db.prepare('insert into Student values(??)')
    //stmt.run(req.body.rollno,req.body.name)
    db.run(query)
    //stmt.run
    //console.log(stmt)
    //res.send("success")
    query="select * from Student"
    var r =[]
    var n =[]
    db.each(query,function(err,row){
        r.push(row.rollno)
        n.push(row.name)
        //console.log(row.rollno,row.name)
    })
    res.render(path.join(__dirname+'/template/abc.pug'),{name:n,roll:r})
    //res.send('successf')
})

app.get('/data',function(req,res){
    query="select * from Student"
    var r =[]
    var n =[]
    db.each(query,function(err,row){
        r.push(row.rollno)
        n.push(row.name)
        console.log(row.roll_no+' : '+row.name)
    })
    //res.render(path.join(__dirname+'/template/abc.pug'),{name:n,roll:r})
    res.send('successf')
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