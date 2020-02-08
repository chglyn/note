
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
    Object.defineProperty(obj, key, {
      enumberable: true,
      configurable: false,
      get() {
        //订阅数据变化时， 往Dep中添加观察者
        return val;
      },
      set(newVal) => {
            this.oberver(newVal);
            if(newVal == val) {
                value = newVal;
            }
      }
    })
  }
}
