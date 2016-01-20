# My JavaScript Utility Methods
A few pretty useful utility methods, this repo will get updated regularly.

In the examples file you'll find richer examples.


## Contents
- [bigIf](#bigif) Multi if statements.
- [equals](#equals) Alternative switch statement.
- [RNG](#rng) Methods using randon numbers.
- [Eventor](#eventor) Micro global event utility.
- [makeFragment](#makefragment) HTML string to document fragment.
- [searchObjArr](#searchobjarr) Query an array of objects.
- [iterate](#iterate) Loop over a string, array or object.
- [contains](#contains) Check if the array or string contains a value.
- [removeVal](#removeval) Remove a value from the array or string.
- [ucfirst](#ucfirst) Transform the first character of a string to uppercase.


### bigIf
Try multiple if statements, if one fails act accordingly.

```javascript
// In this particular case the second statement fails.
bigIf([(1 == 1), ('derp' == 'herp'), (true == true)], function(){
	console.log('Success! All statements were valid');
},
function(whichCheckFailed){
	// whichCheckFailed == 2
	console.log('Statement '+whichCheckFailed+' failed');
})
```


### equals
Alternative for switch statements

```javascript
'chicken'.equals({
	chicken : function(){
		// Will call this case
		console.log("I'm a chicken!");
	},
	lion : function(){
		console.log("I'm a lion!");
	}
})
```
**TIP: equal and bigIf's fail callback have some synergy**


### RNG
Random number methods using web.crypto() instead of Math.random().

Regular random number method.
```javascript
var randomInt = RNG.number(1, 1000); // Number between 1 and 1000
```

Picks one of the given keys, the values define the odds.
```javascript
var food = {
	// All these values equal 10
	"Pizza" 	: 3, // e.g. this would have a 30% chance to get chosen
	"Spagetti" 	: 1,
	"Burgers" 	: 1,
	"Sushi" 	: 2, // and this 20% chance
	"Chinese" 	: 2,
	"Pussy" 	: 1
}
var chosenFood = RNG.pick(food);
```


### Eventor
Micro global event utility, self explanatory.
```javascript
var events = new Eventor();
// Attatches the event
events.on('testzor', function(){
	console.log('testzor event called');
})

setTimeout(function(){
	// Fires the event
	events.emit('testzor');

	// Removes the event and tries to fire it (which will not work, you'll get notified in the dev console)
	events.off('testzor').emit('testzor');
}, 1500);
```
**NOTE: You can attatch multiple functions to the same event name.**


### makeFragment
Prepare a HTML string for DOM insertion.

```html
var exampleHTML = '<div class="example" id="test"><h2 class="title">This is some example HTML</h2><p class="description">The output of this will be a document fragment</p></div>';
```
```javascript
var exampleFrag = makeFragment(exampleHTML);
// You can now use exampleFrag in lightweight methods like .appendChild()
```


### searchObjArr
Search an array filled with objects for objects that match the given key and value.

```javascript
var thisArrData = [{one : 'derp'}, {two : 'herp'}, {three : 'ferp', uwot : 'm9'}];
var queryMatch = thisArrData.searchObjArr('three', 'ferp'); // {three : 'ferp', uwot : 'm9'}
```


### iterate
Loop over a string, object or array

```javascript
var loopObj = {one : 'test', two : 'test', three : 'test'};
iterate(loopObj, function(value, key){
	console.log(value, key);
})

var loopArr = ['herp', 'derp', 'ferp'];
iterate(loopArr, function(value, index){
	console.log(value, index);
})

var loopStr = 'string';
iterate(loopStr, function(value, index){
	console.log(value, index);
})
```


### contains
Check if an array or string contains the given value

```javascript
var containArr = ['one', 'two', 'three'];
if(containArr.contains('two')) console.log('Array contains "two"');

var containStr = 'some random string';
if(containStr.contains('uwot')) console.log('String contains "uwot"');
else console.log('String doesn\'t contain "uwot"');
```


### removeVal
Remove the given value from an array or string

```javascript
var spliceArr = ['one', 'two', 'three'];
console.log(spliceArr.removeVal('two'));

var spliceStr = 'some random string';
console.log(spliceStr.removeVal('some'));
```


### ucfirst
Transform the first letter of the given string to uppercase.

```javascript
'ducks'.ucfirst(); // Ducks
```


