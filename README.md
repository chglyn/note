##验证手机
function verMobile(val){
    val = parseInt($.trim(val));
    var re = new RegExp("^1[3456789][0-9]{9}$");
    return re.test(val);
}
##UM编辑器过滤获取内容
s.push(item.getContent());
s = s.join("\n");
s = $('<div>'+s+'</div>').find('img').each(function(index, el) {
    $(this)[0].src = $(this)[0].src.split('/').reverse()[0];
}).end().html()
