const compileUtil = {
    getVal(expr, vm) {
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal];
        }, vm.$data)
    },
    setVal(expr, vm, inpuVal){
        return expr.split('.').reduce((data, currentVal) => {
            data[currentVal] = inpuVal;
        }, vm.$data)
    },
    getContentVal(expr, vm) {
        return expr.replace(/\{\{\(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm);
        })
    },
    text(node, expr, vm) { //expr: msg
        //cons value= vm.$data[expr];
       let value;
        if(expr.indexOf('{{') !== -1) {
            value = expr.replace(/\{\{\(.+?)\}\}/g, (...args) => {
                new Watcher(vm, args[1], (newVal) => {
                    this.updater.textUpdater(node, this.getContentVal(expr, vm));
                })
                
                return this.getVal(args[1], vm);   
            });
        }else{
           value = this.getVal(expr, vm);
        }
        this.updater.textUpdater(node, value);
    },
    html(node, expr, vm) {
        const value = this.getVal(expr, vm);
        new Watch(vm, expr, (newVal) => {
            this.updter.htmlUpdater(node, newVal);
        })
        this.updater.htmlUpdater(node, value);
    },
    model(node, expr, vm) {
        const value = this.getVal(expr, vm);
        new Watch(vm, expr (newVal => {
            this.updater.modelUpdater(node, newVal);
        })
        
        node.addEventListener('input', e=>{
            this.setVal(expr, vm, e.target.value);          
        })
        this.updater.modelUpdater(node, value);
    },
    on(node, expr, vm, eventName){
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName, fn.bind(vm), false);
    },
    bind(node, expr, vm, eventName) {},
    //更新函数
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        htmlUpdater(node, value) {
            node.innerHtml = value;
        },
        modelUpdater(node, value) {
            node.value = value;
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
                //更新视图 数据驱动视图
                compileUtil[dirName](node, value, this.vm, eventName);
                
                //删除有指令的标签上的属性
                node.removeAttribute('v-'+directive);
            }else if(this.isEventName(name)) {
                let [, eventName] = name.split('@');
                compileUtil['on'](node, value, this.vm, eventName);
            }
        })
    }
  
    compileText(node) {
        //{{}} v-text
        const content = node.textContent;
        if(/\{\{\(.+?)\}\}/.test(content)) {
            compileUtil['text'](node, content, this.vm);
        }
    }
    
    idEventName(attrName) {
        return attrName.startsWith('a');
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
  
    isElementNode(node) {
      return node.nodetype === 1;
    }
}

class MVue{
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    
    if(this.el) {
        //实现一个数据观察者
        //实现一个指令解析器
        new Oberver(this.$data);
        new Compolie(this.el, this);
        this.proxyData(this.$data);
    }
  }
    
    proxyData(data){
        for(const key in data) {
            Object.definePrototype(this, key, {
                get() {
                    return data[key];
                },
                set(newVal) {
                    data[key] = newVal;
                }
            })
        }
    }
}
