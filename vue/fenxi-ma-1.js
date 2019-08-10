
//数据劫持
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
		let val = data[key];
		observer(val); //每层数据都要劫持
		Object.defineProperty(data, key, {
			enumerable: true,
			get() {
				return val;
			},
			set(newVal) {
				if(newVal === val) return;
				val = newVal;
				observer(newVal); //新设置值劫持
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
			console.log(RegExp, $1);
			//let arr = RegExp.$1.split('.');
			let val = vm;
			arr.forEach((item, key) => {
				val = val[key];
			})
			node.textContent = text.replace(/\{\{.*]\}\}/g, val);
		}
		if(node.childNodes) {
			new Replace(node);
		}
	})
}

