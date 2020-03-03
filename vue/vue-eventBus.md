
## Vue-eventBus的模拟

```
	function eventBus() {
		this.obj = {};
	}

	Event.prototype = {
		emit: function(eventName, ...arg) {
			var cbs = this.obj[eventName];
			if(cbs.length > 0) {
				cbs.forEach(cb => cd(...arg));
			}
		},
		on: function(eventName, fn) {
			var cbs = this.obj[eventName];
			cbs.push(fn);
			this.obj[eventName] = cbs;
		},
		off: function(eventName, fn) {
			var cbs = this.obj[eventName];
			var index = cbs.indexOf(fn);
			if(index !== -1) cbs.splice(index, 1);
		}
	}


```
