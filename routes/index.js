var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', github:'<a href="https://github.com/davideandres95/quiz2">Proyecto en github</a>'});
});

<<<<<<< HEAD

=======
router.get('/author', function(req, res, next){
	res.render('author', { github:'<a href="https://github.com/davideandres95/quiz2">Proyecto en github</a>',
		title: 'Quiz', autores: 'David de Andrés y Diego Martín Crespo',
		video1:'<iframe width="560" height="315" src="https://www.youtube.com/embed/jO2ecDT6Vgw" frameborder="0" allowfullscreen></iframe>',
		video2: '<iframe width="560" height="315" src="https://www.youtube.com/embed/iCme0HRgd0U" frameborder="0" allowfullscreen></iframe>',
		foto1: '<img src="../public/images/Davideandres.jpg" alt="David de Andres">',
		foto2: '<img src="../public/images/diegomartin.jpg" alt="Diego Martín">'
	})
});
>>>>>>> origin/master

module.exports = router;
