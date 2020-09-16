### 枚举

```
enum Num { a, b = 5, c}

let n:Num = Num.c
// 6

```
如果有默认值，则获取默认值；获取默认值下一位数值，则从默认值开始累加。


### 数组

* `ts` 声明数组

```

let arr1:number[] = [1, 2, 3];

let arr2:Array<string> = ['a', 'b', 'c'];

let arr3:any[] = [1, 'a', 4, true];

```

####  函数

  * `ES5` 定义函数
  
  ```
  function show() {
   return 'show';
  }
  
  var show = function() {
   return 'show';
  }
  
  ```
  
  * `Typescript` 定义函数
  
  ```
  // 指定函数类型
  function show():string {
   return 'show';
  } 
  
  let show = function():string {
   return 'show';
  }
  
  ```
  
 * `ts` 定义函数传参
  指定参数类型，函数传参如果不是定义时的参数类型会抛出异常，编译不通过。
 
 ```
 
 function show(name:string, age:number):string {
   return `${name}` ---`${age}`;
 }
 
 show('sunny', 18);
 
 ```

* `ts` 函数没有返回值

```

function show():void {
 console.log('show')
}

```

* `ts` 函数设置可选参数 
 `?` 符号标识可选参数
 可选参数必须放到参数的最后一位

```

function show(name:string, age?:number):string {
 if(age) {
  return `${name}` --- `${age}`;
 }else{
  return `${name}`;
 }
}

show('sunny');
```

* `ts` 函数设置默认参数

```
function show(name:string, age:number=20):string {
  return `${name}` --  `${age}`;
}

show('sunny')

```

* `ts` 剩余参数
 三点运算符，接收形参值

```
function sum(...result:number):number {
 lst s = 0;
 for(let i=0; i<result.length; i++) {
  s+=result[i];
 }
 return s;
}
sum(1, 2, 3, 4, 5);

```

另一种写法
```

function sum(a:number, b:number, ...result:number):number {
 lst s = a +b;
 for(let i=0; i<result.length; i++) {
  s+=result[i];
 }
 return s;
}
sum(1, 2, 3, 4, 5);

```

* `ts` 函数重载

```

function show(name:string):string;

function show(age:number):number;

function show(str:any):any {
 if(typeof str == 'string') {
  return name;
 }else{
  return age;
 }
}

show('sunny');

```

* `ts` 类

```

class Person {
 name: string; //属性
 age: number;
 constructor(n: string) { // 构造函数 实例化类时触发的方法
  this.name=n;
 }
 say():void {
  console.log(this.name)
 }
}

var p = new Person('sunny');
p.say();

```

* `ts` 继承

```
class Person {
 name: string;
 constructor(name: string) {
  this.name = name;
 }
 say():string {
  return `${this.name}`;
 }
}

class Son extends Person{
  constructor(name:string) {
   super(name);
  }
}

var s = new Son('sunny');

s.say();

```

* 类中的修饰符

`public` 公有，在类里面、子类、类外部都能访问。

`protected` 保护类型，在类里面、子类都能访问，类外部不能访问。

`private` 私有 在类里面可以访问，子类和外部都不能访问。

属性不加修饰符，默认为公有。

```
class Person {
 public name: string; //公有属性
 constructor(name: string) {
  this.name = name;
 }
 say():string {
  return `${this.name}`;
 }
}

class Son extends Person{
  constructor(name:string) {
   super(name);
  }
}

var s = new Son('sunny');

s.say();

```

* `ts` 静态属性与静态方法

```

class Person{
 public name: string;
 static sex:string = '男';
 constructor(name:string) {
  this.name = name;
 }
 show() {
  console.log(`${this.name}`)
 },
 work() {
  console.log(`${this.name}在工作`)
 }
 static run() { // 静态方法 不能直接调用类中的属性
  console.log(`静态方法，只能获取静态属性：${this.sex}`)
 }
}

let p = new Person('sunny');
p.work();
Person.run();

```

* `ts` 多态

```

class Animal{
 name: string;
 constructor(name:string) {
  this.name = name;
 }
 eat() { // 继承它的子类去实现，每一个子类表现不一样
  console.log(`吃的方法`)
 }
}

class Dog extends Animal{
 constructor(name:string) {
  super(name)
 }
 eat() {
  return `${this.name}吃肉`;
 }
}

class Cat extends Animal{
 constructor(name:string) {
  super(name)
 }
 eat() {
  return `${this.name}吃老鼠`;
 }
}

```

* `ts` 抽象

用 `abstract` 关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。

`abstract` 抽象方法只能在抽象类里面。

```

abstract class Animal{
 name: string;
 constructor(name:string) {
  this.name = name;
 }
 abstract eat():void;
}

class Dog extends Animal{
 constructor(name:string) {
  spuer(name);
 }
 // 抽象类的子类 必须实现抽象类的方法
 eat() {
  console.log(`${this.name}`)
 }
}

let d = new Dog('小黑');

```

* `ts` 接口

定义行为、动作的规范相当于约束。

属性接口约束。

```

function printLabel(label: string):void {
 console.log(label)
}

printLabel('Hi');

```

`ts` 中自定义方法传入参数对 `JSON` 约束。

```
function printLabel(labelInfo:(label: string)):void {
 console.log(label)
}

let labelJSON = { name:'sunny', label:'lv1' };
printLabel(labelJSON);

```

`interface` 关键字

传入的参数字段名字必须是接口中已有的名字，参数顺序无要求。

```

interface fullName{
 firstName: string; // 以分号结束
 secondName: string;
}

function printName(name: fullName) {
 console.log(`${name.firstName} --- ${name.secondName}`);
}

let obj = {firstName: 'sunny', secondName: 'cherry'};

printName(obj);


```

* 接口可选属性，使用 `?` 表示。 

```

interface fullName{
 firstName: string;
 secondName?: string;
}

function printName(name: fullName) {
 console.log(`${name.firstName}`);
}

let obj = { firstName: 'sunny' };

printName(obj);


```








































