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
var equalsUtil = function(self, options){
    var keys = Object.keys(options);
    var found = false;
    keys.forEach(function(val, ind){
        if(val.indexOf(',') == -1){
            if(val == self){
                options[val]();
                found = true;
            }
        }
        else{
            var pieces = val.split(',');
            pieces.forEach(function(pieceVal, pieceKey){
                pieceVal = pieceVal.trim();
                if(pieceVal == self){
                    options[val]();
                    found = true;
                }
            })
        }
    })

    if(!found && 'default' in options) options['default']();
}
String.prototype.equals = function(options){equalsUtil(this, options);}
Number.prototype.equals = function(options){equalsUtil(this, options);}


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
        if(name in this.store) this.store[name]['callbacks'].push(cb);
        else{
            this.store[name] = {callbacks : [], type : 'on'};
            this.store[name]['callbacks'].push(cb);
        }
        return this;
    },
    once : function(name, cb){
        if(name in this.store) this.store[name]['callbacks'].push(cb);
        else{
            this.store[name] = {callbacks : [], type : 'once'};
            this.store[name]['callbacks'].push(cb);
        }
        return this;
    },
    off : function(name){
        if(name in this.store) delete this.store[name];
        return this;
    },
    emit : function(name){
        if(name in this.store){
            this.store[name]['callbacks'].forEach(function(val, ind){
                val();
            });
            if(this.store[name]['type'] == 'once') delete this.store[name];
        }
        else console.error('Eventor.emit() Event "'+name+'" does not exist');
        return this;
    }
}


var iterate = function(input, cb){
    if(Array.isArray(input) || typeof input == 'string') for (var i = 0; i < input.length; i++) cb(input[i], i);
    else for(key in input) cb(input[key], key);
}


var containsUtil = function(subject, query){
    if(subject.indexOf(query) === -1) return false;
    else return true;
}
Array.prototype.contains = function(query){return containsUtil(this, query);}
String.prototype.contains = function(query){return containsUtil(this, query);}


var removeValUtil = function(subject, query, type){
    if(type == 'string') return subject.replace(query, '');
    else{
        var index = subject.indexOf(query);
        if(index !== -1) {
            subject.splice(index, 1);
            return subject;
        }
        else return false;
    }
}
Array.prototype.removeVal = function(query){return removeValUtil(this, query, 'array');}
String.prototype.removeVal = function(query){return removeValUtil(this, query, 'string');}


String.prototype.camelCase = function(){
    var newString = '';
    var lastEditedIndex;
    for (var i = 0; i < this.length; i++){
        if(this[i] == ' ' || this[i] == '-' || this[i] == '_'){
            newString += this[i+1].toUpperCase();
            lastEditedIndex = i+1;
        }
        else if(lastEditedIndex !== i) newString += this[i].toLowerCase();
    }
    return newString;
}



// var Pi = function(accuracy){
//    var x = 2;
//       var n = 3; // the variable used to collect the estimation of pi
//       var i = 2; // initial term
//       while(i <= accuracy){
//           if(i % 2 === 0) n += (4 / ( x * ( x + 1) * ( x + 2)));
//        else n -= (4 / ( x * ( x + 1) * ( x + 2)));
//           x += 2;
//           i++;
//       }

//      return n;
// }
// console.log({'Pi (1000 iterations precision)' : Pi(1000)});

