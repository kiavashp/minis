g = g || new EventEmitter;

g._images = {};
g.imagesloaded = false;
g.image = function image (src){
	if(g._images[src]) return g._images[src];
	var i = new Image();
	g.imagesloaded = false;
	i.onload = function (){ g.imagesloaded = true }
	i.src = src;
	return g._images[src] = i;
}

function Sprite (options){
	var k, sprite = this;
	for(k in options)
		sprite[k] = options[k];
}
Sprite.prototype.draw = function (context, frame, x, y, flip){
	if(flip){
		context.save();
		context.setTransform(-1, 0, 0, 1, 80, 0);
		x = - x;
	}
	var s = this,
		image = s.image,
		f = frame % s.frames.length,
		i = s.frames[f].image, d = s.frames[f].draw;
	context.drawImage.apply( context , [image].concat(i, [d[0]+x, d[1]+y, d[2], d[3]]) );
	
	if(flip){
		context.restore();
	}
}

g.sprites = {};
g.addsprite = function (name, sprite){
	sprite.name = name;
	g.sprites[name] = new Sprite(sprite);
	return g.addsprite.bind(g);
}

// idle sprites
g.addsprite(
"blue_idle_head", {
	image: g.image("./assets/character/blue_head.png"),
	frames: [
		{ image: [0, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [160, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [320, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [480, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_idle_chest", {
	image: g.image("./assets/character/blue_chest.png"),
	frames: [
		{ image: [0, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [160, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [320, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [480, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_idle_arm_left", {
	image: g.image("./assets/character/blue_arm_left.png"),
	frames: [
		{ image: [0, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [160, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [320, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [480, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_idle_arm_right", {
	image: g.image("./assets/character/blue_arm_right.png"),
	frames: [
		{ image: [0, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [160, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [320, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [480, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_idle_leg_left", {
	image: g.image("./assets/character/blue_leg_left.png"),
	frames: [
		{ image: [0, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [160, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [320, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [480, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_idle_leg_right", {
	image: g.image("./assets/character/blue_leg_right.png"),
	frames: [
		{ image: [0, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [160, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [320, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [480, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
});

// run sprites
g.addsprite(
"blue_run_head", {
	image: g.image("./assets/character/blue_head.png"),
	frames: [
		{ image: [640, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [800, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [960, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1120, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1280, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1440, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1600, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1760, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_run_chest", {
	image: g.image("./assets/character/blue_chest.png"),
	frames: [
		{ image: [640, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [800, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [960, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1120, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1280, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1440, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1600, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1760, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_run_arm_left", {
	image: g.image("./assets/character/blue_arm_left.png"),
	frames: [
		{ image: [640, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [800, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [960, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1120, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1280, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1440, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1600, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1760, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_run_arm_right", {
	image: g.image("./assets/character/blue_arm_right.png"),
	frames: [
		{ image: [640, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [800, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [960, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1120, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1280, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1440, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1600, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1760, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_run_leg_left", {
	image: g.image("./assets/character/blue_leg_left.png"),
	frames: [
		{ image: [640, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [800, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [960, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1120, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1280, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1440, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1600, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1760, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_run_leg_right", {
	image: g.image("./assets/character/blue_leg_right.png"),
	frames: [
		{ image: [640, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [800, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [960, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1120, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1280, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1440, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1600, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1760, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
});

// fall sprites
g.addsprite(
"blue_fall_head", {
	image: g.image("./assets/character/blue_head.png"),
	frames: [
		{ image: [1920, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2080, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2240, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_fall_chest", {
	image: g.image("./assets/character/blue_chest.png"),
	frames: [
		{ image: [1920, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2080, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2240, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_fall_arm_left", {
	image: g.image("./assets/character/blue_arm_left.png"),
	frames: [
		{ image: [1920, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2080, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2240, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_fall_arm_right", {
	image: g.image("./assets/character/blue_arm_right.png"),
	frames: [
		{ image: [1920, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2080, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2240, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_fall_leg_left", {
	image: g.image("./assets/character/blue_leg_left.png"),
	frames: [
		{ image: [1920, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2080, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2240, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
})(
"blue_fall_leg_right", {
	image: g.image("./assets/character/blue_leg_right.png"),
	frames: [
		{ image: [1920, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2080, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2240, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
});
