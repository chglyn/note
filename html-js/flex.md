### 前言

最近学习Flex内容，趁休闲时间在这里做下简单汇总。

----

### Flex使用

设置Flex布局，在父级添加 display:flex即可。

Flex布局有浏览器兼容性，需要根据不同浏览器内核添加不同浏览器前缀，比如Chrome浏览器使用 -webkit- 前缀。

**注意：** 如果用了弹性布局，子元素不需要浮动 float。

### 设置Flex父级携带属性

justify-content: 子元素水平排列方式，值有以下几种：

* center 居中，(常用)
* space-between	两端对齐(常用)
* space-around	子元素拉手分布	(常用)
* flex-start 居左
* flex-end 居右

align-items: 子元素垂直排列，值有以下几种：

* center 居中(常用)
* flex-end 底部
* flex-start 开始
			
align-content:多行的时候，垂直排列

* center 居中
...

flex-direction: 排列方式，该属性值有以下几种：

* row 横向排列
* row-reverse 横向翻过排列
* column 纵向排列
* column-reverse 纵向翻过排列
		
flex-wrap: 子元素是否在一行显示，该属性值有以下几种：

* nowrap 不换行
* wrap 换行

flex-flow 全拼是 <flex-direction> 与 <flex-wrap>的缩写。	

### 子级身上属性:

父框设置Flex布局，子框携带的属性：

* flex:1，1 指的是一个系数。
* 子元素在划分父元素宽度，先刨除固定宽度。
* align-self 其实就是用来覆盖父级 align-items  垂直排列。
* flex-grow: 1;	定义子元素放大比例。
* order: 规定子元素顺序。排序：数值越小，越靠前，默认值0。
	

### flex：1的含义

flex是flex-grow，flex-shrink，flex-basis的缩写。
flex-grow：父控件空间有剩余是否放大；0表示不放大。
flex-shrink：父控件空间不足是否缩小。
flex-basis：子控件占主轴的大小，主轴就是flex的主方向，row是横向，column是竖向。
flex默认属性是0 1 auto，(父控件有剩余控件不放大，父控件空间不足按1缩小，保持本身的空间大小)。
flex:1;的值是1 1 0%，(父控件有剩余空间按1放大，父控件空间不足按1缩小，自身的空间大小是0%)。

