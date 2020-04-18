### css权重
* 详细请搜索关键词[权重](https://github.com/chglyn/skills_note/blob/master/html-js/base-html.html)

### 盒子模型
box-sizing提供了两个属性：border-box与content-box，对比如下

box-sizing|实际宽度|伸缩
:-:|:-:|:-:
conten-box|宽度+内边距+边框|向外伸展
border-box|宽度-内边距-边框|向内收缩

### BFC规则
* 属于同一个BFC的两个相邻Box垂直排列
* 属于同一个BFC的两个相邻Box的margin会发生重叠
* BFC中子元素的margin box的左边，与包含BFC border box的左边相接触（子元素absolute外）
* BFC的区域不会与float的元素区域重叠
* 计算BFC的高度时，浮动子元素也参与计算
* 文字层不会被浮动层覆盖，环绕周围

### 两栏布局

* float+marginLeft

```
<div class="left"></div>
<div class="right"></div>

.left{ width:200px;height:100px;background:#ccc; float: left; }
.right{ height: 100px;margin-left: 100px;background: red; }

```

* 左适应右定宽
请搜索关键词[两栏](https://github.com/chglyn/skills_note/blob/master/html-js/base-html.html)

### 三栏布局

* 圣杯布局

```

<div class="box">
	<div class="middle"></div>
	<div class="left"></div>
	<div class="right"></div>
</div>

.middle{ float:left; width:100%; height:100px; background:red; }
.left{ float:left; 
	width: 200px; 
	position:relative; 
	left:-200px; 
	margin-left:-100%; 
	height:100px; 
	background:#ccc; 
}
.right{ float:left;
	width:200px; 
	position:relative; 
	right:-200px;
	margin-left:-200px; 
	height:100px; 
	background:#000; 
}
.box{ padding:0 200px; }

```

* 双飞翼布局
```


<div class="middle">
	<div class="cont"></div>
</div>
<div class="left"></div>
<div class="right"></div>


.middle{ float:left; 
	width:100%; 
	height:100px; 
	background:red; 
}
.left{ float:left; 
	width:200px; 
	height:100px; 
	background:#ccc; 
	margin-left:-100%; 
}
.right{ float:left; 
	width:200px; 
	height:100px; 
	background:#000; 
	margin-left:-200px;
}
.cont{ margin:0 200px; }

```

* flex布局
```

<div class="box">
	<div class="left"></div>
	<div class="middle"></div>
	<div class="right"></div>
</div>

.box{ display: flex; }
.left{ width:200px; height:100px; background:#ccc; }
.middle{ flex: 1; height:100px; background:red; } 
.right{ width: 200px; height:100px; background:#000 }

```
(* 注[flex:1的解释](https://github.com/chglyn/skills_note/blob/master/html-js/flex.txt) ) 


### 水平垂直居中

* 固定宽高一半

```
	.box{ 
		width:200px;
		height:200px;
		background:red; 
		position:absolute; 
		top:50%; left:50%; 
		margin-top: -100px; 
		margin-left:-100px; 
	}
```

* flex

` .box{ display:flex; justify-content: center; align-items: center;} `

* transform

```
	.parent{ position:relative; }

	.children{ position:absolute; top:50%; left:50%; tarnsform: translate(-50%, -50%); } //自身宽高一半

```

* absolute不存在文档流之中

```
	.parent{ position:relative; }

	.children{ 
	    width: 50%;  
	    height: 50%; 
	    position:absolute; 
	    top:0;
	    left:0;
	    bottom:0;
	    right:0;
	    margin:auto;
	}

```

### 数组去重

* 扩展运算符

` [...new Set([1, 2, 2, 3, 6, 2, 1])] `

* Array.form

` Array.from(new Set([1, 2, 2, 3, 6, 2, 1])) `

* indexOf

```
	function unique(arr) {
		var arr2 = [];
		for(var i=0; i<arr,length; i++) {
			if(arr2.indexOf(arr[i]) == -1) ｛
				arr2.push(arr[i])
			｝
		}

		return arr2;
	}

	function unique(arr) {
		var arr2 = [];
		for(var i=0; i<arr.length; i++) {
			if(arr.indexOf(arr[i]) == i) {
				arr2.push(arr[i])
			}
		}

		return arr2;
	}


```
* 对象属性不重复

```
	function unique(arr) {
	    var obj = {};
	    var arr2 = [];
	    for(var i = 0; i < arr.length; i++) {
	        if(!obj[arr[i]]) {
	            arr2.push(arr[i]);
	            obj[arr[i]] = 1;
	        }
	    }
	    return arr2;
	}

```

* splice

```

function unique(arr) {
    for(var i=0;i < arr.length; i++) {
        for( var j=i+1;j<arr.length;j++) {
            if(arr[i]==arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

```

### 补充原型链

构造函数中有个 prototype（每个函数中都有），指向它的原型对象，每个原型对象中也有一个constructor属性，指向原构造函数。通过构造函数创建的新对象中都有一个无法直接访问的proto属性，使得对象指向构造函数的原型，这也使得对象获得原型中的属性和方法。

(* 详细请搜索关键词[原型链](https://github.com/chglyn/skills_note/blob/master/html-js/base-js.js) )

<br />

### http与https的区别？默认端口号？

https多了一层更深的协议；端口号：80/443


### TCP握手

* 三次握手

三次握手需要证明两台主机具备**收**与**发**的能力。

假如有A、B两台服务器，第一次握手：A向B发送信息，证明A具备发信息的能力；第二次握手：B向A发送信息，证明B具备发信息的能力；这时B不知道A能不能收信息，因此需要以A发信息告诉B能收到消息。

* 四次握手

四次握手需要证明两台主机具备**收**与**发**的能力。

假如有A、B两台服务器，第一次握手：A向B传输信息，信息传输完不能直接断开，不知道B是否收完信息，因此需要告诉B，信息发送完了。

第二次握手：B还没接收完信息，虽然知道A信息传完了，只能回复A你传完了。

第三次握手：虽然A发送完信息，B还没有接收完信息，不能断开；因为一旦断开，A还要接着继续发信息。因此需要等着B告诉A接收完信息。

第四次握手：A知道B接收完信息，就可以断开连接。



### 浏览器输入地址url到加载界面发生了什么？

	* DNS解析 
	* 建立TCP链接
	* 发送服务器请求
	* 服务器请求成功并返回HTTP报文
	* 浏览器渲染界面
	* 结束
