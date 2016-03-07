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

var fs = require('fs');
var path = require('path');
router.get('/get/:filename/:fileid', function (req, res, next) {
    // uses the upload library
    // should use basic HTTP AUTH


    //res.render('index', {title: 'getfile'});
    var diskFilename = req.params["fileid"];
    var actualFilename = req.params["filename"];
    var fpath = "./uploads/" + diskFilename.toString(); //TODO: path may change on server
    fpath = path.resolve(fpath);

    console.log("fpath is: " + fpath.toString());
    res.download(fpath, actualFilename, function(err) {
        if (err) {
            console.log("error occured: ");
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fpath);
            res.end("file sent");
        }
    });

});


var nodemailer = require('nodemailer');
var validator = require('validator');
router.post('/sendmail/', function (req, res, next) {
    // uses the upload library
    // bodyParams - subject, content, to

    //res.render('index', {title: 'sendmail'});

    var transporter = nodemailer.createTransport('smtps://slimfilesystem%40gmail.com:98vqycg498j@smtp.gmail.com');

    if (!validator.isEmail(req.body.to)) {
        res.end("bad email format");
        return console.log("bad email format");
    }

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Slim Shady Files" <slimfilesystem@gmail.com>', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text // plaintext body
        //html: '<b>Hello world 🐴</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.end("Message failed to send");
            return console.log(error);
        }
        res.end("Message sent");
        console.log('Message sent: ' + info.response);
    });

});


module.exports = router;
