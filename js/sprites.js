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
	// move/translate image or draw initial coordinates
	IDLE_MV: function (ix, iy, dx, dy){
		ix = +ix || 0; iy = +iy || 0; dx = +dx || 0; dy = +dy || 0;
		return [
			{ image: [ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
			{ image: [160 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
			{ image: [320 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
			{ image: [480 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] }
	] },
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
	// move/translate image or draw initial coordinates
	RUN_MV: function (ix, iy, dx, dy){
		ix = +ix || 0; iy = +iy || 0; dx = +dx || 0; dy = +dy || 0;
		return [
			{ image: [640 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
			{ image: [800 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
			{ image: [960 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
			{ image: [1120 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
			{ image: [1280 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
			{ image: [1440 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
			{ image: [1600 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
			{ image: [1760 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] }
	] },
	FALL: [
		{ image: [1920, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2080, 0, 160, 200], draw: [0, 0, 80, 100] },
		{ image: [2240, 0, 160, 200], draw: [0, 0, 80, 100] }
	],
	// move/translate image or draw initial coordinates
	FALL_MV: function (ix, iy, dx, dy){
		ix = +ix || 0; iy = +iy || 0; dx = +dx || 0; dy = +dy || 0;
		return [
		{ image: [1920 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
		{ image: [2080 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] },
		{ image: [2240 +ix, iy, 160, 200], draw: [dx, dy, 80, 100] }
	] },
};
g.sprites = {};
g.addsprite = function addSprite (name, sprite){
	sprite.name = name;
	g.sprites[name] = new Sprite(sprite);
	return g.addsprite.bind(g);
}
g.addcharactersprite = function addCharacterSprite (color){
	g.addsprite(
		// idle sprites
		color +"_idle_head", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.IDLE
		})(
		color +"_idle_chest", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.IDLE_MV(0,200)
		})(
		color +"_idle_arm_left", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.IDLE_MV(0,400)
		})(
		color +"_idle_arm_right", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.IDLE_MV(0,600)
		})(
		color +"_idle_leg_left", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.IDLE_MV(0,800)
		})(
		color +"_idle_leg_right", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.IDLE_MV(0,1000)
		})(
		// run sprites
		color +"_run_head", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.RUN
		})(
		color +"_run_chest", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.RUN_MV(0,200)
		})(
		color +"_run_arm_left", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.RUN_MV(0,400)
		})(
		color +"_run_arm_right", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.RUN_MV(0,600)
		})(
		color +"_run_leg_left", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.RUN_MV(0,800)
		})(
		color +"_run_leg_right", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.RUN_MV(0,1000)
		})(
		// fall sprites
		color +"_fall_head", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.FALL
		})(
		color +"_fall_chest", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.FALL_MV(0,200)
		})(
		color +"_fall_arm_left", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.FALL_MV(0,400)
		})(
		color +"_fall_arm_right", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.FALL_MV(0,600)
		})(
		color +"_fall_leg_left", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.FALL_MV(0,800)
		})(
		color +"_fall_leg_right", {
			image: g.image("./assets/character/"+ color +".png"),
			frames: g.sprite_frames.FALL_MV(0,1000)
		});
}

g.addcharactersprite('blue');
g.addcharactersprite('white');
g.addcharactersprite('red');
g.addcharactersprite('brown');
g.addcharactersprite('green');
g.addcharactersprite('black');

// idle sprites
g.addsprite(
	
	// grey hood
	"grey_idle_hood", {
		image: g.image("./assets/armor/cloth/grey_hood.png"),
		frames: g.sprite_frames.IDLE_MV(0,0,0,-10)
	})(
	
	// white bandana
	"white_idle_bandana", {
		image: g.image("./assets/armor/cloth/white_bandana.png"),
		frames: g.sprite_frames.IDLE
	})(
	
	// gold crown
	"gold_idle_crown", {
		image: g.image("./assets/armor/misc/gold_crown.png"),
		frames: g.sprite_frames.IDLE_MV(0,0,0,-20)
	})(
	
	// steel dagger
	"steel_idle_dagger", {
		image: g.image("./assets/weapon/dagger/steel.png"),
		frames: g.sprite_frames.IDLE
	})(
	
	// steel sword
	"steel_idle_sword", {
		image: g.image("./assets/weapon/sword/steel.png"),
		frames: g.sprite_frames.IDLE_MV(0,0,10,10)
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
	})(
	
	// dark magehat
	"dark_idle_magehat_behind", {
		image: g.image("./assets/armor/cloth/dark_magehat.png"),
		frames: g.sprite_frames.IDLE_MV(0,200,3,-10)
	})(
	"dark_idle_magehat", {
		image: g.image("./assets/armor/cloth/dark_magehat.png"),
		frames: g.sprite_frames.IDLE_MV(0,0,0,-10)
	});

// run sprites
g.addsprite(
	
	// grey hood
	"grey_run_hood", {
		image: g.image("./assets/armor/cloth/grey_hood.png"),
		frames: g.sprite_frames.RUN_MV(0,0,0,-10)
	})(
	
	// white bandana
	"white_run_bandana", {
		image: g.image("./assets/armor/cloth/white_bandana.png"),
		frames: g.sprite_frames.RUN
	})(
	
	// gold crown
	"gold_run_crown", {
		image: g.image("./assets/armor/misc/gold_crown.png"),
		frames: g.sprite_frames.RUN_MV(0,0,0,-20)
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
	
	// steel sword
	"steel_run_sword", {
		image: g.image("./assets/weapon/sword/steel.png"),
		frames: g.sprite_frames.RUN_MV(0,0,10,10)
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
	})(
	
	// dark magehat
	"dark_run_magehat_behind", {
		image: g.image("./assets/armor/cloth/dark_magehat.png"),
		frames: g.sprite_frames.RUN_MV(0,200,3,-10)
	})(
	"dark_run_magehat", {
		image: g.image("./assets/armor/cloth/dark_magehat.png"),
		frames: g.sprite_frames.RUN_MV(0,0,0,-10)
	});

// fall sprites
g.addsprite(
	
	// grey hood
	"grey_fall_hood", {
		image: g.image("./assets/armor/cloth/grey_hood.png"),
		frames: g.sprite_frames.FALL_MV(0,0,0,-10)
	})(
	
	// white bandana
	"white_fall_bandana", {
		image: g.image("./assets/armor/cloth/white_bandana.png"),
		frames: g.sprite_frames.FALL
	})(
	
	// gold crown
	"gold_fall_crown", {
		image: g.image("./assets/armor/misc/gold_crown.png"),
		frames: g.sprite_frames.FALL_MV(0,0,0,-20)
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
	
	// steel sword
	"steel_fall_sword", {
		image: g.image("./assets/weapon/sword/steel.png"),
		frames: g.sprite_frames.FALL_MV(0,0,10,10)
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
	})(
	
	// dark magehat
	"dark_fall_magehat_behind", {
		image: g.image("./assets/armor/cloth/dark_magehat.png"),
		frames: g.sprite_frames.FALL_MV(0,200,3,-10)
	})(
	"dark_fall_magehat", {
		image: g.image("./assets/armor/cloth/dark_magehat.png"),
		frames: g.sprite_frames.FALL_MV(0,0,0,-10)
	});
