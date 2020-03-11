// 准备
function prepareList() {
    var oUl = document.getElementsByTagName('ul')[0];
    var aBtn = document.getElementsByClassName('btn');
    var aLi = oUl.getElementsByTagName('li');
    // 新建项
    aBtn[0].onclick = function () {
        newItem(null, true);
    }
    // 删除选中项
    aBtn[1].onclick = function () {
        var length = aLi.length;
        var index = localStorage.getItem('index');
        var aIndex = index.split(',');
        for (var i = 0; i < aLi.length; i++) {
            if (aLi[i].getElementsByTagName('input')[0].checked) {
                var deleteValue = aLi[i].getElementsByTagName('input')[1].value;
                var po = aIndex.indexOf(deleteValue);
                aIndex.splice(po, 1);
                localStorage.setItem('index', aIndex.join(','));
                // console.log(index);
                aLi[i].parentElement.removeChild(aLi[i]);
                i--;
            }
        }
    }
    // 新建列表项li
    function newItem(value, focused) {
        // 创建item
        var oCheckBox = document.createElement('input');
        oCheckBox.type = 'checkbox';
        var oText = document.createElement('input');
        oText.tyle = 'text';
        oText.className = 'txt';
        oText.placeholder = '请输入待办项';
        value && (oText.value = value);
        // 绑定元素
        var oLi = document.createElement('li');
        oLi.appendChild(oCheckBox);
        oLi.appendChild(oText);
        oUl.appendChild(oLi);
        // 设置完成点击事件
        oCheckBox.onclick = function () {
            var style = oText.style;
            style.textDecoration = (style.textDecoration == 'line-through' ? 'none' : 'line-through');
        }
        // 设置键盘事件
        oText.onkeyup = function (event) {
            var event = event || window.event;
            if (event.keyCode == 13) {
                aBtn[0].onclick();
                if (!localStorage.getItem('index')) {
                    localStorage.setItem('index', '');
                }
                var index = localStorage.getItem('index');
                if (this.value && index.indexOf(this.value) == -1) {
                    index += index == '' ? this.value : ',' + this.value;
                    localStorage.setItem('index', index);
                    localStorage.setItem(this.value, this.value);
                }
            }
        }
        focused && oText.focus();
    }
    // 启动页面
    // 判断localStorage是否有缓存
    if (localStorage.length > 0) {
        var index = localStorage.getItem('index');
        var aIndex = index.split(',');
        for (var i = 0; i < aIndex.length; i++) {
            var value = aIndex[i];
            newItem(value, false);
        }
    } else {
        aBtn[0].onclick();
    }
}

window.onload = function () {
    prepareList();
}