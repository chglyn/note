...

## ElementUI-tree
点击属性icon也会触发接口调用，因此屏蔽icon点击，使用css解决

```
    cursor: default;
    pointer-events: none;

```



## 记录第N天日期

```  
    let timeDate = new Date(),
    day = 1;
    timeDate.setDate(timeDate.getDate() + day);

```


### 换算时、分、秒

``` parseInt(item.studyTime/3600) 时 parseInt(item.studyTime/60) 分 parseInt(item.studyTime%60) s ```


### 时间格式减法

```

	var start = 2018-07-10 10:30:33;
	var end = 2018-07-10 18:50:45;

	function testTime(start, end) {
		var now = new Date();
		start = new Date(start.replace(/-/g, '-'));
		end = new Date(end.replace(/-/g, '-'));

		if(start - now > 0 && now - end < 0) {
			return 'before';
		}else if(start - now <= 0 && now - end <= 0) {
			return 'waiting';
		}else if(start - now < 0 && now - end > 0) {
			return 'after';
		}
	}

```


## 字符转义

使用`window.location.search`获取中文参数会出现乱码情况，使用`decodeURI(乱码中文)`转义

其他有关转义的`escape、encodeURI、encodeURIComponent`

encodeURI()相比，encodeURIComponent方法将对更多的字符进行编码。如：`/`


## 模拟form提交参数

为简化旧项目流程，缩短开发时间，在不重构界面情况下；上个界面保存的数据直接到当前界面；由于数据形式是数组不能使用url传参方式，因此编写form形式插件。

```
$.extend({
	StandardPost:function(url, args){
		var form = $("<form method='post' style='display:none'></form>"), input;
		form.attr({ "action":url });
		args=JSON.parse(args);
		$.each(args, function(key2, value2){
			$.each(value2,function(key, value){
				input = $("<input type='hidden'>");
				input.attr({ "name":'objectArray['+key2+']['+key+']'});
				input.val(value);
				form.append(input);
			});
		});
		form.appendTo($('body'));
		form.submit();
		form.remove();
	}
});

```


## UM编辑器过滤获取内容

```
s.push(item.getContent());
s = s.join("\n");
s = $('<div>'+s+'</div>').find('img').each(function(index, el) {
    $(this)[0].src = $(this)[0].src.split('/').reverse()[0];
}).end().html()

```

## `input` 只输入数字

	function clearNum(obj) {
		obj.value = obj.value.replace(/[^\d.]/g,"");
		obj.value = obj.value.replace(/^\./g,"");
		obj.value = obj.value.replace(/\.{ 2, }/g,".");
		obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
		obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
	}

### `iframe` 父界面获取字界面

```
document.getElementById(Id).contentWindow.方法

```

