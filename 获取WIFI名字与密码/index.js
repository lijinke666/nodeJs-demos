const wifiPassword = require('wifi-password');
const wifiName = require('wifi-name');

wifiName().then(name => {
	console.log(name);
});

wifiPassword().then(password => {
	console.log(password);
	//=> 'johndoesecretpassword'
});

