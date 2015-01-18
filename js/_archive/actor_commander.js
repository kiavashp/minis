function inherits (constr,superconstr){
	constr.super_ = superconstr;
	constr.prototype = Object.create(superconstr.prototype, {
		constructor: {
			value: constr,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
}

// Constructor: Actor

function Actor (o){
	if(!(this instanceof Actor))
		return new Actor(x, y, w, h);
	o = typeof o === 'object' ? o : {};
	var actor = this;
	actor.life = o.life || 100;
	actor.movespeed = o.movespeed || 9;
	actor.gravity = o.gravity || 1;
	actor.momentumy = 0;
	actor.inair = false;
	actor.x = o.x || 0;
	actor.y = o.y || 0;
	actor.w = o.w || 9;
	actor.h = o.h || 9;
}

Actor.bind = function (ctx){
	return ctx && typeof ctx.canvas === 'object' && (Actor.prototype.ctx = ctx);
}

Actor.prototype.bind = function (ctx){
	var actor = this;
	return ctx && typeof ctx.canvas === 'object' && (actor.ctx = ctx);
}

Actor.prototype.jump = function (){
	var actor = this;
	if(actor.nair) return false;
	actor.inair = true;
	actor.momentumy = -actor.movespeed;
}

Actor.prototype.update = function (timeoff){
	var actor = this;
	if(actor.inair){
		actor.momentumy += actor.fallspeed;
		actor.y += actor.momentumy
		if(actor.y > g.ground){
			actor.y = actor.momentumy = 0;
		}
	}
	if(actor.sprite) actor.sprite.update();
}

Actor.prototype.draw = function (){
	var actor = this;
	actor._.fillStyle = '#aa99bb';
	actor._.fillRect(actor.x, actor.y, actor.w, actor.h);
}
