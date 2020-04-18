
### 模拟bind

```
Function.prototype.myBind = function(cts) {
	if(typeof this !== 'function') return;

	var self = this;
	var arg = Array.prototype.slice.call(arguments, 1);
	var fn = function() {}; //用于保存原函数的原型
	var bound = function() {
		//判断是否使用 new调用bound
		var _self = this instanceof fn ? this : cts;
		var _arg = Array.prototype.slice.call(arguments);
		return self.apply(_self, arg.concat(_arg));
	}

	//箭头函数没有prototype，箭头函数永远指向它所在的作用域
	if(this.prototype) {
		fn.prototype = this.prototype;
	}

	bound.prototype = new fn();
	return bound;
}

```

### 检测

```
var bar = function() {
	console.log(arguments);
}

var obj = {
	name: 'ming'
}

var bound = bar.myBind(obj);

new bound();

bound();


```

### 模拟call

```

//在函数的原型扩展
Function.prototype.myCall = function(cts) {
	if(typeof this !== 'function') return;

	cts = cts ? Object(cts) ? window;
	cts.fn = this;

	var arg = [].slice.call(arguments).slice(1);
	var res = cts.fn(...arg);

	delete cts.fn;
	return res;

}


```

### 模拟apply

```
 Function.prototype.myApply = function(cts) {
 	if(typeof this !== 'function') return;

 	cts = cts ? Object(cts) ? window;
 	cts.fn = this;

 	var arg = arguments[1];
 	var res = cts.fn(...arg);

 	delete cts.fn;
 	return res;
 }

```

### 检测

```
const bar = function() {
  console.log(this.name, arguments);
};



const foo = {
  name: 'foo'
};

bar.myCall(foo, 1, 2, 3);

bar.myAplly(foo, [1, 2, 3]);

```