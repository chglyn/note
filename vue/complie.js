const compileUtil = {
    getVal(expr, vm) {
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal];
        }, vm.$data)
    },
    text(node, expr, vm) { //expr: msg
        //cons value= vm.$data[expr];
        const value = this.getVal(expr, vm);
        this.updater.textUpdater(node, value);
    },
    html(node, expr, vm) {
        const value = this.getVal(expr, vm);
        this.updater.htmlUpdater(node, value);
    },
    model(node, expr, vm) {},
    on(node, expr, vm, eventName){},
    
    //更新函数
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        htmlUpdater(node, value) {
        
        }
    }
}

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
            if(this.isElementNode(child)) {
                //是元素节点 编译元素节点
                this.compileElement(child);
            }else{
                //文本节点 编译文本节点
                this.compileText(child);
            }
            
            if(child.childNodes && child.childNodes.length){
                this.compile(this.child);
            }
        })
    }
    
    compileElement(node) {
        //<div v-text="msg"></div>
        const attributes = node.attributes;
        [...attrbutes].forEach(attr => {
            const {name, value} = attr;
            if(isDirective(name)) {
                //是一个指令  v-model v-html v-text v-on:click
                const [, directive] = name.split('-'); //model ...
                const [dirName, eventName] = directive.split(':');
                [dirName](node, value, this.vm, eventName);
            }
        })
    }
  
    compileText(node) {
    
    }
    
    isDirective(attrName) {
        return attrName.startsWith('v-');
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
