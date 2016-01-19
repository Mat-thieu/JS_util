var bigIf = function(statements, successCB, failCB){
	var isValid = true;
	statements.some(function(val, index){
		if(val) return false;
		else{
			isValid = false;
			failCB(index+1);
			return true;
		}
	})

	if(isValid) successCB();
}


var makeFragment = function(outerHTML){
	var temp = document.createElement('span');
	var frag = document.createDocumentFragment();
	temp.innerHTML = outerHTML;
	frag.appendChild(temp.firstChild);

	return frag;
}


Array.prototype.searchObjArr = function(key, val){
    var matches = [];
    this.forEach(function(thisVal, thisInd){
        if(thisVal[key] == val) matches.push(thisVal);
    })
    return matches;
}


String.prototype.ucfirst = function(){
    return this.replace(this[0], this[0].toUpperCase());
}


// String.equals() / Number.equals()
var equalsUtil = function(self, args){
	var keys = Object.keys(args[0]);
	keys.some(function(val, ind){
		if(val == self){
			args[0][val]();
			return false;
		}
	})
}
String.prototype.equals = function(){equalsUtil(this, arguments);}
Number.prototype.equals = function(){equalsUtil(this, arguments);}


var RNG = {
	number : function(min, max){
		if(min && max){
		    var byteArray = window.crypto.getRandomValues(new Uint32Array(1))[0];
		    var range = max - min + 1;
		    var max_range = 2147483647;
		    if (byteArray >= Math.floor(max_range / range) * range)
		        return this.number(min, max);
		    return min + (byteArray % range);
		}
		else return window.crypto.getRandomValues(new Uint32Array(1))[0];
	},
	pick : function(data){
		var maxInt = 0;
		var candidateArr = [];
		for(name in data){
			var thisChanceValue = parseInt(data[name]);
			maxInt += thisChanceValue;
			for (var i = 0; i < thisChanceValue; i++) candidateArr[candidateArr.length] = name;
		}
		var chosen = this.number(1, maxInt)-1;
		return candidateArr[chosen];
	}
}


var Eventor = function(){
	this.store = {};
}
Eventor.prototype = {
	on : function(name, cb){
		if(name in this.store) this.store[name].push(cb);
		else{
			this.store[name] = [];
			this.store[name].push(cb);
		}

		return this;
	},
	off : function(name){
		if(name in this.store) delete this.store[name];
		return this;
	},
	emit : function(name){
		if(name in this.store) this.store[name].forEach(function(val, ind){val();});
		else console.error('Eventor.emit() Event',name,'does not exist');
		return this;
	}
}
