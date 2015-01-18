// Constructor: canvas object

function Cbject (options, game){
	var cbject = this,
		o = typeof options === 'object' ? options : {};
	
	cbject.x = o.x || 40;
	cbject.y = o.y || 40;
	cbject.w = o.w || 40;
	cbject.h = o.h || 40;
	
}

Cbject.prototype.draw = function (){
	
}