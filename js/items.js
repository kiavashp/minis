g = g || new EventEmitter;

function Item (options){
	var k, item = this;
	for(k in options)
		item[k] = options[k];
}
Item.prototype.draw = function (slot, context, sequence, frame, x, y, flip){
	
	var item = this;
	
	if(!item.armor_slots[slot] || !item.armor_slots[slot][sequence]) return false;
	
	item.armor_slots[slot][sequence].draw(context, frame, x, y, flip);
	
	/*
	Sprite.prototype.draw:
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
	*/
}

g.items = {};
g.additem = function (id, name, item){
	for(var s in item.sprites){
		if(!(item.sprites[s] instanceof Sprite)){
			item.sprites[s] = g.sprites[item.sprites[s] +''];
		}
	}
	
	item.id = id;
	item.name = name;
	g.items[id] = new Item(item);
	return g.additem.bind(g);
}

g.additem(
	
	'001', "Grey Hood", {
		isarmor: true,
		armor_slots: {
			behind_head: null,
			head: {
				'idle': g.sprites['grey_idle_hood'],
				'run': g.sprites['grey_run_hood'],
				'fall': g.sprites['grey_fall_hood']
			}
		}
	})(
	
	'002', "White Bandana", {
		isarmor: true,
		armor_slots: {
			behind_head: null,
			head: {
				'idle': g.sprites['white_idle_bandana'],
				'run': g.sprites['white_run_bandana'],
				'fall': g.sprites['white_fall_bandana']
			}
		}
	})(
	
	'003', "Gold Crown", {
		isarmor: true,
		armor_slots: {
			behind_head: null,
			head: {
				'idle': g.sprites['gold_idle_crown'],
				'run': g.sprites['gold_run_crown'],
				'fall': g.sprites['gold_fall_crown']
			}
		}
	})(
	
	'004', "Steel Dagger", {
		isarmor: true,
		armor_slots: {
			right_wield: {
				'idle': g.sprites['steel_idle_dagger'],
				'run': g.sprites['steel_run_dagger'],
				'fall': g.sprites['steel_fall_dagger']
			}
		}
	})(
	
	'005', "Steel Sword", {
		isarmor: true,
		armor_slots: {
			right_wield: {
				'idle': g.sprites['steel_idle_sword'],
				'run': g.sprites['steel_run_sword'],
				'fall': g.sprites['steel_fall_sword']
			}
		}
	})(
	
	'006', "Dark Shoulder", {
		isarmor: true,
		armor_slots: {
			left_arm: null,
			right_arm: {
				'idle': g.sprites['dark_idle_arm_right'],
				'run': g.sprites['dark_run_arm_right'],
				'fall': g.sprites['dark_fall_arm_right']
			}
		}
	})(
	
	'007', "Dark Plate", {
		isarmor: true,
		armor_slots: {
			chest: {
				'idle': g.sprites['dark_idle_chest'],
				'run': g.sprites['dark_run_chest'],
				'fall': g.sprites['dark_fall_chest']
			}
		}
	})(
	
	'008', "Red Mage Book", {
		isarmor: true,
		armor_slots: {
			left_wield: {
				'idle': g.sprites['red_idle_book'],
				'run': g.sprites['red_run_book'],
				'fall': g.sprites['red_fall_book']
			}
		}
	})(
	
	'009', "Dark Mage Hat", {
		isarmor: true,
		armor_slots: {
			behind_head: {
				'idle': g.sprites['dark_idle_magehat_behind'],
				'run': g.sprites['dark_run_magehat_behind'],
				'fall': g.sprites['dark_fall_magehat_behind']
			},
			head: {
				'idle': g.sprites['dark_idle_magehat'],
				'run': g.sprites['dark_run_magehat'],
				'fall': g.sprites['dark_fall_magehat']
			}
		}
	});
