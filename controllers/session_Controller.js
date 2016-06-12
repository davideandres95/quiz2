/**
 * Created by David on 06/06/2016.
 */
var url = require('url');
var models = require('../models');
//GET /session      -- Formulario de Login
exports.new = function (req, res, next) {
    var redir = req.query.redir || url.parse(req.headers.referer || "/").pathname;

    if( redir === '/session' || redir ==='/users/new') { redir = "/"}

    res.render('session/new', {redir: redir});
}

//POST /session     --Crear Usuario
exports.create = function (req, res, next) {
    var redir = req.body.redir || '/';

    var login = req.body.login;
    var password = req.body.password;

    authenticate(login, password)
        .then(function (user){
            if (user){
                var minutes = 1000*60;
                var date = new Date();
                var time = date.getTime();
                req.session.user = {id:user.id, username: user.username, expiratesAt: time + minutes*2};
                res.redirect (redir); //redireccion a redir
            } else {
                req.flash('error', 'La autenticación ha fallado. Inténtelo de nuevo');
                res.redirect("/session?redir="+redir);
            }
        })
        .catch(function (error){
            req.flash('error', 'Se ha producido un error: '+ error);
            next(error);
        });
};

//DELETE / session   --Destruir sesion
exports.destroy = function (req, res, next) {
    delete req.session.user;
    res.redirect("/session"); //redirect a login
}

var authenticate = function (login, password) {

    return models.User.findOne({where: {username: login}})
        .then(function(user)    {
            if  (user && user.verifyPassword(password)) {
                return user;
            } else {
                return null;
            }
        })
};

exports.loginRequired = function ( req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/session?redir=' + (req.param('redir')));
    }
}