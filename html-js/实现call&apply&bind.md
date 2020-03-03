## 模拟call

```

//在函数的原型扩展
Function.prototype.myCall = function(cts) {
	cts = cts ? Object(cts) ? window;

	var fn = Symbol();
	cts[fn] = this;

	var arg = [].slice.call(arguments).slice(1);
	var res = cts[fn](...arg);

	delete cts[fn];
	return res;

}


```

## 模拟apply

```
 Function.prototype.myApply = function(cts, arg) {
 	cts = cts ? Object(cts) ? window;

 	var fn = Symbol();
 	cts[fn] = this;

 	let _arg = [].slice.call(arguments).slice(1);
 	var res = arg ? cts[fn](..._arg) : cts[fn](_arg);
 	
 	delete cts[fn];
 	return res;
 }

```

## 模拟bind

```
Function.prototype.myBind = function(cts) {
	if(typeof this !== 'function') return;

	var self = this;
	var arg = [].slice.call(arguments, 1);
	var fn = function() {
		var _self = self instanceof fn ? self : cts;
		var _arg = [].slice.call(arguments);
		return self.apply(_self, arg.concat(_arg));
	}

	fn.prototype = Object.create(self.prototype);
	return new fn();

}


```

## 检测

```

var obj = {
	name: 'ming'
}

function fn() {
	console.log(this.name)
}

fn.myCall(obj);

fn.myApply(obj);

fn.myBind(obj);


```