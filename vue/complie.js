class Compolie{
    constructor(el, vm) {
      this.el = (this.isElementNode(el) ? el : document.querySelector(el));
      this.vm = vm;
      //获取文档碎片对象，放入内存中会减少界面的回流和重绘
      const fragment = this.node2Fragment(this.el);
      
      //编译模版
      this.compile(fragment);
      
      //追加子元素到根元素
      this.el.appendChild(fragment);
    }
    
    compile(fragment) {
        //获取子节点
         const childNodes = fragment.childNodes;
        [...childNodes]forEach(child => {
            
        })
    }
  
    node2Fragment(el) {
      //创建文档碎片
      const f = document.createDocumentFragment();
      let firstChild;
      while(firstChild = el.firstChild) {
        f.appendChild(firstChild);
      }
      return f;
    }
  
    isELementNode(node) {
      return node.nodetype === 1;
    }
}

class MVue{
  constructor(options) {
    this.$el = options.el;
    this.data = options.data;
    this.$options = options;
    
    if(this.el) {
        //实现一个数据观察者
        //实现一个指令解析器
        new Compolie(this.el, this);
    }
  }
}
