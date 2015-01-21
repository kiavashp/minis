function EventEmitter (){
	this.listeners = {};
}
EventEmitter.prototype.on = function (e,f){
	e+='';
	var l=this.listeners;l=l[e]=l[e]||[];
	return typeof f=='function'?l.push(f):false;
}
EventEmitter.prototype.once = function (e,f){
	e+='';
	var l=this.listeners;l=l[e]=l[e]||[];
	return typeof f=='function'
		?l.push(function n (){f.apply(this,arguments);this.off(e,n)})
		:false;
}
EventEmitter.prototype.off = function (e,f){
	e+='';
	var l=this.listeners,i=(l=l[e]=l[e]||[]).indexOf(f);
	return !!(~i&&l.splice(i,1));
}
EventEmitter.prototype.emit = function (e){
	var f=0,l=this.listeners,a=Array.prototype.slice.call(arguments,1);
	for(e+='',l=l[e]=l[e]||[];f<l.length;f++)l[f].apply(this,a);
	if(e=='error'&&!f) throw a[0] instanceof Error?a[0]:Error(a[0]);
}
EventEmitter.prototype.removeAllListeners = function (e){
	var l=this.listeners;
	e+=''?l[e]=[]:this.listeners={};
}

typeof module !== 'undefined' && (module.exports = EventEmitter);
