var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.use('/upload', function (req, res, next) {
    // uses the upload library

    res.render('index', {title: 'upload'});

});

router.use('/getfile/:fileid/', function (req, res, next) {
    // uses the upload library
    // should use basic HTTP AUTH

    res.render('index', {title: 'getfile'});

});


var nodemailer = require('nodemailer');
router.use('/sendmail/', function (req, res, next) {
    // uses the upload library
    // bodyParams - subject, content, to

    var smtpTransport = nodemailer.createTransport('SMTP', {
        host: 'localhost', //TODO: may not work
        port: 25,
        auth: {
            user: 'username',
            pass: 'password'
        }
    });

    var mailOptions = {
        from: 'Cloud File Server', // sender address
        to: req.param("to"), // list of receivers
        subject: req.param("subject"), // Subject line
        text: req.param("content") // plaintext body
        //html: '<b>Hello world 🐴</b>' // html body

    };

    smtpTransport.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    res.render('index', {title: 'sendmail'});
});


module.exports = router;
