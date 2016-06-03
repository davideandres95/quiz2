var models = require ('../models');
var Sequilize = require ('sequelize');

//Autoload el quiz asociado a :quizId
exports.load = function (req, res, next, quizId) {
    models.Quiz.findById ( quizId, { include: [ models.Comment ] })
        .then( function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
                throw new  Error ('No existe  quizId =' + quizId );
            }
        })
        .catch(function(error) {next(error);});
};

//GET /quizzes/:quizId/comments/new
exports.new = function (req, res, next) {
    var comment = models.Comment.build({text: ""});

    res.render('comments/new',  { comment: comment,
        quiz: req.quiz
    });
};

//POST /quizzes/:quizId/comments
exports.create = function (req, res, next) {
    var comment = models.Comment.build(
        { text: req.body.comment.text,
            QuizId: req.quiz.id
        });

    comment.save()
        .then(function (comment) {
            req.flash('success', 'Comentario creado con exito');
            res.redirect('/quizzes/'+ req.quiz.id);
        })
        .catch(Sequilize.ValidationError, function(error) {

            req.flash('error', 'Errores en el formulario:');
            for (var i in errors.errors) {
                req.flash('error', error.errors[i].value);
            };
            res.render('comments/new', {comment: comment,
                quiz:    req.quiz});
        })
        .catch(function(error) {
            req.flash('error', 'Error al crear un Comentario: ' +error.message);
            next(error);
        });
};