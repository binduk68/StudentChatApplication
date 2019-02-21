var express = require('express.io');
var connect= require('connect');
var getScreenMedia = require('getscreenmedia');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
app.http().io();
var PORT = 3000;
console.log('Server started on port ' + PORT);
var server = require('http').createServer(app);

var options = {
    debug: true
}



app.use(express.static(__dirname + '/content'));

app.get('/', function(req, res){
	res.render('index.ejs');
});

app.listen(process.env.PORT || PORT);
app.use('/peerjs', ExpressPeerServer(options));
app.io.route('signal', function(req) {
	req.io.join(req.data);
	req.io.join('files');
	app.io.room(req.data).broadcast('signal', {
		user_type: req.data.user_type,
		user_name: req.data.user_name,
		user_data: req.data.user_data,
		command: req.data.command
	})
})

app.io.route('files', function(req) {
	req.io.room('files').broadcast('files', {
		filename: req.data.filename,
		filesize: req.data.filesize
	});
})
