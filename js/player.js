// Constructor: player

function Player (options, game){
	if(!(this instanceof Player))
		return new Player(options, game);
	
	Actor.call(this, options, game);
	
	var player = this,
		o = typeof options === 'object' ? options : {};
	
	player.items = {};
	player.armor = {
		head: null,
		chest: null,
		
		left_leg: null,
		right_leg: null,
		
		left_arm: null,
		right_arm: null,
		
		left_wield: null,
		right_wield: null,
		
		back: null
	}
}

util.inherits(Player, Actor);

Player.prototype.update = function (){
	var player = this,
		game = player.game,
		now = Date.now(),
		timeoff = now - player.lastupdate;
	
	// x & y speed
	player.speed.x = game.keys[37] > (game.keys[39] || 0) ? -player.movespeed.x 
		: game.keys[39] ? player.movespeed.x : 0;
	player.speed.y = player.inair ? player.speed.y - game.gravity * (timeoff / 16)
		: game.keys[38] || game.keys[32] ? player.movespeed.y : 0;
	
	// movement booleans
	player.inair = player.y < game.ground;
	player.moving = player.speed.x != 0;
	player.flip = player.speed.x ? player.speed.x < 0 : player.flip;
	
	// which frame
	player._frame += timeoff / 100;
	player._frame %= 1000;
	player.frame = player._frame | 0;
	
	// x & y position
	player.x += player.speed.x * (timeoff / 16);
	player.y -= player.speed.y * (timeoff / 16);
	
	var newx = player.x;
	
	// x & y restrictions
	player.x = Math.max(0, Math.min(player.x, game.w - player.w));
	player.y = Math.min(game.ground, player.y);
	
	player.moving = player.moving && newx == player.x;
	
	// game frame x & y position
	game.frame.x = Math.max(game.frame.x, - player.x + game.frame.pad);
	game.frame.x = Math.min(game.frame.x, - player.x - player.w - game.frame.pad + game.frame.w);
	
	// game frame x & y restrictions
	game.frame.x = -Math.max(0, -game.frame.x);
	game.frame.x = -Math.min(-game.frame.x, g.w - g.frame.w);
	
	player.lastupdate = now;
}

Player.prototype.draw = function (){
//	console.log('player.draw');
	var player = this,
		game = player.game,
		x = game.frame.x + player.x | 0,
		y = game.frame.y + player.y - player.h | 0,
		_ = game.context,
		flip = player.flip,
		sequence = player.inair ? 'fall' : player.moving ? 'run' : 'idle';
	
	if(sequence == 'fall'){
		if(player.speed.y < 2) player.frame = ( game.ground - player.y < 40 ? 2 : 1 )
		else player.frame = 0;
	}else if(sequence == 'idle'){
		player.frame = (player.frame / 4 | 0) % 2;
	}
	
	// player arm_left
	game.sprites['blue_'+ sequence +'_arm_left'].draw(_, player.frame, x, y, flip);
	// player leg_left
	game.sprites['blue_'+ sequence +'_leg_left'].draw(_, player.frame, x, y, flip);
	// armor right_wield
	if(player.armor.left_wield)
		player.armor.left_wield.draw(_, sequence, player.frame, x, y, flip);
	// player chest
	game.sprites['blue_'+ sequence +'_chest'].draw(_, player.frame, x, y, flip);
	// armor chest
	if(player.armor.chest)
		player.armor.chest.draw(_, sequence, player.frame, x, y, flip);
	// player leg_right
	game.sprites['blue_'+ sequence +'_leg_right'].draw(_, player.frame, x, y, flip);
	// player head
	game.sprites['blue_'+ sequence +'_head'].draw(_, player.frame, x, y, flip);
	// armor head
	if(player.armor.head)
		player.armor.head.draw(_, sequence, player.frame, x, y, flip);
	// armor right_wield
	if(player.armor.right_wield)
		player.armor.right_wield.draw(_, sequence, player.frame, x, y, flip);
	// player arm_right
	game.sprites['blue_'+ sequence +'_arm_right'].draw(_, player.frame, x, y, flip);
	// armor arm_right
	if(player.armor.right_arm)
		player.armor.right_arm.draw(_, sequence, player.frame, x, y, flip);
	
}

Player.prototype.equipItem = function (itemId){
	var self = this,
		id = itemId +'',
		item = self.items[id];
	
	if(!item || !item.it){
		return !!user.warn('You don\'t have item ('+ id +')');
	}
	if(!(item.it.armor_space in self.armor)){
		return !!user.warn('You cannot equip item ('+ item.it.name +')');
	}
	
	if(self.armor[item.it.armor_space]){
		self.unequipItem(self.armor[item.it.armor_space].id);
	}
	
	self.armor[item.it.armor_space] = self.items[id].it;
	
	user.notify( item.it.name +' equipped' );
}
Player.prototype.unequipItem = function (itemId){
	var self = this,
		id = itemId +'',
		item = self.items[id];
	
	if(!item || !item.it){
		return !!user.warn('You don\'t have item ('+ id +')');
	}
	
	if(self.armor[item.it.armor_space] == item.it){
		self.armor[item.it.armor_space] = null;
	}
	
	user.notify( item.it.name +' unequipped');
}
Player.prototype.isEquipped = function (itemId){
	var self = this,
		id = itemId +'',
		item = self.items[id];
	
	if(!item || !item.it) return false;
	
	return self.armor[item.it.armor_space] == item.it;
}

Player.prototype.addItem = function (itemId, quantity){
	var self = this,
		it = g.items[itemId +''],
		quantity = quantity || 1;
	
	if(!it){
		user.warn('invalid item: '+ itemId);
		return;
	}
	
	if(!(it.id in self.items)){
		self.items[it.id] = { it: it, quantity: 0 };
	}
	self.items[it.id].quantity += quantity;
	
	user.notify(quantity +' '+ it.name +'(s) added to inventory');
}
Player.prototype.removeItem = function (itemId, quantity){
	var self = this,
		it = self.items[itemId +''],
		quantity = quantity || 1;
	
	if(!it){
		user.warn('You do not have item: '+ itemId);
		return;
	}
	
	self.items[it.id].quantity -= quantity;
	
	if(self.items[it.id].quantity <= 0){
		delete self.items[it.id];
	}
	
	user.notify(quantity +' '+ it.name +'(s) removed from inventory');
}
