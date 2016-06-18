var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views',path.join(__dirname,'views'));//views에 쓰이는 걸 views폴더에서 찾는다.
app.set('view engine', 'jade');//view engine으로 jade를 쓴다.


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));//올.

app.get('/',function(req,res){
    res.render('index', {title: 'Welcome'});
});
app.get('/about',function(req,res){
    res.render('about');
});
app.get('/contact',function(req,res){
   res.render('contact'); 
});

app.post('/contact/send',function(req,res){
   var transporter = nodemailer.createTransport({
       service: 'Gmail',
       auth: {
           user: 'minhotauros@gmail.com',
           pass: 'wlgns745896'
       }
   });

   var mailOptions = {
       from: req.body.name+ '<' + req.body.email + '>',
       to: 'withjy12@gmail.com',
       subject: '고객문의 메일',
       html: '<h1>"모든 고객에게 정성을 다 할 것"</h1> <ul><li>Name: '+req.body.name +'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li><ul>'
       //text: 'You have a submission with the following details. Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
       //html: '<p>You have a submission with the following details. </p><ul<li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+ '</li><li>Message: '+req.body.message+'</li>'
   };

   transporter.sendMail(mailOptions,function(error, info){
       if(error){
           console.log(error);
           res.redirect('/');

       }else {
           console.log('Message Sent: '+ info.response);
           res.redirect('/');
           
       }
   });
});
app.listen(3000);
console.log('Server is running on port 3000\n');
