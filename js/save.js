g = g || new EventEmitter;

(function (){
	
	window.storage = {};
	storage.getJSON = function (item, def){
		var j = def, d = localStorage.getItem(item);
		try{ j = JSON.parse(d) }catch(e){ };
		return j || {};
	}
	storage.setJSON = function (item, data){
		var d = JSON.stringify({});
		if(typeof data !== 'string')
			try{ d = JSON.stringify(data) }catch(e){  }
		localStorage.setItem(item, d);
	}
	
	var lastsave = null,
		players = storage.getJSON('players', {});
	
	storage.setJSON('player', players);
	
	time_updates = {}
	
	g.saveCharacter = function (playername){
		if(typeof playername === 'undefined'){
			if(g.player && g.player.name) playername = g.player.name;
		}
		if(!(playername in players)) return false;
		
		var d = Date.now(), s = {}, i, a;
		
		s.name = playername;
		
		players[playername].playtime += time_updates[s.name]?d-time_updates[s.name]:0;
		time_updates[playername] = d;
		
		s.savetime = d;
		s.playtime = players[playername].playtime;
		
		s.stats =  { lvl: null, xp: null, hp: null };
		s.loc = { map: null, coor: null };
		s.items = { inv: null, armor: [] };
		
		s.stats.lvl = g.player.lvl;
		s.stats.xp = g.player.xp;
		s.stats.hp = g.player.hp;
		
		s.loc.map = g.map || 1;
		s.loc.coor = [ g.player.x, g.player.y ];
		s.loc.flip = g.player.flip;
		
		s.items.inv = {};
		for(i in g.player.items){
			s.items.inv[i] = g.player.items[i].quantity;
		}
		s.items.armor = [];
		for(a in g.player.armor){
		  if(g.player.armor[a].item){
			s.items.armor.push(g.player.armor[a].item.id);
		  }
		}
		
		players[playername] = s;
		storage.setJSON('players', players);
		interfacejs.refreshCharacterList();
		return true;
	}
	
	g.loadCharacter = function (playername){
		players = storage.getJSON('players');
		if(!(playername in players)) return false;
		
		var d = Date.now(),
			player = players[playername],
			popt = {},
			i, a, lvlinfo;
		
		if(!player.name) player.name = playername;
		popt.name = player.name;
		
		if(!player.playtime) player.playtime = 0;
		
		time_updates[player.name] = d;
		
		if(typeof player.stats == 'object'){
			if(typeof player.stats.lvl === 'number'){
				popt.lvl = player.stats.lvl;
				lvlinfo = g.getLevelInfo(popt.lvl);
			}
			if(typeof player.stats.xp === 'number') popt.xp = player.stats.xp;
			if(typeof player.stats.hp === 'number'){
				popt.hp =  Math.min(player.stats.hp, lvlinfo.hp);
			}
		}
		
		if(typeof player.loc === 'object'){
			if(Array.isArray(player.loc.coor)){
				if(typeof player.loc.coor[0] === 'number') popt.x = player.loc.coor[0];
				if(typeof player.loc.coor[1] === 'number') popt.y = player.loc.coor[1];
			}
			if(typeof player.loc.flip === 'boolean') popt.flip = player.loc.flip;
		}
		
		g.player = new Player( popt );
		
		if(typeof player.items === 'object'){
			if(typeof player.items.inv === 'object'){
				for(i in player.items.inv){
					g.player.addItem(i, player.items.inv[i], true);
				}
				if(Array.isArray(player.items.armor)){
					for(a=0;a<player.items.armor.length;a++){
						g.player.equipItem(player.items.armor[a], true);
					}
				}
			}
		}
		
		interfacejs.updateStats();
		
		return true;
	}
	
	g.createCharacter = function (playername){
		if(playername in players) return false;
		if(Object.keys(players).length > 3) return false;
		players[playername] = {
			name: playername,
			stats: { lvl: 1, xp: 0, hp:100 },
			loc: { map: 1, coor: [], flip: false },
			items: { inv: {}, armor: [] }
		};
		for(var i in g.items) players[playername].items.inv[i] = 1;
		
		storage.setJSON('players', players);
		if(typeof interfacejs === 'object' 
			&& typeof interfacejs.refreshCharacterList === 'function'){
			interfacejs.refreshCharacterList();
		}
	}
	
	g.deleteCharacter = function (playername){
		if(!(playername in players)) return false;
		delete players[playername];
		storage.setJSON('players', players);
		interfacejs.refreshCharacterList();
	}
	
	window.onbeforeunload = function (){
		g.saveCharacter();
	}
	
	window.addEventListener('click', function (){
		if(!lastsave || lastsave < Date.now() - 30e3){
			g.saveCharacter();
			lastsave = Date.now();
		}
	});
	
}());
