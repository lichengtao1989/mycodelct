const express = require('express');
const app = express();
app.use(express.static('./static'));
// app.use('/static',express.static('./static'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('index', {
    name: 'lct',
    list: ['hh', 'dd', 'bb']
  });
});
app.get('/student/:number', function(req, res) {
  res.set({
    'Content-Type': 'text/html;charset=UTF-8'
  });
  if (/^[\d]{6}$/.test(req.params.number)) {
    console.log(req.params.number);
    res.send('number:' + req.params.number);
  } else {
    res.send('number wrong');
  }
});
app.listen(9000);
