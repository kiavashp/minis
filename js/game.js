var cnst = {},
	g = window.g || new EventEmitter;

g._running = false;

g.nextframe = null;
g.lastupdate = Date.now();
g.keys = {};

g.w = 3000;
g.h = 2000;
g.frame = { x: 0, y: 0, w: 0, h: 0, pad: 100 };

g.gravity = 1;
g.groundheight = 70;
g.ground = innerHeight - g.groundheight;
g.blocks = [];

g.player = null;
g.actors = [];

g.fps = function (cb){
	var game = this,
		frames = 0,
		start = Date.now();
	g.on('update', function _ (){
		frames++;
		var time = Date.now() - start;
		if(time >= 1e3){
			g.off('update', _);
			console.log('fps:', frames, '/', time);
			typeof cb === 'function' && cb(frames);
		}
	});
}

g.once('ready', function (){
	var game = this;
	Actor.bind(game);
//	game.player = new Player({});
});

(function (){
	
	function frame (){
		var game = this;
		game.nextframe = cnst.animframe(frame.bind(game));
		game.emit('update');
	}
	
	g.on('start', function (){
		var game = this;
		if(game._running) return;
		game._running = true;
		frame.call(game);
	});
	
}());

g.on('stop', function (){
	var game = this;
	game._running = false;
	cnst.stopframe(game.nextframe);
});

g.on('update', function (){
	var a, game = this,
		now = Date.now(),
		timeoff = now - game.lastupdate;
	
	if(game.player) game.player.update();
	for(a=0;a<game.actors.length;a++) game.actors[a].update();
	game.lastupdate = now;
	game.emit('draw');
});

g.on('draw', function (){
	var a, game = this;
	game._.setTransform(cnst.pixelratio, 0, 0, cnst.pixelratio, 0, 0);
//	game._.clearRect(0, 0, game.w, game.h);
	game._.fillStyle = '#6B6249';
	game._.fillRect(0, 0, game.w, game.h);
	
	game._.drawImage(ground_img, game.frame.x, game.frame.y + game.ground - 5);
	
	for(a=0;a<game.actors.length;a++) game.actors[a].draw();
	if(game.player) game.player.draw();
});

g.on('resize', function (dontdraw){
	var game = this;
	game.c.width = innerWidth * cnst.pixelratio;
	game.c.height = innerHeight * cnst.pixelratio;
	game.frame.w = game.c.style.width = innerWidth;
	game.frame.h = game.c.style.height = innerHeight;
	game.ground = game.frame.h - game.groundheight + 5;
	if(!dontdraw) game.emit('draw');
});

w._focused = true;
w.on('focus', function (){ w._focused = true });
w.on('blur', function (){ w._focused = false; for(var k in g.keys) g.keys[k] = false; });
w.on('keydown', function (e){ if(w._focused) g.keys[e.keyCode] = Date.now() });
w.on('keyup', function (e){ g.keys[e.keyCode] = false });
function eleKeySim (el, keycode){
	el.addEventListener('mousedown', function (){ g.keys[keycode] = Date.now(); });
	el.addEventListener('mouseup', function (){ g.keys[keycode] = false; });
};

w.on('DOMContentLoaded', function (){
	g.c = can;
	g._ = g.context = g.c.getContext('2d');
	
	ground_img = new Image;
	ground_img.src = './assets/scene/ground.png';
	
	var a = 'ackingStorePixelRatio', b = 'equestAnimationFrame', c = 'ancelAnimationFrame';
	cnst.pixelratio = (w.devicePixelRatio||1)/(g._['webkitB'+a]||g._['mozB'+a]||1);
	
	cnst.animframe = (w['r'+b]||w['webkitR'+b]||w['mozR'+b]||function(f){return setTimeout(f,16)}).bind(w);
	cnst.stopframe = (w['c'+c]||w['webkitC'+c]||w['mozC'+c]||function(t){clearTimeout(t)}).bind(w);
	
	g.emit('resize', true);
	g.emit('ready');
//	g.emit('start');
});

w.on('load', function (){ g.emit('resize', true); });

w.on('resize', function (){ g.emit('resize', g._running); });
