ES6   ->  ECMA  标准

js

ES7  ES8.....

ES5.x

ECMA-262       ->   ES1.0
--------------------------------------------
ES2015

ES6  ->   2015年6月    ES6.0

每年6月份，发布一个版本

	2016年6月    ES6.1	ES7		ES2016
	2017年6月    ES6.2(async await)	ES8		ES2017

	ESnext
---------------------------------------------
ESnext	'下一代 js'语言
----------------------------------------------
任何人都可以向 标准委员会 (TC39), 要求更改语言标准

提案变成标准，经历5个阶段
	Stage 0	展示阶段
	Stage 1	征求意见阶段
	Stage 2	草案阶段
	Stage 3	候选阶段
	Stage 4	定案阶段(标准)

babel
----------------------------------------------
https://github.com/tc39/ecma262

----------------------------------------------

react， vue, angularJs， angular

chrome,    对新的语法支持，速度还挺猛
----------------------------------------------
ES6环境:
	webpack3.x

	Traceur
----------------------------------------------
关于定义(声明)变量:
	之前:     var a=12;
		let a=12

	作用域:
		全局
		函数作用域

	let		相当于之前的 var
	const		常量， 定义好了不能改变

	let注意:
		1. 没有预解析，不存在变量提升
			在代码块内，只要let定义变量，在之前使用，都是报错
			先定义完，在使用
		2.  同一个作用域里， 不能重复定义变量
		3.  for循环，for循环里面是父级作用域，里面又一个

	块级作用域:
		{
			//块级作用域
		}
		
		{{{{let a = 12}}}}

		if(){xx}
		for(){}
		while(){}


	const: 特性和let一样
		const定义变量不能修改

		const定义完变量，必须有值，不能后赋值，不能修改

		Object.freeze(对象)

		const config={
			host:
			username:
			password:
			version:
		}

	
	{
		//TODO
	}

	IIFE
	(function(){
		//TODO
	})()

	建议:
		以后 就用 let  不要在使用var
		
		const http = require('http');
======================================
解构赋值:
	*  非常有用，特别在做数据交互  ajax

	let [a,b,c] =[12,5, 6];

	注意: 左右两边，结构格式要保持一致

	json:
		let {name,age, job} = {
		    name:'Strive',
		    age:18,
		    job:'码畜'
		};

		let {name:n,age:g, job:a} = json;

	解构时候可以给默认值：
		let [a,b, c="默认值"] = ['aaa','bbb'];

	let a = 12;
	let b = 5;

		

	import {a,b,c} from './mod'
======================================
字符串模板:
	``  字符串模板：
		优点: 可以随意换行
		`  ${变量名字}`
	字符串连接，要死人的。

	let name ='Strive';
        	let age = 18;
        	let str = `这个人叫${name}, 年龄是 ${age}岁`;

	关于字符串一些东西:
		字符串查找:
			str.indexOf(要找的东西)   返回索引(位置) ，没找到返回-1
			str.includes(要找的东西)   返回值  true/false

			判断浏览器:  includes

		http://www.xxx.xx

		字符串是否以谁开头:
			str.startsWith(检测东西)

			检测地址
		字符串是否以谁结尾:
			str.endsWith(检测东西)

			.png

		重复字符串:
			str.repeat(次数);

	填充字符串:
		str.padStart(整个字符串长度, 填充东西)   往前填充
		str.padEnd(整个字符串长度, 填充东西)    往后填充

		str.padStart(str.length+padStr.length, padStr)
============================================
函数变化:
	1. 函数默认参数
		function show({x=0,y=0}={}){
		    console.log(x,y);
		}
		show()
	2. 函数参数默认已经定义了，不能再使用let，const声明
		function show(a=18){
		    let a = 101;  //错误
		    console.log(a);
		}
		show()

