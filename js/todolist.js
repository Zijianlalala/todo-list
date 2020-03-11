// 准备
function prepareList() {
    var oUl = document.getElementsByTagName('ul')[0];
    var aBtn = document.getElementsByClassName('btn');
    var aLi = oUl.getElementsByTagName('li');
    // 新建项
    aBtn[0].onclick = function () {
        var oCheckBox = document.createElement('input');
        oCheckBox.type = 'checkbox';
        var oText = document.createElement('input');
        oText.tyle = 'text';
        oText.className = 'txt';
        oText.placeholder = '请输入待办项';
        // 设置完成点击事件
        oCheckBox.onclick = function() {
            lineThrough(oText);
        }
        // 设置键盘事件
        oText.onkeyup = function(event) {
            var event = event || window.event;
            if (event.keyCode == 13) {
                aBtn[0].onclick();
                // localStorage.setItem('value')
            }
        }
        // 绑定元素
        var oLi = document.createElement('li');
        oLi.appendChild(oCheckBox);
        oLi.appendChild(oText);
        oUl.appendChild(oLi);
        // 为新的对话框设计焦点
        oText.focus();
    }
    // 删除选中项
    aBtn[1].onclick = function () {
        var length = aLi.length;
        for (var i = 0; i < aLi.length; i++) {
            if (aLi[i].getElementsByTagName('input')[0].checked) {
                aLi[i].parentElement.removeChild(aLi[i]);
                i--;
            }
        }
    }
    // 完成项
    // for (var i = 0; i < aLi.length; i++) {
    //     var aInput = aLi[i].getElementsByTagName('input');
    //     // 设置删除线 text-decoration-line: line-through;
    //     aInput[0].onclick = function () {
    //         lineThrough(aInput[1]);    
    //     }
        // aInput[1].onkeyup = function(event) {
        //     var event = event || window.event;
        //     newItem(event);
        // }
    // }
    // 划删除线
    function lineThrough(elem) {
        var style = elem.style;
        style.textDecoration = (style.textDecoration == 'line-through' ? 'none' : 'line-through');
    }
    // input按回车键新建项并且将值保存到localStorage中
    function newItem(event) {
        // TODO 将焦点切换到新建的对话框中
    }
    //启动页面
    aBtn[0].onclick();
}

window.onload = function () {
    prepareList();
}