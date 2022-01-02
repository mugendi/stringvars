# Motivation
Have you ever wanted to transmit variables or arguments in a simple human readable string yet have them converted back to variables with their correct datatypes?

For example, the string: ```"Jeniffer,asl,24, female, Nairobi\\,Kenya"``` becomes 

```javascript
[ 'Jeniffer', 'asl', 24, ' female', ' Nairobi,Kenya' ] 
```

Note:
- ```24``` was accurately detected as a number and type-cased accurately.
- ```" female"``` was not trimmed so all white space is respected
- The comma in ```"Nairobi,Kenya"``` needed to be escaped. This is because, when using "," as the separation character, then **Nairobi** and **Kenya** would be split to two strings. 

## Possible Use Cases

I created this module as a part of a larger project. I needed users to enter values as simple strings which then are read back into an array with correct type-casting for further use with [Object Quiz](https://www.npmjs.com/package/object-quiz).

Id you find this useful, I'm curious to hear your use case.

## Gotchas

It is important to note that this module uses JSON.parse internally for type casting. As such, only data types supported by JSON can be correctly handled. Any other values will be casted to the string equivalent. Example:
```javascript
"undefined" 
//becomes '"undefined"' because the undefined type is not supported
``` 

# How To use Module

```javascript
const stringVars = require('stringvars');
const query = 'Jeniffer,asl,24, female, Nairobi\\,Kenya'
const args = stringVars(query)
console.log(args);

// [ 'Jeniffer', 'asl', 24, ' female', ' Nairobi,Kenya' ] 
// You can now use the returned array as you wish

```

## Want a different Separation Character?
If you have many string variables like ```"Nairobi,Kenya``` above, and are tired of escaping all the commas, you can alternatively change the separation character.

To do so, simply pass your desired character as the second argument like this:

```javascript
const stringVars = require('stringvars');
const query = 'Jeniffer|asl|24| female| Nairobi,Kenya'
const args = stringVars(query, '|')
console.log(args);

// [ 'Jeniffer', 'asl', 24, ' female', ' Nairobi,Kenya' ] 
```

## Organize values into blocks of arrays
You can group values into arrays by encapsulating them with square brackets. 

```javascript
const stringVars = require('stringvars');
const query =  "a,b,[1,2,453.55],f"
const args = stringVars(query)
console.log(args);
// [ 'a', 'b', [ 1, 2, 453.55 ], 'f' ]
```

Simple as that!
