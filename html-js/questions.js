var obj = {
	num: 'aaa',
	fn:function(){
		console.log(this);
		var fn1=function(){
			console.log(this);
			setTimeout(()=>{
				console.log(this)
			})
		}
		fn1();
	}
}
obj.fn();

var obj = {
	num: 'aaa',
	fn:function(){
		console.log(this);
		var fn1=() => {
			console.log(this);
			setTimeout(() => {
				console.log(this)
			})
		}
		fn1();
	}
}
obj.fn();

async function async1() {
    console.log("1");
    await  async2();
    console.log("2");
}
async  function async2() {
   console.log( '3');
}
async1();
console.log("4");
setTimeout(function () {
    console.log("5");
},0);
new Promise(function (resolve) {
    console.log("6");
    resolve();
}).then(function () {
    console.log("7");
});
console.log('8');
 // --> 4 1 3 6 8 7 2 5
  
  
(function() {
	var a = b = 1;
}())
console.log(a !== 'undefined'); //false
console.log(b !== 'undefined'); //true

function Foo() {
	getName = function() { console.log(1); };
	return this;
}
Foo.getName = function() { console.log(2); };
Foo.prototype.getName = function() { console.log(3); };
var getName = function() { console.log(4); };
function getName() { console.log(5); };
Foo.getName(); //2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3
  
function fn() {
	y = function() {
		X = 2;
	};
	return function() {
		var x = 3;
		y();
		console.log(this.X); 
	}.apply(this, arguments);
}
fn();//2

var length = 10;
function fn() {
	console.log(this.length);
}
var obj = {
	length: 5,
	methods: function(fn) {
		fn(); 
		arguments[0](); 
	}
}
obj.methods(fn, 1);
  
//冒泡排序
var arr = [2, 1, 4, 6, 5, 7, 2];
function sort(arr) {
	var len = arr.length,
	    temp;
	for(var i = len; i>= 2; i--) {
		for(var j = 0; j < i - 1; j++) {
			if(arr[j+1] < arr[j]) {
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
	return arr;
}

var arr2 = sort(arr);
var arr3 = arr2.reverse();


var dad = {};
var son = {};
function show() {
	return this;
}

var newShow = show.bind(dad);
var newShow1 = newShow.bind(son);
console.log(newShow() == dad);
console.log(newShow1() == son);

console.log(1 + '2' + '2' );
console.log(1 + + '2' + '2');
console.log(1 + - '1' + '2');
console.log(+ '1' + '1' + '2');
console.log('A' - 'B' + '2');
console.log('A' - 'B' + 2);


function makeNoSense(x) {
	this.x = x;
}
makeNoSense(5);
console.log(x);
function test() {
	this.x = 1;
	console.log(this.x);
}
test();


var bar = 1;
function fn(bar) {
	bar = 2;
	console.log(bar);
}
fn(bar);
console.log(bar);


/*  斐波那契数列的实现
实现一个fibonacci函数, 要求其参数和返回值如下
fibonacci数列为[1, 1, 2, 3, 5, 8, 13, 21, 34 ...]
则getNthFibonacci(0)返回值1;
则getNthFibonacci(4)返回值为5
*/
function getNthFibonacci(count){
	return count < 2 ? 1 : getNthFibonacci(count - 1) + getNthFibonacci(count - 2);
}
for(var i = 0; i < 9; i++){
	console.log(getNthFibonacci(i));
}

如何通过正则表达式使字符串 'abab' 变成 'baba'
var reg = /(\w)(\w)\1\2/g;
str.replace(reg, function($, $1, $2) {
	return $2 + $1 + $2 + $1;
})

js有哪些内置对象
	数据封装类对象：Object、Array、Boolean、Number、String
	其他对象： Function、Arguments、Math、Date、RegExp、Error

线程与进程的区别？
	一个程序至少有一个进程, 一个进程至少有一个线程
	线程的划分尺度小于进程, 使得多线程程序的并发性, 另外, 进程在执行过程中拥有独立的内存单元,
	而多个线程共享内存, 从而极大地提高了程序的运行效率。
	线程在执行过程中与进程还是有区别的, 每个独立的线程有一个程序运行的入口, 顺序执行序列和程序的出口。
	但是线程不能够独立运行, 必须依存在应用程序中, 由应用程序提供多个线程执行控制。
	从逻辑角度来看, 多线程的意义在于一个应用程序中, 有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用,
	来实现进程的调度和管理以及资源分配。
如何克隆一个对象
	function remove(arr, item) {
		return arr.fillter(function(x) {
			return (x!=item);
		})
	}


打印[1, 2, 3].map(parseInt)

类数组转化为数组 Array.prototype.slice.call(Arr)

hasOwnProperty返回一个布尔值，指出一个对象是否具有制定名称的属性

var x = 1;
var y = 2;
function show() {
	var x = 3;
	return {
		x: x,
		fun: function(a, b) {
			x = a + b;
		}
	}
}
var obj = show();
obj.fun(x, y);
console.log(obj.x);
console.log(x);
    
//打印重复的个数
function distinction(str) {
	var obj = {}
	return (function() {
		for(var i = 0; i < str.length; i++) {
			var v = str.charAt(i);
			if(obj[v] && obj[v].value == v) {
				obj[v].count = ++obj[v].count;
			}else{
				obj[v] = {}
				obj[v].count = 1;
				obj[v].value = v;
			}
		}
		return obj;
	}())
}
var str = 'aaabbbbbdddddefff';
console.log(distinction(str));
    
function Point(x, y) {
	this.x = x;
	this.y = y;
	this.moveTo = function(x, y) {
		console.log(this.x, this.y);
	}
}
var p1 = new Point(0, 0);
var p2 = { x:0, y:0 };
p1.moveTo(1, 1);
p1.moveTo.apply(p2, [10, 10]);


function a(xx) {
	this.x = xx;
	return this;
}
var x = a(5);
var y = a(6);
console.log(x.x);
console.log(y.y);

var a = 1;
var b = 2[a, b] = [b, a];
console.log(a, b)

var num = 10;
var obj = {
	num: 0,
	inner: {
		num: 6,
		print: function() {
			console.log(this.num)
		}
	}
}
num = 88;
obj.inner.print();
var fn = obj.inner.print;
fn();
(obj.inner.print)();
(obj.inner,print = obj.inner.print)();




