class Wacher{
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.oldVal = this.getOldVal();
  }
  getOldVal() {
    Dep.target = this;
    const oldVal = compileUtil.getVal(this.expr, this.vm);
    Dep.target = null;
    return oldVal;
  }
  update() {
    const newVal = compileUtil.getVal(this.expr, this.vm);
    if(newVal !== oldVal) {
      this.cb(newVal);
    }
  }
}


class Dep{
  constructor() {
    this.subs = [];
  }
  addSub(watcher) {
      this.subs.push(watcher);
  }
  //通知观察者更新
  notify() {
    this.subs.forEach(w => w.update());
  }
}


class Oberver{
  constructor(data) {
    this.oberver(data);
  }
  
  observer(data) {
    if(data && typeof === 'object') { 
        Object.keys(data).forEach(val => {
          this.defineReactive(data, key, data[key]);
        })
    }
  }
  
  definedReactive(data, key, value) {
    this.observer(value);
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumberable: true,
      configurable: false,
      get() {
        //订阅数据变化时， 往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) => {
            this.oberver(newVal);
            if(newVal == val) {
                value = newVal;
            }
            //通知变化
            dep.notify();              
      }
    })
  }
}
