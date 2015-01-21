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
		context.setTransform(-cnst.pixelratio, 0, 0, cnst.pixelratio, 80*cnst.pixelratio, 0);
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

g.sprite_frames = {
	IDLE: [
		{ image: [0, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [160, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [320, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [480, 0, 160, 200], draw: [0, 0, 80, 100] }
	],
	RUN: [
		{ image: [640, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [800, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [960, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1120, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1280, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1440, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1600, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [1760, 0, 160, 200], draw: [0, 0, 80, 100] }
	],
	FALL: [
		{ image: [1920, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2080, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2240, 0, 160, 200], draw: [0, 0, 80, 100] }
	]
};
g.sprites = {};
g.addsprite = function (name, sprite){
	sprite.name = name;
	g.sprites[name] = new Sprite(sprite);
	return g.addsprite.bind(g);
}

// idle sprites
g.addsprite(
	
	// blue character
	"blue_idle_head", {
		image: g.image("./assets/character/blue_head.png"),
		frames: g.sprite_frames.IDLE
	})(
	"blue_idle_chest", {
		image: g.image("./assets/character/blue_chest.png"),
		frames: g.sprite_frames.IDLE
	})(
	"blue_idle_arm_left", {
		image: g.image("./assets/character/blue_arm_left.png"),
		frames: g.sprite_frames.IDLE
	})(
	"blue_idle_arm_right", {
		image: g.image("./assets/character/blue_arm_right.png"),
		frames: g.sprite_frames.IDLE
	})(
	"blue_idle_leg_left", {
		image: g.image("./assets/character/blue_leg_left.png"),
		frames: g.sprite_frames.IDLE
	})(
	"blue_idle_leg_right", {
		image: g.image("./assets/character/blue_leg_right.png"),
		frames: g.sprite_frames.IDLE
	})(
	
	// white bandana
	"white_idle_bandana", {
		image: g.image("./assets/armor/cloth/white_bandana.png"),
		frames: g.sprite_frames.IDLE
	})(
	
	// steel dagger
	"steel_idle_dagger", {
		image: g.image("./assets/weapon/dagger/steel.png"),
		frames: g.sprite_frames.IDLE
	})(
	
	// dark arm right
	"dark_idle_arm_right", {
		image: g.image("./assets/armor/plate/dark_arm_right.png"),
		frames: g.sprite_frames.IDLE
	})(
	
	// dark chest
	"dark_idle_chest", {
		image: g.image("./assets/armor/plate/dark_chest.png"),
		frames: g.sprite_frames.IDLE
	})(
	
	// red book
	"red_idle_book", {
		image: g.image("./assets/offhand/misc/red_book.png"),
		frames: g.sprite_frames.IDLE
	});

// run sprites
g.addsprite(
	"blue_run_head", {
		image: g.image("./assets/character/blue_head.png"),
		frames: g.sprite_frames.RUN
	})(
	"blue_run_chest", {
		image: g.image("./assets/character/blue_chest.png"),
		frames: g.sprite_frames.RUN
	})(
	"blue_run_arm_left", {
		image: g.image("./assets/character/blue_arm_left.png"),
		frames: g.sprite_frames.RUN
	})(
	"blue_run_arm_right", {
		image: g.image("./assets/character/blue_arm_right.png"),
		frames: g.sprite_frames.RUN
	})(
	"blue_run_leg_left", {
		image: g.image("./assets/character/blue_leg_left.png"),
		frames: g.sprite_frames.RUN
	})(
	"blue_run_leg_right", {
		image: g.image("./assets/character/blue_leg_right.png"),
		frames: g.sprite_frames.RUN
	})(
	
	// white bandana
	"white_run_bandana", {
		image: g.image("./assets/armor/cloth/white_bandana.png"),
		frames: g.sprite_frames.RUN
	})(
	
	// steel dagger
	"steel_run_dagger", {
		image: g.image("./assets/weapon/dagger/steel.png"),
		frames: [
			/* g.sprite_frames.RUN */
			{ image: [630, 0, 160, 200], draw: [-5, 0, 80, 100] },
			{ image: [790, 0, 160, 200], draw: [-5, 0, 80, 100] },
			{ image: [950, 0, 160, 200], draw: [-5, 0, 80, 100] },
			{ image: [1110, 0, 160, 200], draw: [-5, 0, 80, 100] },
			{ image: [1270, 0, 160, 200], draw: [-5, 0, 80, 100] },
			{ image: [1430, 0, 160, 200], draw: [-5, 0, 80, 100] },
			{ image: [1590, 0, 160, 200], draw: [-5, 0, 80, 100] },
			{ image: [1750, 0, 160, 200], draw: [-5, 0, 80, 100] }
		]
	})(
	
	// dark arm right
	"dark_run_arm_right", {
		image: g.image("./assets/armor/plate/dark_arm_right.png"),
		frames: g.sprite_frames.RUN
	})(
	
	// dark chest
	"dark_run_chest", {
		image: g.image("./assets/armor/plate/dark_chest.png"),
		frames: g.sprite_frames.RUN
	})(
	
	// red book
	"red_run_book", {
		image: g.image("./assets/offhand/misc/red_book.png"),
		frames: g.sprite_frames.RUN
	});

// fall sprites
g.addsprite(
	
	// blue character
	"blue_fall_head", {
		image: g.image("./assets/character/blue_head.png"),
		frames: g.sprite_frames.FALL
	})(
	"blue_fall_chest", {
		image: g.image("./assets/character/blue_chest.png"),
		frames: g.sprite_frames.FALL
	})(
	"blue_fall_arm_left", {
		image: g.image("./assets/character/blue_arm_left.png"),
		frames: g.sprite_frames.FALL
	})(
	"blue_fall_arm_right", {
		image: g.image("./assets/character/blue_arm_right.png"),
		frames: g.sprite_frames.FALL
	})(
	"blue_fall_leg_left", {
		image: g.image("./assets/character/blue_leg_left.png"),
		frames: g.sprite_frames.FALL
	})(
	"blue_fall_leg_right", {
		image: g.image("./assets/character/blue_leg_right.png"),
		frames: g.sprite_frames.FALL
	})(
	
	// white bandana
	"white_fall_bandana", {
		image: g.image("./assets/armor/cloth/white_bandana.png"),
		frames: g.sprite_frames.FALL
	})(
	
	// steel dagger
	"steel_fall_dagger", {
		image: g.image("./assets/weapon/dagger/steel.png"),
		frames: [
			/* g.sprite_frames.FALL */
			{ image: [1910, 0, 160, 200], draw: [-5, 0, 80, 100] },
			{ image: [2070, 0, 160, 200], draw: [-5, 0, 80, 100] },
			{ image: [2230, 0, 160, 200], draw: [-5, 0, 80, 100] }
		]
	})(
	
	// dark arm right
	"dark_fall_arm_right", {
		image: g.image("./assets/armor/plate/dark_arm_right.png"),
		frames: g.sprite_frames.FALL
	})(
	
	// dark chest
	"dark_fall_chest", {
		image: g.image("./assets/armor/plate/dark_chest.png"),
		frames: g.sprite_frames.FALL
	})(
	
	// red book
	"red_fall_book", {
		image: g.image("./assets/offhand/misc/red_book.png"),
		frames: g.sprite_frames.FALL
	});

