// Constructor: Actor

function Actor (o){
	if(!(this instanceof Actor))
		return new Actor(o);
	o = typeof o === 'object' ? o : {};
	var actor = this;
	actor.life = o.life || 100;
	actor.speed = { x: 0, y: 0 };
	actor.movespeed = o.movespeed || { x: 5, y: 15 };
	actor.inair = false;
	actor.x = o.x || 40;
	actor.y = o.y || 0;
	actor.w = o.w || 80;
	actor.h = o.h || 100;
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
	if(actor.inair) return false;
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