扩展运算符、Rest运算符:
	...

	展开数组

	... :
		[1,2,3,4]  -> ... [1,2,3,4]  ->  1,2,3,4,5
	...:
		1,2,3,4,5  -> ...1,2,3,4,5  ->  [1,2,3,4,5]

	剩余参数: 必须放到最后

箭头函数:
	=>

	let show = () => 1;


	() => return东西

	() =>{
		语句
		return
	}

	注意:
		1. this问题, 定义函数所在的对象，不在是运行时所在的对象
		2. 箭头函数里面没有arguments, 用  ‘...’
		3. 箭头函数不能当构造函数
		
数组:
	ES5里面新增一些东西

	循环:
		1. for
			for(let i=0; i<arr.length; i++)
		2. while

	arr.forEach()  //  代替普通for
		arr.forEach(function(val, index, arr){
		    console.log(val, index, arr);
		});
	arr.map()  //  非常有用，做数据交互  "映射"
		正常情况下，需要配合return，返回是一个新的数组
		若是没有return，相当于forEach

		注意：平时只要用map，一定是要有return
		
		重新整理数据结构:
			[{title:'aaa'}]   ->  [{t:'aaaa'}]

	arr.filter():  过滤，过滤一些不合格“元素”， 如果回调函数返回true，就留下来
		
	arr.some(): 类似查找,  数组里面某一个元素符合条件，返回true
	arr.every(): 数组里面所有的元素都要符合条件，才返回true

	其实他们可以接收两个参数:
		arr.forEach/map...(循环回调函数, this指向谁);
	------------------------------------------------------------
	arr.reduce()   //从左往右
		求数组的和、阶乘
		
	arr.reduceRight()  //从右往左
	------------------------------------------------------------	

ES2017新增一个运算符:
	幂
		Math.pow(2,3)
		2 ** 3
======================================================
for....of....：
	arr.keys()	数组下标
	arr.entries()	数组某一项

	for(let val of arr){
	    console.log(val);
	}
======================================================
扩展运算符:
	...

	let arr =[1,2,3];
	let arr2 = [...arr];

	let arr2 = Array.from(arr);

Array.from:
	作用: 把类数组(获取一组元素、arguments...) 对象转成数组

	个人观点： 具备 length这个东西，就靠谱

Array.of():  把一组值，转成数组
	let arr = Array.of('apple','banana','orange');

	console.log(arr);

arr.find():  查找，找出第一个符合条件的数组成员，如果没有找到，返回undefined

arr.findIndex(): 找的是位置， 没找到返回-1


arr.fill()	填充
	arr.fill(填充的东西, 开始位置, 结束位置);

在ES2016里面新增:

	arr.indexOf()
	arr.includes()
		str.includes()
============================================
对象:
	json

	对象简介语法(相当有用):

	let json ={
		a:1,
		b:2,
		showA:function(){
			return this.a;
		}
		showB:function(){
			return this.b;
		}
	}

	let json ={
		a,
		b,
		showA(){  //个人建议: 一定注意，不要用箭头函数
		},
		showB(){
		}
	}


	new Vuex.Store({
		state,
		mutation,
		types,
		actions
	});

	new Vue({
		router,
		App,
		vuex
	})

Object.is():	用来比较两个值是否相等

	Object.is('a','a');

	比较两个东西相等:
		==
		===

	Object.is(NaN, NaN);

	Object.is(+0, -0);

Object.assign():   用来合并对象
	let 新的对象 = Object.assign(目标对象, source1, srouce2....)

	function ajax(options){  //用户传
		let defaults={
			type:'get',
			header:
			data:{}
			....
		};

		let json = Object.assign({}, defaults, options);
		.....
	}
	

	用途:
		1. 复制一个对象
		2. 合并参数

ES2017引入:
	Object.keys()
	Object.entries();
	Object.values();

		let {keys, values, entries} = Object;let {keys, values, entries} = Object;

对象身上:   计划在ES2018引入
	...

	let json = {a:3, b:4};
        	let json2 = {...json};

