require('./style.scss');
var Point = require('./Point.js');
var Person = require('./Person.js');
var content = require('./content');

var p = new Point(5,10);
var wei = new Person('wei');
content.fullName('Li', 'Chen222');
document.write('It works');
console.log(p.toString());
console.log(wei.sayName());
