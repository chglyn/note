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
  
 * Typescript 定义函数传参
 
 ```
 // 指定参数类型，如果不是定义时的参数类型会抛出异常，编译不通过。
 function show(name:string, age:number):string {
   return `${name}` ---`${age}`;
 }
 
 show('sunny', 18);
 
 ```
