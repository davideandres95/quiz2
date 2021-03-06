var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_Controller');
var commentController = require('../controllers/comment_Controller');
var userController = require('../controllers/user_Controller');
var sessionController = require('../controllers/session_Controller');

//pagina de Entrada
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz'});
});

//Autoload de parametros
router.param('quizId', quizController.load); //autoload :quizId
router.param('userId', userController.load); //autoload :userId


//GESTION DE SESION
router.get('/session',								sessionController.new);
router.post('/session',								sessionController.create);
router.delete('/session',							sessionController.destroy);

//GESTION DE RUTAS DE USUARIOS

router.get('/users',								userController.index);		//listado de usuarios
router.get('/users/:userId(\\d+)',					userController.show);		//ver un usuario
router.get('/users/new',							userController.new);		//formulario sign up
router.post('/users',								userController.create);		//registrar usuario
router.get('/users/:userId(\\d+)/edit',				sessionController.loginRequired, userController.edit);		//editar cuenta
router.post('/users/:userId(\\d+)',					sessionController.loginRequired, userController.update);		//actualizar cuenta
router.delete('/users/:userId(\\d+)',				sessionController.loginRequired, userController.destroy);	//borrar cuenta

//GESTION DE QUIZZES
router.get('/quizzes.:format?', 					quizController.index);
router.get('/quizzes/:quizId(\\d+).:format?', 		quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', 			quizController.check);
router.get('/quizzes/new',							sessionController.loginRequired, quizController.new);
router.post('/quizzes', 							sessionController.loginRequired, quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',			sessionController.loginRequired, quizController.edit);
router.post('/quizzes/:quizId(\\d+)',				sessionController.loginRequired, quizController.update);
router.delete('/quizzes/:quizId(\\d+)', 			sessionController.loginRequired, quizController.destroy);

//GESTION DE COMENTARIOS
router.get('/quizzes/:quizId(\\d+)/comments/new',	sessionController.loginRequired, commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments',		sessionController.loginRequired, commentController.create);

//GESTION DE AUTORES
router.get('/author', function(req, res, next){
	res.render('author', { github:'<a href="https://github.com/davideandres95/quiz2">Proyecto en github</a>',
		title: 'Quiz', autores: 'David de Andrés y Diego Martín Crespo',
		video1:'<iframe width="560" height="315" src="https://www.youtube.com/embed/jO2ecDT6Vgw" frameborder="0" allowfullscreen></iframe>',
		video2: '<iframe width="560" height="315" src="https://www.youtube.com/embed/iCme0HRgd0U" frameborder="0" allowfullscreen></iframe>',
		foto1: '<img src="/images/Davideandres.jpg" alt="David de Andres">',
		foto2: '<img src="/images/diegomartin.jpg" alt="Diego Martín" style="width:200px; height:200px">'
	})
});

module.exports = router;