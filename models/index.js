var path = require('path');

//Cargar modelo ORM
var Sequelize = require ('sequelize');

//Usar BBDD SQLite:
var url, storage;

if(!process.env.DATABASE_URL) {
	url="sqlite:///";
	storage= "quiz.sqlite";
} else {
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize (url,
								{ storage: storage,
								  omitNull: true
								});

//Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//Importar la definición de la tabla Comments de comment.js
var Comment = sequelize.import(path.join(__dirname, 'comment'));

//Importar la definición de la tabla User de user.js
var User = sequelize.import(path.join(__dirname, 'user'));


//Relaciones entre modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; 	// exportar definición de tabla quiz
exports.Comment = Comment; //exportar definición de tabla comment
exports.User = User;