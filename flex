
https://caniuse.com/	查看 css某个属性，兼容情况
css3  flex布局

padding
border

盒子模型:  box-sizing:
	content-box	平时普通盒子模型，padding，border， 盒子会变大
		向外扩展
	border-box	盒子模型，padding,border, 盒子模型不变大
		想内扩展

calc(公式)

	注意:  + - *  /
	calc(100px-20px)	×
	calc(100px - 20px)	√

		backgroud-image
=====================================
父级:
	display:flex;

	添加浏览器前缀:  -webkit-   ,真实工作，postCss插件

	display:-webkit-box;

	* 如果用了弹性布局，子元素，不需要浮动 float

父级身上其他属性:
	justify-content:	子元素水平排列方式
		center	居中	√
		space-between	两端对齐	√
		space-around		子元素拉手分布	√
		flex-start	居左
		flex-end	居右
	align-items		子元素垂直排列
		center		居中
		flex-end	底部
		flex-start	开始
	align-content		多行的时候，垂直排列
		center		居中
		..
	flex-direction:		排列方式
		row	横向排列
		row-reverse	横向翻过排列
		column	纵向排列
		column-reverse	纵向翻过排列
	flex-wrap:	子元素是否在一行显示
		nowrap	不换行
		wrap		换行

	flex-flow: <flex-direction> <flex-wrap>	

子级身上属性:
	flex:1		1 指的是一个系数	√

	* 子元素在划分父元素宽度，先刨除固定宽度

	align-self	其实就是用来覆盖父级 align-items  垂直排列
		

	flex-grow: 1;	定义子元素放大比例

	order:	规定子元素顺序，排序
		数值越小，越靠前
		默认值0
	