==================================================
Promise:    承诺，许诺

	作用:  解决异步回调问题

	传统方式，大部分用回调函数，事件

	ajax(url,{  //获取token
		ajax(url,()=>{  //获取用户信息
			ajax(url, ()=>{
				//获取用户相关新闻
			})
		})
	})

	语法:
		let promise = new Promise(function(resolve, reject){
		    //resolve,   成功调用
		    //reject     失败调用
		});

		promise.then(res=>{

		}, err=>{
			
		})


	promise.catch(err=>{})

	本人用法:
		new Promise().then(res=>{

		}).catch(err=>{
			
		})

	Promise.resolve('aa') :  将现有的东西，转成一个promise对象， resolve状态，成功状态
		等价于:
		new Promise(resolve =>{
		    resolve('aaa')
		});
	Promise.reject('aaa'):   将现有的东西，转成一个promise对象，reject状态，失败状态
		等价于:
		new Promise((resolve, reject) =>{
		    reject('aaa')
		});

√	Promise.all([p1, p2, p3]):  把promise打包，扔到一个数组里面，打包完还是一个promise对象
		必须确保，所有的promise对象，都是resolve状态，都是成功状态
	Promise.race([p1, p2, p3]): 只要有一个成功，就返回

	用户登录  ->  用户信息
=========================================
模块化:
	js不支持模块化
		ruby   require
		python  import
	
	在ES6之前，社区制定一套模块规范:
		Commonjs		主要服务端  nodeJs    require('http')
		AMD			requireJs, curlJs
		CMD			seaJs

	ES6出来，同意服务端和客户端模块规范:
		import {xx} ddd
		
		Math.pow()
		Math.abs()

		import {pow, abs} from 'Math'		我自己瞎想


	模块化：
		注意： 需要放到服务器环境
		a). 如何定义模块？
			export  东西
			export const a =12;
			export{
				a as aaa,
				b as banana
			}
		b). 如何使用?
			import
			import './modules/1.js'; 
			import {a as a, banana, c} from './modules/2.js'
			import * as modTwo from './modules/2.js';
	使用模块:
		<script type="module"></script>


	import:  特点
		a). import 可以是相对路径，也可以是绝对路径
			import 'https://code.jquery.com/jquery-3.3.1.js';
		b). import模块只会导入一次，无论你引入多少次
		c). import './modules/1.js';  如果这么用，相当于引入文件
		d). 有提升效果，import会自动提升到顶部，首先执行
		e). 导出去模块内容，如果里面有定时器更改，外面也会改动，不想Common规范缓存


  	* import()  类似node里面require， 可以动态引入, 默认import语法不能写到if之类里面
		返回值，是个promise对象

		import('./modules/1.js').then(res=>{
			console.log(res.a+res.b);
		});

		优点:
			1. 按需加载
			2. 可以写if中
			3. 路径也可以动态

		Promise.all([])
=============================================
	ES2017加  async  await:
=============================================

	'use strict'		以后默认就是严格模式

程序中类

ES6

面向对象 ，类
	属性
	方法
函数模拟

人:  Person
	属性: name
	展示名字: showName

     Person.prototype.showName
ES5之前：
	function Person(){
		this.name='aaa';
	}
	Person.prototype.showName=function(){}

ES6中变形:
	class Person{
		constructor(){
			this.name = 'aaa';
		} 
		showName(){

		}
	}
	--------------------------
	const Person = class{}
	------------------------------
	let a = 'strive';
	let b = 'method';

	class Person{
		[a+b](){
			
		}
	}


let aaa='aaa';
let bbb='ddd';
let json={
	[aaa+bbb]:'welcome 51mmr.net'
}

注意： 
1. ES6里面class没有提升功能，在ES5，用函数模拟可以，默认函数提升
2. ES6里面this 比之前轻松多了


矫正this:
	1. fn.call(this指向谁, args1, args2....)
	2. fn.apply(this指向谁, [args1, args2....])
	3. fn.bind()
