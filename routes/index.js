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

function sendMail (subject, content, to, fileOnDisk, filename) {
    // uses the upload library
    // bodyParams - subject, content, to, fileOnDisk, filename

    //res.render('index', {title: 'sendmail'});

    var transporter = nodemailer.createTransport('smtps://slimfilesystem%40gmail.com:98vqycg498j@smtp.gmail.com');

    if (!validator.isEmail(to)) {
        res.end("bad email format");
        return console.log("bad email format");
    }

    var fpath = "./uploads/" + fileOnDisk.toString(); //TODO: path may change on server
    fpath = path.resolve(fpath);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Slim File System" <slimfilesystem@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: content, // plaintext body
        //html: '<b>Hello world 🐴</b>' // html body

        attachments: [
            //{   // utf-8 string as an attachment
            //    filename: 'text1.txt',
            //    content: 'hello world!'
            //},
            //{   // binary buffer as an attachment
            //    filename: 'text2.txt',
            //    content: new Buffer('hello world!','utf-8')
            //},
            {   // file on disk as an attachment
                filename: filename,
                path: fpath // stream this file
            }
            //{   // filename and content type is derived from path
            //    path: '/path/to/file.txt'
            //},
            //{   // stream as an attachment
            //    filename: req.body.filename,
            //    content: fs.createReadStream(fpath)
            //}
            //{   // define custom content type for the attachment
            //    filename: 'text.bin',
            //    content: 'hello world!',
            //    contentType: 'text/plain'
            //},
            //{   // use URL as an attachment
            //    filename: 'license.txt',
            //    path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
            //},
            //{   // encoded string as an attachment
            //    filename: 'text1.txt',
            //    content: 'aGVsbG8gd29ybGQh',
            //    encoding: 'base64'
            //},
            //{   // data uri as an attachment
            //    path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
            //},
            //{
            //    // use pregenerated MIME node
            //    raw: 'Content-Type: text/plain\r\n' +
            //    'Content-Disposition: attachment;\r\n' +
            //    '\r\n' +
            //    'Hello world!'
            //}
        ]
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

}


module.exports = router;
