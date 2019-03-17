
*******************bind**********************
// 初探 bind
var a = 1;
function fn() {
  console.log(this.a);
}
fn();

var obj = {
  a: 2
}
var newObj = fn.bind(obj); //this指向bind里面的参数obj, 最终指向新的函数
newObj(); //2
console.log(new fn().constructor); //构造函数还是指向fn 而且this指向新的对象上

//单对象编程
var obj = {
  init: function() { 
    this.msg = 1;
    this.dom = document.getElementbyId(elem);
  },
  fn: function() { 
    //this --> obj; 执行click时候有个this --> this.dom 
    this.dom.onclick = this.showMessage.bind(this);
  },
  showMessage: function() {
      console.log(this.msg);
  }
}
obj.init();

//拓展
var a = 1;
function fn(x, y) {
  console.log(this.a, x, y);
}
fn('x', 'y');

var obj = {
  a: 2
}
var newObj = fn.bind(obj, 'z1', 'z2');//bind第一个参数之后, 执行函数时候都会把参数放到newObj(...)里面
newObj(..., 'z2');
/*
  总结：
  函数A调用bind方法时，需传递的参数o, x, y, z...
  返回新的函数B
  函数B在执行时候，具体的功能实际上还是使用的A 只不过this执行变成了o 不传指向window
  函数B在执行时候，传递的参数会拼接到x, y, z 后面 一并在内部传递给A执行
  new B() 构造函数依旧是A 而且o不会起到任何作用
*/
Function.prototype.newBind = function(target) {// target改变函数指向时this的指向
  var self = this;
  var args = [].slice.call(arguments, 1);
  var temp = function() {};
  var f = function() {
    var _arg = [].slice.call(arguments, 0);
    return self.apply(this instanceof temp ? this : (target || window), args.concat(_arg));
  }
  temp.prototype = self.prototype;
  f.prototype = new temp();
  return f;
}
function show(x, y, z, w) {
  console.log(this, x, y, z, w);
}
var obj = { a:1 }
var newBind = show.newBind(obj, 'a', 'b');
newBind('c', 'd');
new newShow();
*************************纯函数***************************
/*
  对于相同的输入, 永远会得到相同的输出, 而且没有任何可观察的副作用, 也不依赖外部环境的状态
  指不依赖, 修改其作用域之外变量的函数
*/

//函数记忆
	//阶乘
	5! = 5 * 4 * 3 * 2 * 1;
	...
	0! = 1;
	n! = n * (n - 1);

	var count = 0;
	var cache = [];
	function factorial(n) {
		count ++;
		if(cache[n]) {
			return cache[n];
		}else{
			if(n == 0 || n == 1) {
				cache[0] = 1;
				cache[1] = 1;
				return 1;
			}else{
				cache[n] = n * factorial(n - 1);
				return  cache[n];
			}
		}
	}
	for(var i = 1; i < 5; i++) {
		factorial(i);
	}
	console.time('first');
	console.log(factorial(5));
	console.timeEnd('first');


	function factorial(n) {
		if(n == 0 || n == 1) {
			return 1;
		}else{
			return n * factorial(n - 1);
		}
	}
	function memorize(fn) {
		var cache = {};
		return function() {
			var key = arguments.length + Array.prototype.join.call(arguments);
			if(cache[key]) {
				return cache[key];
			}else{
				cache[key] = fn.apply(this, arguments);
				return cache[key];
			}
		}
	}
	var newFn = memorize(factorial);
	newF(5);

********************优化网络请求性能——节流***********************
	//节流函数: 预定义一个函数只有在大于等于执行周期时才执行，周期内调用不执行。
		//场景：
		//窗口调整 (resize)
		//页面滚动 (scroll)
		//抢够疯狂点击 (mousedown)

		<div id="show">0</div>
		<button id="btn">click me</button>

		var oDiv = document.getElementById('show'),
		    oBtn = document.getElementById('btn');
		function throttle(handle, wait) {
			var lastTime = 0;
			return function (e) {
				var nowTime = new Date().getTime();
				if(nowTime - lastTime > wait) {
					handle.apply(this, arguments);
					lastTime = nowTime;
				}
			}
		}
		function buy(e) {
			oDiv.innerText = parseInt(oDiv.innerText) + 1;
		}
		oBtn.onclick = throttle(buy, 1000);
		
