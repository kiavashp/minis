window.mobile = 'standalone' in navigator;
window.addEventListener('load', function (){
	
	if(mobile) document.body.classList.add('mobile');
	
	// START Touch Controls
	var touch_ctrl = document.getElementById('touch-ctrl'),
		touch_left = document.getElementById('touch-left-ctrl'),
		touch_right = document.getElementById('touch-right-ctrl'),
		touch_up = document.getElementById('touch-up-ctrl');
	
	if(mobile && touch_ctrl){
		touch_ctrl.style.display = 'block';
	}
	
	if(typeof eleKeySim === 'function'){
		eleKeySim(touch_left, 37);
		eleKeySim(touch_right, 39);
		eleKeySim(touch_up, 38);
	}
	// END Touch Controls
	
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
	
	inv_button.addEventListener('click', function (){
		var el = this;
		if(inventory.classList.contains('show')){
			el.classList.remove('active');
			inventory.classList.remove('show');
			g.emit('start');
			setTimeout(function (){
				if(!inventory.classList.contains('show')){
					inventory.classList.add('hide');
				}
			}, 200);
		}else{
			inventory.classList.remove('hide');
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
