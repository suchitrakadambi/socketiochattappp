/**
 * Created by skadambi on 7/8/16.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//app.get('/',function(req,res){
//    res.send(" <h1> Hello World </h1>");
//});

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
    //res.sendFile('public/index1.html' , { root : __dirname});
});

io.on('connection' ,function(socket){
    console.log('a user connected');
    socket.on('chatmessage' ,function(msg){
        console.log("the message received is" +" " +  msg);
        io.emit('chatmessage',msg);
    });
    socket.on('disconnect',function(msg){
       console.log('user disconnected');
        io.emit('disconnect',msg);
    });
});



http.listen(3000,function(){
   console.log('listening on * :3000');
});
