//双数据绑定

var vm  = new Vm({
	el: '#app',
	data: {
		a: 1
	}
})

function Vm(options={}) {
	this.$options = options;
	let data = this._data = Vm.$options.data;
	observer(data);

	/*数据代理部分*/
	for(let key in data) {
		Object.defineProperty(this, key, {
			enumerable: true,
			get() {
				return this._data[key];
			},
			set(newVal) {
				this._data[key] = newVal;
			}
		})
	}
	/*数据代理部分*/


	//模版解析
	new Compile(options.el, this);

}

function observer(data) {
	if(typeof data !== 'object') return;
	return new Observer()
}

function Observer(data) {
	for(let key in data) {
		let dep = new Dep();
		let val = data[key];
		observer(val); //每层数据都要劫持
		Object.defineProperty(data, key, {
			enumerable: true,
			get() {
				Dep.target&&dep.addSub(Dep.target);
				return val;
			},
			set(newVal) {
				if(newVal === val) return;
				val = newVal;
				observer(newVal); //新设置值劫持
				dep.notfiy();
			}
		})
	}
}


function Compile(el, vm) {
	vm.$el = document.querySelector(el);
	let fragment = document.createDocumentFragment();
	while(child = vm.$el.firstChild) {
		fragment.appendChild(child);
	}
	new Replace(fragment);
	vm.$el.appendChild(fragment);
}

function Replace(fragment) {
	[...fragment.childNodes].forEach(node => {
		let text = node.textContent;
		let reg = /\{\{.*]\}\}/g;
		if(node.nodeType == 3 && reg.test(text)) {
			//console.log(RegExp, $1);
			//let arr = RegExp.$1.split('.');
			let val = null;
			arr.forEach((item, key) => {
				val = val[key];
			})
			new Watcher(vm, EegExp.$1, (newVal) => {
				node.textContent = text.replace(/\{\{.*]\}\}/g, newVal);
			})
			node.textContent = text.replace(/\{\{.*]\}\}/g, val);
		}

		//	双向数据绑定
		if(node.nodeType == 1) {
			let nodeAttrs = node.attributes;
			[...nodeAttrs].forEach(attr => {
				let name = attr.name;
				let exp = attr.value;
				if(name.indexof('v-') == 0) {
					node.value = vm[exp];
				}
				new Watch(vm, exp, (newVal) => {
					node.value = newVal;
				})
				node.addEventListener('input', (e) => {
					let newVal = e.target.value;
					vm[exp] = newVal;
				})
			})
		}
		//	end 双向数据绑定



		if(node.childNodes) {
			new Replace(node);
		}
	})
}


//发布订阅模式
function Dep() {
	this.subs = [];

}
Dep.prototype.addSub = function(sub) {
	this.subs.push(sub);
}
Dep.prototype.notfiy = function() {
	this.subs.forEach(sub => sub.update());
}


function Watcher(vm, exp, fn) {
	this.fn = fn;
	this.vm = vm;
	this.exp = exp;

	Dep.target = this;
	let val = vm;
	let arr = exp.split('.');
	arr.forEach(k => {
		val = val[k];
	})
	Dep.target = null;
}
Watcher.prototype.update = function() {
	let val = this.vm;
	let arr = this.exp.split('.');
	arr.forEach(k => {
		val = val[k];
	})

	this.fn(val);
}
let watcher = new Watcher(function() {
	console.log('ok');
});

let dep = new Dep();
dep.addSub(watcher);

dep.notfiy();