******************优化网络请求性能——防抖********************
	//函数防抖: 在函数频繁触发情况下, 只有足够空闲时间, 才执行一次。
		//场景:
		//实时搜索(keyup)
		//拖拽(mousemove)
		<input id="inp" type="text" />

		var oInp = document.getElementById('inp');
		//var timer;
		function debounce(handle, delay) {
			var timer = null;
			return function() {
				var self = this,
				    arg = arguments;
				clearTimeout(timer);
				timer = setTimeout(function() { 
					handle.apply(self, arg);
				}, delay);
			}
		}
		function ajax(e) {
			console.log(e, this.value);
		}
		oInp.onclick = debounce(ajax, 1000);
		/*
		oInp.onclick = function(e) {
			var self = this,
			    arg = arguments;
			clearTimeout(timer);
			timer = setTimeout(function() { 
				ajax.apply(self, arg);
			}, 1000);
		}
		*/
*********************拖拽公式***********************
	*{ margin: 0;padding: 0 ;}
	#box{ width: 100px;height: 100px;position: absolute;top: 0;left: 0;background:#c0c0c0; cursor: pointer;}
	<div id="box"></div>

	var oDiv = document.getElementById('box'),
		oBody = document.getElementsByTagName('body')[0];
	function bindEvent(elem, wrap) {
		//down  mover --> up
		var X,
		    Y,
		    boxL,
		    boxT,
		    disL,
		    disT,
		    drag = false;
		elem.onmousedown = function(e) {
			drag = true;
			var event = e || window.event;
			    X = event.clientX;
			    Y = event.clientY;
			    boxL = elem.offsetLeft;
			    boxT = elem.offsetTop;
			    disL = X - boxL;
			    disT = Y - boxT;
		};
		wrap.onmousemove = function(e) {
			var event = e || window.event;
			if(drag) {
				elem.style.left = event.clientX - disL + 'px';
				elem.style.top = event.clientY - disT + 'px';
				/*
				* 是否覆盖
				*/
				<!-- var L = elem.offsetLeft,
					T = elem.offsetTop,
					coverHeigth = 0,
					coverWidth = 0,
					elem2L = elem2.offsetLeft,
					elem2T = elem2.offsetTop,
					W= elem.offsetWidth,
					H = elem.offsetHeight;
				if((L + W >= elem2L) && (L <= elem2L)) {
					coverWidth = L + W -elem2L;
				}else if((elem2L + W > L) && (elem2L + W < L + W)) {
					coverWidth = elem2 + W - L;
				}
				if((T + H >= elem2T) && (elem2 > T)) {
					coverHeight = T + H - elem2;
				}else if((elem2T + H >= T) && (T + H >= elem2T + H)) {
					coverHeight = elem2 + H - T;
				}
				console.log(coverWidth * coverHeight); -->
			}
		};
		elem.onmouseup = function() {
			drag = false;
		};
	}
	bindEvent(oDiv, oBody);

*************************canvas************************************
	<canvas id="can" width="500px" height="500px"></canvas>
	<div id="box"></div>

	var can = document.getElementById('can'),
	   oBox = document.getElementById('box'),
	   ctx = can.getContext('2d'),
	   timer,
	   angle = 0,
	   per;
	CanvasRenderingContext2D.prototype.sector = function(x, y, r, sDeg, eDeg) {
		//圆心点 半径 角度 起始角度 结束角度
		this.save();
		this.beginPath();
		this.moveTo(x, y);
		//角度 --> 弧度
		this.arc(x, y, sDeg * Math.PI / 180, eDeg * Math.PI / 180, false); //true 顺时针 false 逆时针
		this.closePath();
		this.restore();
		return this;
	}
	ctx.fillStyle = 'red';
	//ctx.sector(250, 250, 100, 0, 90).fill();
	/*
	* angle / 360 = per / 100
	* 5* angle / 18
	*/
	timer = setInterval(function() {
		angle += 5;
		ctx.sector(250, 250, 100, 0, angle).fill();
		per = (5 * angle / 18).toFixed(2);
		oBox.innerHTML = per + '%';
		if(angle == 360) {
			clearInterval(timer);
		}
	}, 200)

