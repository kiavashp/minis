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
	
	var players = storage.getJSON('players', {});
	
	g.saveCharacter = function (playername){
		if(typeof playername === 'undefined'){
			if(g.player && g.player.name) playername = g.player.name;
		}
		if(!(playername in players)) return false;
		
		var s = {}, i, a;
		
		s.name = playername;
		
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
		  if(g.player.armor[a]){
			s.items.armor.push(g.player.armor[a].id);
		  }
		}
		
		players[playername] = s;
		storage.setJSON('players', players);
		return true;
	}
	
	g.loadCharacter = function (playername){
		players = storage.getJSON('players');
		if(!(playername in players)) return false;
		
		var player = players[playername],
			popt = {},
			i, a;
		
		if(!player.name) player.name = playername;
		popt.name = player.name;
		
		if(typeof player.stats == 'object'){
			if(typeof player.stats.lvl === 'number') popt.lvl = player.stats.lvl;
			if(typeof player.stats.xp === 'number') popt.xp = player.stats.xp;
			if(typeof player.stats.hp === 'number') popt.hp = player.stats.hp;
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
		
		return true;
	}
	
	g.createCharacter = function (playername){
		players[playername] = {};
	}
	
}());