------------------------------------------------------------
class里面取值函数(getter), 存值函数(setter)
------------------------------------------------------------
静态方法: 就是类身上方法
	static aaa(){

	}

	父类.aaa();
------------------------------------------------------------

父类
子类
------------------------------------------------------------
继承:
	之前:

Person
Student
	
	现在: extends
	class Student extends Person{
            
             }
------------------------------------------------------------
拖拽


ES6类

	_
----------------------------------------------------------------
数据类型:
	number、string、boolean、Object、undefined、function

	用typeof检测出来数据类型:
		symbol

	new Number(12)
	new String()
	new Array()

symbol	使用情况一般

定义：
	let syml = Symbol('aaa');

注意:
	1. Symbol 不能new
	2. Symbol() 返回是一个唯一值
		坊间传说, 做一个key，定义一些唯一或者私有一些东
	3. symbol是一个单独数据类型，就叫 symbol, 基本类型

	4. 如果symbol作为key，用for in循环，出不来

json  ->  for in

---------------------------------------------------------------
箭头函数
	() =>{}

generator函数
	生成器


	解决异步深度嵌套的问题， async

语法:
	function * show(){
		yield
	}
	function* show(){
	}
	function *show(){
	}

	定义：
		function * gen(){
		    yield 'welcome';
		    yield 'to';
		    return '牧码人';
		}
	调用:
		let g1 = gen();
		g1.next();  // {value:'welcome', done:false}
		g1.next();  // {value:'to', done:false}
		g1.next();  // {value:'牧码人', done:true}

	上述调用，手动调用，麻烦

for .. of  自动遍历 generator

	return的东西，它不会遍历

generator不仅可以配合 for ... of ...

还可以:

1. 解构赋值:
	let [a, ...b] = gen();
2. 扩展运算符
	'...'

	console.log(...gen());
3. Array.from()
	console.log(Array.from(gen()));

generator结合 axios数据请求：

-----------------------------------------------
异步: 不连续，上一个操作没有执行完，下一个操作照样开始
同步: 连续执行，上一个操作没有执行完，下一个没法开始

关于异步，解决方案：
	a). 回调函数
	b). 事件监听
	c). 发布/订阅
	d). Promise对象

co....
-----------------------------------------------
ES2017,规定 async

	nodeJs

	读取文件  fs.readFile

	1. promise
	2. genrator
	3. async
--------------------------------------
async function fn(){  //表示异步，这个函数里面有异步任务
	let result = await  xxx	//表示后面结果需要等待
	
}
--------------------------------------
async特点:
	1. await只能放到async函数中
	2. 相比genrator语义化更强
	3. await后面可以是promise对象，也可以数字、字符串、布尔
	4. async函数返回是一个promise对象
	5. 只要await语句后面Promise状态变成 reject, 那么整个async函数会中断执行
--------------------------------------
如何解决async函数中抛出错误，影响后续代码:
	a). 
		try{

		}catch(e){
			
		}
	b). promise本身catch
--------------------------------------		
个人建议大家:
	try{
		let f1 = await readFile('data/a.txt');
		let f3 = await readFile('data/c.txt');
		let f2 = await readFile('data/b.txt');
	}catch(e){}
--------------------------------------


ES2018(ES9)
--------------------------------
proxy:  代理
	扩展(增强)对象、方法(函数)一些功能

	比如: 
		Vue

		Vue.config.keyCodes.enter=65

	Proxy作用: 比如vue中拦截
		预警、上报、扩展功能、统计、增强对象等等

	proxy是设计模式一种，  代理模式
--------------------------------
let obj ={
	name:'Strive'
};
//您访问了name
obj.name  // Strive
--------------------------------
语法:
	new Proxy(target, handler);
	let obj = new Proxy(被代理的对象,对代理的对象做什么操作)

	handler:

	{
		set(){},  //设置的时候干的事情
		get(){},  //获取干的事情
		deleteProperty(){},  //删除
		has(){}  //问你有没有这个东西  ‘xxx’ in obj
		apply()  //调用函数处理
		.....
	}

