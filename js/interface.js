window.mobile = 'standalone' in navigator;
window.addEventListener('load', function (){
	
	window.interfacejs = {};
	
	if(mobile){
		document.body.classList.add('mobile');
	}
	
	// START Start Screen
	(function (){
		
		var start_char = document.getElementById('start_characters'),
			char_table = start_char.querySelector('.character-table'),
			char_list = document.getElementById('character_list'),
			char_ctrls = start_char.querySelector('.character-ctrls'),
			add_char = document.getElementById('add_char'),
			add_char_name = document.getElementById('add_char_name'),
			finish_add_char = document.getElementById('finish_add_char'),
			active_char;
		
		char_table.addEventListener('click', function (ev){
			var target = ev.target || ev.targetElement || ev.srcElement,
				char_id;
			
			while(target && target.nodeName != 'TR'){
				target = target.parentNode;
				if(!target || target === char_table || !target.nodeName) return;
			}
			
			char_id = target.getAttribute('data-char-id');
			
			if(active_char){
				active_char.classList.remove('active');
			}
			
			if(!char_id){
				char_ctrls.classList.remove('show');
				return;
			}
			
			target.classList.add('active');
			active_char = target;
			
			char_ctrls.setAttribute('data-char-id', char_id);
			
			char_ctrls.classList.add('show');
			
		});
		
		if(Object.keys(storage.getJSON('players', {})).length > 3){
			add_char.style.display = 'none';
		}else{
			add_char.style.display = 'block';
		}
		
		add_char.addEventListener('click', function (ev){
			add_char_name.style.display = 'block';
			finish_add_char.style.display = 'block';
			
			active_char && active_char.classList.remove('active');
			char_ctrls.classList.remove('show');
			active_char = null;
			
			add_char_name.focus();
		});
		
		add_char_name.addEventListener('keyup', function (ev){
			var self = this, value = self.value.trim();
			if(value.length < 1){
				finish_add_char.innerText = 'CANCEL';
			}else{
				finish_add_char.innerText = 'CREATE';
			}
			if(ev.keyCode == 13){
				typeof finish_add_char.click == 'function' && finish_add_char.click();
			}
		});
		
		finish_add_char.addEventListener('click', function (ev){
			var name = add_char_name && (add_char_name.value||'').trim();
			if(name && name.length > 0){
				g.createCharacter(name);
				interfacejs.refreshCharacterList();
				add_char_name.value = '';
				finish_add_char.innerText = 'CANCEL';
			}
			add_char_name.style.display = 'none';
			finish_add_char.style.display = 'none';
			
			if(Object.keys(storage.getJSON('players', {})).length > 3){
				add_char.style.display = 'none';
			}else{
				add_char.style.display = 'block';
			}
		});
		
		char_ctrls.addEventListener('click', function (ev){
			var target = ev.target || ev.targetElement || ev.srcElement,
				char_id = char_ctrls.getAttribute('data-char-id'),
				action;
			
			if(!char_id) return;
			
			while(target && !target.classList.contains('char-ctrl')){
				target = target.parentNode;
				if(!target || target === char_ctrls || !target.classList) return;
			}
			
			action = target.getAttribute('data-char-act');
			
			if(action == 'delete'){
				
				g.deleteCharacter(char_id);
				
				interfacejs.refreshCharacterList();
				
				active_char && active_char.classList.remove('active');
				char_ctrls.classList.remove('show');
				active_char = null;
				
				console.log('deleted character: '+ char_id);
				
				if(Object.keys(storage.getJSON('players', {})).length > 3){
					add_char.style.display = 'none';
				}else{
					add_char.style.display = 'block';
				}
				
			}
			else if(action == 'load'){
				
				g.loadCharacter(char_id);
				g.emit('start');
				document.body.setAttribute('data-screen', 'game');
				
				active_char && active_char.classList.remove('active');
				char_ctrls.classList.remove('show');
				active_char = null;
				
				console.log('loading character: '+ char_id);
				
			}
			
		});
		
		setTimeout(function (){
			start_char.classList.add('in');
			setTimeout(function (){
				start_char.classList.add('show');
				setTimeout(function (){
					start_char.classList.add('raise');
				}, 400);
			}, 1000);
		}, 0);
		
		function clocktime (ts){
			return (ts/36e5|0) +':'+ ('0'+(ts%36e5/60e3|0)).slice(-2);
		}
		
		interfacejs.toClockTime = clocktime;
		
		interfacejs.refreshCharacterList = function (){
			var c, chars = storage.getJSON('players'),
				h = [];
			
			for(c in chars){
				if(h.length > 3) break;
				h.push('<tr data-char-id="'+ c +'">'+
					'<td>'+ chars[c].name +'</td>'+
					'<td>'+ chars[c].stats.lvl +'</td>'+
					'<td>'+ clocktime(+chars[c].playtime) +'</td>'+
					'</tr>');
			}
			
			char_list.innerHTML = h.join('');
		}
		
		interfacejs.refreshCharacterList();
		
	}());
	// END Start Screen
	
	// START Touch Controls
	var touch_ctrl = document.getElementById('touch-ctrl'),
		touch_left = document.getElementById('touch-left-ctrl'),
		touch_right = document.getElementById('touch-right-ctrl'),
		touch_up = document.getElementById('touch-up-ctrl');
	
	if(mobile){
		touch_ctrl.classList.add('show');
	}
	
	if(typeof eleKeySim === 'function'){
		eleKeySim(touch_left, 37);
		eleKeySim(touch_right, 39);
		eleKeySim(touch_up, 38);
	}
	// END Touch Controls
	
	// START Player Stats
	var player_stats = document.getElementById('player-stats'),
		lvl_stat = player_stats.querySelector('.stat-lvl'),
		lvl_stat_bar,
		hp_stat = player_stats.querySelector('.stat-hp'),
		hp_stat_bar;
	
	if(lvl_stat) lvl_stat_bar = lvl_stat.querySelector('.bar');
	if(hp_stat) hp_stat_bar = hp_stat.querySelector('.bar');
	
	player_stats.addEventListener('click', function (ev){
		var target = ev.target || ev.targetElement || ev.srcElement;
		
		while(target && !target.classList.contains('p-stat')){
			target = target.parentNode;
			if(target === player_stats) return;
		}
		
		if(target.classList.contains('alt')){
			target.classList.remove('alt');
		}else{
			target.classList.add('alt');
		}
		
		
	});
	
	interfacejs.updateStats = function (){
		var p = g.player,
			lvlinfo;
		if(!p) return;
		
		lvlinfo = g.getLevelInfo(p.lvl);
		
		if(lvl_stat){
			lvl_stat.setAttribute('data-stat', p.lvl);
			lvl_stat.setAttribute('data-stat-alt', p.xp +'/'+ lvlinfo.xp);
			lvl_stat_bar.style.width = (100*p.xp/lvlinfo.xp) +'%';
		}
		
		if(hp_stat){
			hp_stat.setAttribute('data-stat', p.hp +'/'+ lvlinfo.hp);
			hp_stat_bar.style.width = (100*p.hp/lvlinfo.hp) +'%';
		}
		
	}
	// END Player Stats
	
	// START Inventory
	function showInventory (scroll){
		var i, te, pl = g.player;
		
		inv_items.innerHTML = '';
		
		for(i in pl.items){
			te = inv_items.appendChild(document.createElement('div'));
			te.className = 'item';
			te.innerText = pl.items[i].it.name;
			if(pl.items[i].quantity > 1){
				te.innerText += ' ('+ pl.items[i].quantity +')';
			}
			te.setAttribute('data-itemid', i);
			if(pl.isEquipped(i)){
				te.setAttribute('data-equipped', '');
			}
			te.addEventListener('click', (function (itemId){
				return function (ev){
					var el = this;
					if(pl.isEquipped(itemId)){
						pl.unequipItem(itemId);
						el.removeAttribute('data-equipped');
					}else{
						pl.equipItem(itemId);
						el.setAttribute('data-equipped', '');
					}
					showInventory(inv_items.scrollTop);
					g.emit('draw');
				}
			}(i)) );
		}
		
		if(+scroll){
			inv_items.scrollTop = scroll;
			setTimeout(function (){
				inv_items.scrollTop = scroll;
			}, 10);
		}
	}
	
	var inv_button = document.getElementById('inventory_button'),
		inventory = document.getElementById('inventory'),
		inv_items = document.querySelector('.inv_items');
	
	inv_button.addEventListener('click', function (ev){
		var el = this;
		if(inventory.classList.contains('show')){
			el.classList.remove('active');
			touch_ctrl.classList.remove('down');
			inventory.classList.remove('show');
			g.emit('start');
			setTimeout(function (){
				if(!inventory.classList.contains('show')){
					inventory.classList.add('hide');
				}
			}, 200);
		}else{
			inventory.classList.remove('hide');
			touch_ctrl.classList.add('down');
			setTimeout(function (){
				inventory.classList.add('show');
			}, 10);
			el.classList.add('active');
			inv_items.innerHTML = '';
			showInventory();
			g.emit('stop');
		}
	});
	// END Inventory
	
});
