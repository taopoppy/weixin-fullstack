var express = require('express');
var router = express.Router();
var dao = require('./common/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  // 使用render就是使用模板引擎去渲染页面，而不是返回json的API
  // 模板使用views中的index.jade文件，传递参数{ title: 'Express4'}
  res.render('index', { title: 'Express4' });
});

router.get('/query',async function (req,res,next) {
  let data = await dao.query({id:100},'users');
  res.json(data);
})

module.exports = router;
