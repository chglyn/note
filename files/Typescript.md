### 数组

* ts 声明数组

```

let arr1:number[] = [1, 2, 3];

let arr2:Array<string> = ['a', 'b', 'c'];

let arr3:any[] = [1, 'a', 4, true];

```

####  函数

  * ES5 定义函数
  
  ```
  function show() {
   return 'show';
  }
  
  var show = function() {
   return 'show';
  }
  
  ```
  
  * Typescript 定义函数
  
  ```
  // 指定函数类型
  function show():string {
   return 'show';
  } 
  
  let show = function():string {
   return 'show';
  }
  
  ```
  
 * ts 定义函数传参
 
 ```
 // 指定参数类型，函数传参如果不是定义时的参数类型会抛出异常，编译不通过。
 function show(name:string, age:number):string {
   return `${name}` ---`${age}`;
 }
 
 show('sunny', 18);
 
 ```

* ts 函数没有返回值

```

function show():void {
 console.log('show')
}

```

* ts 函数设置可选参数 

```

// ? 符号标识可选参数
// 可选参数必须放到参数的最后一位
function show(name:string, age?:number):string {
 if(age) {
  return `${name}` --- `${age}`;
 }else{
  return `${name}`;
 }
}

show('sunny');
```

* ts 函数设置默认参数

```
function show(name:string, age:number=20):string {
  return `${name}` --  `${age}`;
}

show('sunny')

```

* ts 剩余参数

```
// 三点运算符，接收形参值
function sum(...result:number):number {
 lst s = 0;
 for(let i=0; i<result.length; i++) {
  s+=result[i];
 }
 return s;
}
sum(1, 2, 3, 4, 5);

```

```

//另一种写法
function sum(a:number, b:number, ...result:number):number {
 lst s = a +b;
 for(let i=0; i<result.length; i++) {
  s+=result[i];
 }
 return s;
}
sum(1, 2, 3, 4, 5);

```

* ts 函数重载

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


























