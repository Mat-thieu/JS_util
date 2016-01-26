# My JavaScript Utility Methods
A few pretty useful utility methods, this repo will get updated regularly.

In the examples file you'll find richer examples.


## Contents

**Uncategorized methods**
- [bigIf](#bigif) Multi if statements.
- [equals](#equals) Alternative switch statement.
- [RNG](#rng) Methods using random numbers.
- [Eventor](#eventor) Micro global event utility.
- [repeat](#repeat) Extended interval function.


**DOM utility methods**
- [makeFragment](#makefragment) HTML string to document fragment.


**Array and Object methods**
- [searchObjArr](#searchobjarr) Query an array of objects.
- [iterate](#iterate) Loop over a string, array or object.
- [contains](#contains) Check if the array or string contains a value.
- [removeVal](#removeval) Remove a value from the array or string.


**String manipulation**
- [ucfirst](#ucfirst) Transform the first character of a string to uppercase.
- [camelCase](#camelcase) Transform a string to camelCase.


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
	},
	'chicken, lion' : function(){  // NOTE: Multi cases have to be a string, seperate the cases by a comma.
		// Will also call this case
		console.log("I'm an animal!");
	},
	default : function(){
		console.log("Default case called!");
	}
}
})
```
**TIP: equal and bigIf's fail callback work really well together.**


### RNG
Random number methods using web.crypto() instead of Math.random().

Regular random number method.
```javascript
var randomInt = RNG.number(1, 1000); // Number between 1 and 1000
```

Generate a random string.
```javascript
var randomStr = RNG.string(['letters', 'numbers'], 30); // Random string using letters and numbers, 30 chars long.
```
You can use the options **letters**, **numbers**, **special**, **all** or define your own set of characters.
```javascript
var randomStr = RNG.string(['!$@?', 'numbers'], 10) // Random string using the defined chars and numbers, 10 chars long.
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

// Attaches the event
events.on('testzor', function(){
	// Actions when event 'testzor' gets called
});

// Attach an event, once called it'll remove itself
events.once('onceTest', function(){
	// Actions
})

setTimeout(function(){
	// Fires the event
	events.emit('testzor');

	// Second emit will fail
	events.emit('onceTest').emit('onceTest');

	// Removes the event and tries to fire it (which will not work, you'll get notified in the dev console)
	events.off('testzor').emit('testzor');
}, 1500);
```
**NOTE: You can attatch multiple functions to the same event name.**


### repeat
Fire a function in intervals until it hits the given amount, then fire the callback
```javascript
var repeatExample = function(){ console.log('Fired repeatExample()') }
repeat(repeatExample, 5, 250, function(){
	console.log('Done');
})
// Will fire repeatExample() 5 times with 250ms pauses, will fire the callback after 1250 ms.
```

Setting the amount to 0 will set amount to infinite, to clear the interval you have to bind repeat to a variable.
```javascript
var thisRepeat =
repeat(function(){console.log('No one shall stop me!')}, 0, 500, function(){
	console.log('I will not get fired :c');
});

clearInterval(thisRepeat);
```
Setting the delay to 0 will simply loop the given method.


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
	// value == each value in the object
	// key == each key in the object
})

var loopArr = ['herp', 'derp', 'ferp'];
iterate(loopArr, function(value, index){
	// value == each value in the array
})

var loopStr = 'string';
iterate(loopStr, function(value, index){
	// value == each letter in the string
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
Remove the given value from an array or string, returns false if the value

```javascript
var spliceArr = ['one', 'two', 'three'];
spliceArr.removeVal('two'); // ['one', 'three']

var spliceStr = 'some random string';
spliceStr.removeVal('some'); // 'random string'
```


### ucfirst
Transform the first letter of the given string to uppercase.

```javascript
'ducks'.ucfirst(); // Ducks
```


### camelCase
Transform a string to camelCase (removing all "-", "_" and " " characters and replacing the character following the stripped character by uppercase)

```javascript
'weird-looking string with spaces and_some_underscores'.camelCase(); // weirdLookingStringWithSpacesAndSomeUnderscores
```

### toDashed
Transform all spaces and underscores in a string to dashes

```javascript
'weird-looking string with spaces and_some_underscores'.toDashed(); // weird-looking-string-with-spaces-and-some-underscores
```


### toUnderscore
Transform all spaces and dashes to underscores

```javascript
'weird-looking string with spaces and_some_underscores'.toUnderscore(); // weird_looking_string_with_spaces_and_some_underscores
```


