var models = require ('../models');
var Sequilize = require ('sequelize');

//GET /quizzes/:quizId/comments/new
exports.new = function (req, res, next) {
    var comment = models.Comment.build({text: ""});

    res.render('comments/new',  { comment: comment,
        quiz: req.quiz
    });
};

//POST /quizzes/:quizId/comments
exports.create = function (req, res, next) {
    var author;
    if(req.session.user){
        author=req.session.user.id;
    } else {
        author='unregistered';
    }
    var comment = models.Comment.build(
        { text: req.body.comment.text,
            QuizId: req.quiz.id,
            authorId: author
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