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
Number.prototype.equals = function(options){equalsUtil(this.toString(), options);}


var RNG = {
    number : function(min, max) {
        var byteArray = new Uint32Array(1);
        window.crypto.getRandomValues(byteArray);

        var range = max - min + 1;
        var max_range = 2147483647;
        if (byteArray[0] >= Math.floor(max_range / range) * range)
            return this.number(min, max);
        return min + (byteArray[0] % range);
    },
    // RNG.string([types], length);
    string : function(types, strLength){
        var charSet = '';
        types.forEach(function(val, ind){
            switch(val){
                case 'numbers':
                    charSet += '0123456789';
                break;

                case 'letters':
                    charSet += 'abcdefghijklmnopqrstuvwxyz';
                break;

                case 'special':
                    charSet += '!@#$%^&*()_-+=|}{[]<>,.?~';
                break;

                case 'all':
                    charSet += '!@#$%^&*()_-+=|}{[]<>,.?~abcdefghijklmnopqrstuvwxyz0123456789';
                break;

                default:
                    charSet += val;
            }
        })
        var result = '';
        var setLength = charSet.length-1;
        for (var i = 0; i < strLength; i++) {
            var rngNum = this.number(0, setLength);
            result += charSet[rngNum];
        };

        return result;
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
    emit : function(name, params){
        params = params || false;
        if(name in this.store){
            this.store[name]['callbacks'].forEach(function(cb, ind){
                cb(params);
            });
            if(this.store[name]['type'] == 'once') delete this.store[name];
        }
        else console.error('Eventor.emit() Event "'+name+'" does not exist');
        return this;
    }
}


var windowOrientation = function(events){
    var currentState;
    var throttleEventCounter = 0;

    var changeTo = function(thisOrientation){
        currentState = thisOrientation;
        events[thisOrientation]();
        throttleEventCounter = 0;
    }

    var checkState = function(){
        var windowWidth = window.outerWidth;
        var windowHeight = window.outerHeight;
        if(windowWidth >= windowHeight){
            if(currentState !== 'landscape') changeTo('landscape');
        }
        else{
            if(currentState !== 'portrait') changeTo('portrait');
        }
    }

    checkState();

    window.addEventListener("resize", function(){
        throttleEventCounter++;
        if(!(throttleEventCounter % 3) || throttleEventCounter == 1) checkState();
    });
}


var iterate = function(input, cb){
    if(Array.isArray(input) || typeof input == 'string') for (var i = 0; i < input.length; i++) cb(input[i], i);
    else if(typeof input == 'number') for (var i = 0; i < parseInt(input); i++) { cb(i) };
    else for(key in input) cb(input[key], key);
}


var repeat = function(func, amount, delay, doneCB){
    if(delay == 0 && amount !== 0){
        for (var i = 0; i < amount; i++) func();
        doneCB();
    }
    else if(delay !== 0 && amount !== 0){
        var iteration = 0;
        var thisInterval =
        setInterval(function(){
            iteration++;
            func();
            if(iteration == amount){
                clearInterval(thisInterval);
                doneCB();
            }
        }, delay);

        return thisInterval;
    }
    else console.error('repeat()', 'Both delay and amount are set to 0, I refuse to loop forever! (or firing the callback, you scum)');
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
Array.prototype.removeVal = function(query){ return removeValUtil(this, query, 'array'); }
String.prototype.removeVal = function(query){ return removeValUtil(this, query, 'string'); }


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


String.prototype.ucfirst = function(){ return this.replace(this[0], this[0].toUpperCase()); }


String.prototype.toDashed = function(){
    var newStr = '';
    for (var i = 0; i < this.length; i++) {
        if(this[i] == '_' || this[i] == ' ') newStr += '-';
        else newStr += this[i];
    };
    return newStr;
}


String.prototype.toUnderscore = function(){
    var newStr = '';
    for (var i = 0; i < this.length; i++) {
        if(this[i] == '-' || this[i] == ' ') newStr += '_';
        else newStr += this[i];
    };
    return newStr;
}


String.prototype.filterType = function(type){
    var typeString = {
        letters : '',
        numbers : '',
        special : ''
    }
    var isLetter = function(z) { return z.toLowerCase() != z.toUpperCase(); }
    var isNumber = function(z) { return !isNaN(z); }
    for (var i = 0; i < this.length; i++) {
        if(isLetter(this[i])) typeString['letters'] += this[i];
        else if(isNumber(this[i])) typeString['numbers'] += this[i];
        else typeString['special'] += this[i];
    };
    if(type) return typeString[type];
    else return typeString;
}


Object.prototype.validate = function(cbs){
    if(!('success' in cbs)) console.info('validate()', 'No success callback found');
    if(!('fail' in cbs)) console.info('validate()', 'No fail callback found')
    if(this.nodeName !== "FORM"){
        console.error('validate()', 'Provided element is not a form');
    }
    else{
        this.setAttribute('novalidate', true);

        var ignoreTypes = ['submit', 'button'];

        var validateByType = function(type, value){
            var returnValue = {type : type, isValid : false};
            switch(type){
                case 'number':
                    returnValue['isValid'] = (!isNaN(value));
                break;
                case 'text':
                    returnValue['isValid'] = (value.toLowerCase() != value.toUpperCase())
                break;
                case 'url':
                    var re_weburl = new RegExp(
                          "^" +
                            "(?:(?:https?|ftp)://)" +
                            "(?:\\S+(?::\\S*)?@)?" +
                            "(?:" +
                              "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                              "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                              "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                              "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                              "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                              "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                            "|" +
                              "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
                              "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
                              "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                              "\\.?" +
                            ")" +
                            "(?::\\d{2,5})?" +
                            "(?:[/?#]\\S*)?" +
                          "$", "i"
                        );

                    returnValue['isValid'] = re_weburl.test(value);
                break;
                case 'email':
                    returnValue['isValid'] = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(value);
                break;
            }

            return returnValue;
        }

        this.addEventListener('submit', function(e){
            e.preventDefault();
            var inputs = this.querySelectorAll('input');
            var formIsInvalid = false;
            var invalidInputs = [];
            for (var i = 0; i < inputs.length; i++) {
                var thisInpType = inputs[i].getAttribute('type');
                // Check if it's not a button or submit type
                if(ignoreTypes.includes(thisInpType)){
                    var thisType = inputs[i].getAttribute('data-validate');
                    var thisValue = inputs[i].value;
                    // Later: ADD REQUIRED CHECK!!!!!!
                    var validation = validateByType(thisType, thisValue);
                    if(!validation['isValid']){
                        formIsInvalid = true;
                        invalidInputs.push({type : thisType, node : inputs[i]});
                    }
                }
            };

            if(formIsInvalid) cbs['fail'](invalidInputs);
            else cbs['success'](this);
        }.bind(this))
    }
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

