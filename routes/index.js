var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/upload', function (req, res, next){
  // uses the upload library

  res.render('index', { title: 'upload' });

});

router.use('/getfile/:fileid/', function (req, res, next){
  // uses the upload library
  // should use basic HTTP AUTH

  res.render('index', { title: 'getfile' });

});

router.use('/sendmail/', function (req, res, next){
  // uses the upload library
  // bodyParams - subject, content, to

  res.render('index', { title: 'sendmail' });

});



module.exports = router;
