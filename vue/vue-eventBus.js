
<input type="text" id="input" value="测试" />


function EventBus() {
	this.objMsg = {};
}

EventBus.prototype = {
	on: function(msgName, fn) {
		if(this.objMsg.hasOwnProperty(msgName)) {
/*			if(typeof this.objMsg === 'function') {
				this.objMsg[msgName] = [this.objMsg[msgName], fn];
			}else{
				this.objMsg[msgName] = [...this.objMsg[msgName], fn];
			}
			*/
			this.objMsg[msgName] = (typeof this.objMsg[msgName] === 'function') 
			? [this.objMsg[msgName], fn] : [...this.objMsg[msgName], fn];
		}else{
			this.objMsg[msgName] = fn;
		}
	},
	one: function(msgName, fn) {
		this.objMsg[msgName] = fn;
	},
	emit: function(msgName, msg) {
		if(!this.objMsg.hasOwnProperty(msgName)) return;
		if(typeof this.objMsg[msgName] === 'function') {
			this.objMsg[msgName](msg);
		}else{
			this.objMsg[msgName].forEach(fn => {
				fn(msg);
			})
		}
	},
	off: function(msgName) {
		if(!this.objMsg.hasOwnProperty(msgName)) return;

		delete this.objMsg[msgName];
	}
}


const eventBus = new EventBus();
window.eventBus = eventBus;


eventBus.on('first-event', function(msg) {
    console.log(`订阅的消息是：${msg}`);
});

let msg = document.getElementById("input")
eventBus.emit('first-event', msg.value);


