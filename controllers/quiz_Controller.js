var models = require('../models');

//autoload el quiz asociado a :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId)
	.then(function(quiz){
		if(quiz) {
			req.quiz=quiz;
			next();
		}
		else{
		next(new Error('No existe quizId=' + quizId));
		}
	}).catch(function(error) { next(error); });
};

//GET / quizzes
exports.index = function(req, res, next){
	if (req.query.search !== undefined) {
  		var searchStr = '%' + req.query.search.replace(' ', '%') + '%';
  		models.Quiz.findAll({ where: ["question like ?", searchStr] })
  		.then(function (quizzes) {
			if(req.params.format==='json'){
				res.json(quizzes);
				}
			else{
				res.render ('quizzes/index', { quizzes: quizzes});
			}
   		})
   		.catch(function(error) { next(error); });
  		}
  	else{
  		models
		.Quiz
		.findAll()	.then(function(quizzes) {
			if(req.params.format==='json'){
				res.json(quizzes);
			}
			else{
				res.render ('quizzes/index', { quizzes: quizzes});
			}
		})
		.catch(function(error) {next(error); });
  	}
};	


//GET /quizzes/:id
exports.show = function(req, res, next){
	models
	.Quiz
	.findById(req.params.quizId)
	.then (function(quiz) {
		if(quiz) {
			var answer = req.query.answer || '';
			if(req.params.format==='json') {
				res.json(quizzes);
			}
			else{
				res.render('quizzes/show', {quiz: req.quiz, answer: answer});
			}
		} else { throw new Error('No existe ese quiz en la BBDD.'); }
	})
	.catch(function(error) {next(error); });
};

//GET /quizzes/:id/check
exports.check = function (req, res, next){
	models
	.Quiz
	.findById(req.params.quizId)
	.then (function(quiz) {
		if(quiz) {
			var answer = req.query.answer || "";
			var result = answer === req.quiz.answer ? 'Correcta' : 'Incorrecta';
			res.render('quizzes/result', {quiz: req.quiz, result: result, answer: answer});
		} else { throw new Error('No existe ese quiz en la BBDD.'); }	
	})
	.catch( function (error) {next(error); });
};	

