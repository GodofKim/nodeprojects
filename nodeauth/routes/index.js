var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Members' });
});

function ensureAuthenticated(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}
router.get('/test',function(req,res,next){
  res.render('test', {title: 'RingDingDong'});
});
module.exports = router;
