var express = require('express');
var router = express.Router();

var multer  = require('multer');
var upload = multer({ dest: './uploads/' });
var nodemailer = require('nodemailer');
var validator = require('validator');

var fs = require('fs');
var path = require('path');



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/upload', upload.single('fileupload'), function (req, res, next) {
    console.log(req.file);
    console.log(req.body);

    //var url = req.file.originalname + "/" + req.file.filename;
    //console.log(url);
    var mailSubject = "Incoming attached file";
    var mailContent = "You've received an attached mail sent to you by the cloud!";
    sendMail(mailSubject, mailContent, req.body["toemail"],req.file.filename, req.file.originalname, function (err){
        fs.unlink('./uploads/' + req.file.filename, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('successfully deleted file');
            }
        });
        if (err != null){
            next();
        } else {
            res.redirect("/succcess");


    }});
});

router.use("/succcess", function (req, res, next) {
    res.status(200);
    res.render('success', {
        message: "Operation was successful",
        description: "your file was sent to his destination"
    });
});


function sendMail (subject, content, to, fileOnDisk, filename, callback) {
    // uses the upload library
    // bodyParams - subject, content, to, fileOnDisk, filename

    //res.render('index', {title: 'sendmail'});

    var transporter = nodemailer.createTransport('smtps://slimfilesystem%40gmail.com:98vqycg498j@smtp.gmail.com');

    console.log(to);
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

            {   // file on disk as an attachment
                filename: filename,
                path: fpath // stream this file
            }

        ]
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
       callback(error);
    });

}


module.exports = router;
