# My JavaScript Utilities
A few pretty useful utility methods, this repo will get updated regularly.
In the examples file you'll find richer examples.


## bigIf
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


## equals
Alternative for switch statements

```javascript
'derp'.equals({
	derp : function(){
		// Will call this case
		console.log('equals()', 'exampleString == derp');
	},
	herp : function(){
		console.log('equals()', 'exampleString == herp');
	}
})
```
**TIP: equal and bigIf's fail callback have some synergy**


## RNG
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


## events
Little global event utility, self explanatory.
```javascript
// Attatches the event
events.on('testzor', function(){
	console.log('events.on()', 'testzor called');
})

setTimeout(function(){
	// Fires the event
	events.fire('testzor');

	// Removes the event
	events.off('testzor');

	// This will give an error
	events.fire('testzor');
}, 1500);
```
**NOTE: You can attatch multiple functions to the same event name.**


## makeFragment
Prepare a HTML string for DOM insertion.

```html
var exampleHTML = '<div class="example" id="test"><h2 class="title">This is some example HTML</h2><p class="description">The output of this will be a document fragment</p></div>';
```
```javascript
var exampleFrag = makeFragment(exampleHTML);
// You can now use exampleFrag in lightweight methods like .appendChild()
```


## searchObjArr
Search an array filled with objects for objects that match the given key and value.

```javascript
var thisArrData = [{one : 'derp'}, {two : 'herp'}, {three : 'ferp', uwot : 'm9'}];
var queryMatch = thisArrData.searchObjArr('three', 'ferp'); // {three : 'ferp', uwot : 'm9'}
```


## ucfirst
Transform the first letter of the given string to uppercase.

```javascript
'ducks'.ucfirst(); // Ducks
```


