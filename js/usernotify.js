var user = {};
user.notify = function (){
	var args = Array.prototype.slice.call(arguments);
	console.log('user.notify:: '+ args.join(' '));
};
user.warn = function (){
	var args = Array.prototype.slice.call(arguments);
	console.log('user.warn:: '+ args.join(' '));
};