实现一个，访问一个对象身上属性，默认不存在的时候给了undefined，希望如果不存在错误(警告)信息：
	
---------------------------------------------------

DOM.div()
DOM.a();
DOM.ul()

---------------------------------------------------
set(), 设置，拦截:
	设置一个年龄，保证是整数，且范围不能超过200

deleteProperty(): 删除，拦截:
	
has(): 检测有没有
---------------------------------------------------
apply()  :拦截方法
	
	
---------------------------------------------------
Reflect.apply(调用的函数，this指向，参数数组);

fn.call()
fn.apply()  类似

Reflect: 反射
	Object.xxx  语言内部方法

		Object.defineProperty

	放到Reflect对象身上

	通过Reflect对象身上直接拿到语言内部东西

	'assign' in Object    ->   Reflect.has(Object, 'assign')

	delete json.a	    ->   Reflect.deleteProperty(json, 'a');




数字(数值)变化:
	二进制:  (Binary)
		let a = 0b010101;
	八进制: (Octal)
		let a = 0o666;
	
	十六进制:
		#ccc
	-------------------------------------------
	Nunber()、parseInt()、 parseFloat()
	-------------------------------------------

	Number.isNaN(NaN)	-> true

	Number.isFinite(a)   判断是不是数字	√

	Number.isInteger(a)  判断数字是不是整数	√

	-------------------------------------------
	Number.parseInt();
	Number.parseFloat();
-------------------------------------------
安全整数:
	2**3

	安全整数:    -(2^53-1) 到 (2^53-1),   包含-(2^53-1) 和(2^53-1)

	Number.isSafeInteger(a);

	Number.MAX_SAFE_INTEGER	最大安全整数
	Number.MIN_SAFE_INTEGER	最小安全整数

--------------------------------------------------------------------------------------
Math:
	Math.abs()
	Math.sqrt()
	Math.sin()

	Math.trunc()	截取，只保留整数部分
		Math.trunc(4.5)  ->  4
		Math.trunc(4.9)  ->  4

	Math.sign(-5)   判断一个数到底是正数、负数、0
		Math.sign(-5)  ->  -1
		Math.sign(5)  -> 1
		Math.sign(0)	->  0
		Math.sign(-0)	->  -0
		其他值，返回 NaN
	
	Math.cbrt()	计算一个数立方根

		Math.cbrt(27)  ->  3

	.......
-------------------------------------------------------
ES2018(ES9):
	1. 命名捕获
		语法:  (?<名字>)

		let str = '2018-03-20';
		let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
		let {year, month ,day} = str.match(reg).groups;
		console.log(year, month, day);
	反向引用:
		\1  \2     $1  $2
	反向引用命名捕获:
		语法:  \k<名字>

		let reg = /^(?<Strive>welcome)-\k<Strive>$/;

		匹配: ‘welcome-welcome’

		-------------------------------------------------

		let reg = /^(?<Strive>welcome)-\k<Strive>-\1$/;

		匹配: 'welcome-welcome-welcome'

	替换:
		$<名字>

		let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
		str = str.replace(reg,'$<day>/$<month>/$<year>');
		console.log(str);

		----------------------------------------
		str = str.replace(reg, (...args)=>{
			//console.log(args)
			let {year, month, day} = args[args.length-1];

			return `${day}/${month}/${year}`;
		});

		console.log(str);

	2.   dotAll 模式	s

		之前 '.' 在正则里表示匹配任意东西， 但是不包括 \n 
	
	   let reg = /\w+/gims;

	3. 标签函数
		function fn(){

		}

		fn()  //这样调用就是普通函数

		fn`aaa`  //标签函数使用

		-----------------------------------
		function fn(args){
			return args[0].toUpperCase();
		}

		console.log(fn`welcome`);
