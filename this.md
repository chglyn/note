---
title: this的指向
date: 2017-03-08
categories:
- note-this
---
this指向大致分为以下4种情况：
1、作为对象的方法调用
2、作为普通函数调用
3、构造器调用
4、Function.prototype.call或者Function.prototype.apply调用

分别介绍下
### 作为对象的方法调用
当函数作为对象的方法调用时，this指向该对象。
``` bash

var obj = {
	a:1,
	gegtA: function() {
		console.log(this === obj); //true
		console.log(this.a); //1
	}
}

obj.getA();

```
### 作为普通函数调用
当函数不作为对象的属性被调用时，就是常说的普通函数方式，此时的this总是指向全局对象。在JavaScript里，全局对象是window对象。
``` bash
window.name = 'globalName';

var gegtName = function() {
	return this.name;
};

console.log(getName()); //globalName

或者：

window.name = 'globalName';

var myObject = {
	name: 'Json',
	getName: function() {
		return this.name;
	}
};

var getName = myObject.getName;

console.log(getName()); //globalName

```
有时会遇到一些困扰，比如div节点的事件函数内部，有个局部的callback方法，callback被作为普通函数调用时，callback内部的this指向了window，但我们往往是想让它指向该div节点；比如：
``` bash
//HTML
...

<body>
	<div id="div1">节点</div>
</body>
...

//JS：
window.id = 'window';

document.getElementById('div1').onclick = function() {
	console.log(this.id); //div1
	var callback = function() {
		console.log(this.id); //window
	}
	callback();	
}

```
有一种简单方法解决方案，可以用一个变量保存div节点引用。
``` bash

document.getElementById('div1').onclick = function() {
	console.log(this.id); //div1
	var that = this; //保存div的引用
	var callback = function() {
		console.log(that.id); //div1
	}
	callback();	
}

```
在ECMAScript5的strict模式下，这种情况下this被规定为不会指向全局对象，而是undefined;
``` bash

function func() {
	'use strict'
	coonsole.log(this); //undefined;
}

func();

```
### 构造器调用
JS中木有类，但可以从构造器中创建对象，同时也提供了new运算符。使得构造器看起来像一个类。
除了宿主提供的一些内置函数，大部分JS函数都可以当作构造器使用。构造器的外表跟普通函数一模一样，区别在于被调用的方式。当用new运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里的this就指向返回的这个对象，如下：
``` bash

var myClass = function() {
	this.name = 'chglyn';
}

var obj = new myClass();

console.log(obj.name); //chglyn

```
但用new调用构造器时，注意一个问题，如果构造器显式地返回了一个object类型的对象，那么此次运算结果最终会返回这个对象，而不是之前期待的this，如下：
``` bash

var myClass = function() {
	this.name = 'chglyn';
	return { //显式地返回一个对象
		name: 'Json'
	}
}

var obj = new myClass();

console.log(obj.name); //Json

```
如果构造器不显式地返回任何数据，或者试返回一个非对象类型的数据，就不会造成上述问题，如下：
``` bash

var myClass = function() {
	this.name = 'chglyn'
	return 'Json';
}

var obj = new myClass();

console.log(obj.name); //chglyn

```
### Function.prototype.call或者Function.prototype.apply调用
跟普通的函数调用相比，用Function.prototype.call或者Function.prototype.apply可以动态地改变传入函数的this，如下：
``` bash
var obj1 = {
	name: 'chglyn',
	getName: function() {
		return this.name;
	}
};

var obj2 = {
	name : 'Json'
};

console.log(obj1.getName); // chglyn
console.log(obj1.getName.call(obj2)); //Json

```
call和apply方法能很好的体现JS函数式语言特征，在JS中，几乎每一次编写函数式语言风格的代码，都不会离开call和apply。在JS诸多版本设计模式中，也用到了call和apply。有时间再分析下call和apply。^_^

###  丢失的this
这个是经常遇到的问题，如下：
``` bash
var obj = {
	name: 'chglyn',
	getName: function() {
		return this.name;
	}
};

var obj2 = {
	name : 'Json'
};

console.log(obj1.getName); // chglyn

var getName2 = obj.getName;
console.log(getName2()); //undefined

```
当调用obj.getName时，getName方法是作为obj对象的属性被调用的，此时的this指向obj对象，所以obj.getName()打印'chglyn'。
当用另外一个变量getName2来引用obj.getName，并调用getName2时，此时是普通函数调用方式，this是指向全局window的，所以打印undefined。
再看另一个栗子，如下：
``` bash
var getId = function(id) {
	return document.getElementById(id);
}

getId('div1');

```
也许会思考为什么不用下面方法：
``` bash
var getId = document.getElementById;

getId('div1');

```
在Chrome、Firefox、IE10中执行会报错，这是因为许多引擎的document.getElementById方法的内部实现中需要用到this。这个this本身就指向document，当getElementById方法作为document对象的属性被调用时，方法内部的this确实是指向document的。
当用getId引用document.getElementById之后，再调用getId，此时就成了普通函数调用，函数内部的this指向了window，而不是document。
可以利用apply把document当作this传入getId函数，帮助修正this，如下：
``` bash

document.getElementById = (function(func) {
	return function() {
		return func.apply(document, arguments);
	}
})(document.getElementById);

var getId = document.getElementById;

var div = getId('div1');

console.log(div.id); //div1

```