/*点击消失 */
$(document).mouseup(function(e) {
    var _con = $(' 目标区域 '); // 设置目标区域
    if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
        // 功能代码
    }
});
/* Mark 1 的原理：
判断点击事件发生在区域外的条件是：
1. 点击事件的对象不是目标区域本身
2. 事件对象同时也不是目标区域的子元素
*/


/**
 * boostraps table中 $("#table td") 选择到，其他的都没有选择到（不知道为什么）
 */
//点击table，采购单弹框消失
setTimeout(function() {
    $('#table td').click(function(e) {
        //debugger;
        if (e.target.tagName.toLowerCase() != "img") {
            var _con = $('.purchase_status_order'); // 设置目标区域
            if (!_con.is(e.target) && _con.has(e.target).length === 0) {
                $('.purchase_status_order').css('display', 'none');
            }
        }

    });
}, 1000);