var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(3000, function() {
	console.log("Iniciando en puerto 3000");
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/grafica.html');
});

app.get('/js/highcharts.js', function(req, res) {
	res.sendfile(__dirname + '/highcharts.js')
});

app.get('/js/gray.js', function(req, res) {
	res.sendfile(__dirname + '/gray.js')
});

var votos = [0, 0, 0];

io.sockets.on('connection', function(socket) {

	socket.on('enviarVoto', function(data) {
		votos[data.voto] += 1;
		socket.emit('votoRecibido', data.voto);
		socket.broadcast.emit('votoRecibido', data.voto);
	});


	socket.on('recibirVotos', function() {
		socket.emit('votacion', votos);
	})

});