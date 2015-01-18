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

// Constructor: Item

function Item (){
	
}

// Constructor: Sprite

function Sprite (src, frames, w, h){
	if(!(this instanceof Sprite))
		return new Sprite(src, frames, w, h);
	var sprite = this;
	sprite.ready = false;
	sprite.img = new Image;
	sprite.img.src = src;
	sprite.img.onload = function (){
		if(sprite.w === false) sprite.w = sprite.img.width / sprite.frames;
		if(sprite.h === false) sprite.h = sprite.img.height;
		if(sprite.frames === false) sprite.frames = sprite.img.width / sprite.w;
		sprite.ready = true;
		sprite.lastframe = Date.now();
	}
	sprite.fps = 60;
	sprite.lastframe = Date.now();
	sprite.currentframe = 0;
	sprite.frames = frames || false;
	sprite.w = w || false;
	sprite.h = h || false;
	if(!sprite.frames && (!sprite.w || !sprite.h))
		throw Error('new Sprite - must define frame count or width & height.');
}

Sprite.prototype.update = function (){
	var now = Date.now(), timeoff = now - sprite.lastframe;
	sprite.currentframe = sprite.currentframe + timeoff / sprite.fps;
	if(sprite.currentframe > sprite.frames)
		sprite.currentframe = sprite.currentframe % sprite.frames;
	sprite.lastframe = now;
}

Sprite.prototype.draw = function (x, y){
	
}

// Constructor: Actor

function Actor (o){
	if(!(this instanceof Actor))
		return new Actor(x, y, w, h);
	o = typeof o === 'object' ? o : {};
	var actor = this;
	actor.life = o.life || 100;
	actor.movespeed = o.movespeed || 9;
	actor.fallspeed = o.fallspeed || 1;
	actor.momentumy = 0;
	actor.inair = false;
	actor.x = o.x || 0;
	actor.y = o.y || 0;
	actor.w = o.w || 9;
	actor.h = o.h || 9;
	if(typeof actor.sprite !== 'undefined'){
		actor.sprite = o.sprite instanceof Sprite ? o.sprite
			: new Sprite(o.sprite +'', null, actor.w, actor.h);
	}
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
	if(actor.sprite) actor.sprite.draw(actor.x, actor.y);
}

// Constructor: Player

function Player (){
	Actor.call(this);
	
	this.inventory = [];
	
}

inherits(Player, Actor);
