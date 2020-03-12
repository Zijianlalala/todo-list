// 准备
function prepareList() {
    var oUl = document.getElementsByTagName('ul')[0];
    var aBtn = document.getElementsByClassName('btn');
    var aLi = oUl.getElementsByTagName('li');
    var oldValue = null;
    // 新建项
    aBtn[0].onclick = function () {
        createItem(null, true);
    }
    // 删除选中项
    aBtn[1].onclick = function () {
        for (var i = 0; i < aLi.length; i++) {
            if (aLi[i].getElementsByTagName('input')[0].checked) {
                var oldKey = aLi[i].getElementsByTagName('input')[1].value;
                // 更新索引
                updateIndex(oldKey, null, 'index');
                updateIndex(oldKey, null, 'completed_index');
                // 删除缓存中的旧键值对
                deleteItem(oldKey);
                aLi[i].parentElement.removeChild(aLi[i]);
                i--;
            }
        }
    }
    // 新建列表项
    function createItem(value, focused, completed) {
        // 创建item
        var oCheckBox = document.createElement('input');
        var oText = document.createElement('input');
        oCheckBox.type = 'checkbox';
        completed && (oCheckBox.checked = true, oText.style.textDecoration = 'line-through');
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
            if (!oText.value) { // 如果输入框为空，则不能选中
                alert('请先输入待办项');
                return false;
            }
            // 设置删除线
            var style = oText.style;
            style.textDecoration = (style.textDecoration == 'line-through' ? 'none' : 'line-through');
            // 保存状态
            var indexValue = getItem('completed_index');
            indexValue.indexOf(oText.value) != -1
                ? updateIndex(oText.value, null, 'completed_index') // 删掉完成索引
                : updateIndex(null, oText.value, 'completed_index'); // 加入完成索引
        }
        // 设置对话框按回车键保存键盘事件
        oText.onkeyup = function (event) {
            var event = event || window.event;
            if (event.keyCode == 13) {
                aBtn[0].onclick();
            }
        }
        // 设置获取焦点记录旧数据
        oText.onfocus = function () {
            oldValue = this.value;
        }
        // 设置失去焦点时保存对话框信息
        oText.onblur = function () {
            if (oldValue && this.value) { // 如果旧值和新值都存在
                if (oldValue === this.value) return;
                updateIndex(oldValue, this.value, 'index');
                deleteItem(oldValue);
                storeItem(this.value, this.value);
            } else if (this.value) { // 只有新值存在
                updateIndex(null, this.value, 'index');
                storeItem(this.value, this.value);
            }
        }
        focused && oText.focus();
    }
    // 封装与存储相关的函数
    // 获取存储项
    function getItem(key) {
        return localStorage.getItem(key);
    }
    // 设置存储项，纯粹封装localStorage.setItem()方法
    function storeItem(key, value) {
        // 存储数据
        localStorage.setItem(key, value);
        console.log('存储项 ' + '(key: ' + key + ', value: ' + value + ')');
    }
    /**
     * 删除缓存中的键值对
     * @param {*} key 
     */
    function deleteItem(key) {
        localStorage.removeItem(key);
        console.log('删除项 ' + key);
    }
    /**
     * 更新旧item，如果有新值就更新索引，没有就删除旧值的索引
     * @param {*} oldKey 为空时，直接添加新索引
     * @param {*} newKey 为空时，删除旧索引
     */
    function updateIndex(oldKey, newKey, indexKey) {
        // 获取索引数组并更新数组的值
        var indexValue = localStorage.getItem(indexKey);
        var aIndex = indexValue == '' ? [] : indexValue.split(',');
        if (oldKey != null) { // 修改或删除旧索引
            var po = aIndex.indexOf(oldKey);
            console.log(indexKey + '更新前' + aIndex);
            newKey ? aIndex.splice(po, 1, newKey) : aIndex.splice(po, 1);
            console.log(indexKey + '更新后' + aIndex);
        } else { // 添加新索引
            aIndex.push(newKey);
        }
        // 更新缓存中的索引数组
        // if (aIndex.length > 0) {
            localStorage.setItem(indexKey, aIndex.join(','));
            console.log('更新索引' + indexKey + '数组' + aIndex);
        // }
        // else {
        //     console.log('因为长度为0所以索引'+ indexKey +'数组' + aIndex);
        //     localStorage.removeItem(indexKey);
        // }
    }
    // 缓存初始化
    function firstLoad() {
        localStorage.setItem('index', '');
        localStorage.setItem('completed_index', '');
        console.log('first load index');
    }
    // 是否有缓存项
    function isLoaded() {
        return localStorage.length > 0;
    }
    // 启动页面
    // 判断localStorage是否有缓存
    if (isLoaded()) {
        var indexValue = getItem('index');
        var completedIndexValue = getItem('completed_index');
        var aIndex = indexValue.split(',');
        for (var i = 0; i < aIndex.length; i++) {
            var value = aIndex[i];
            var completed = completedIndexValue.indexOf(value) != -1;
            createItem(value, false, completed);
        }
    } else {
        aBtn[0].onclick();
        // 初始化索引对象
        firstLoad();
    }
    // 构造函数
    // function Item(state, value) {
    //     this.state = state;
    //     this.value = value;
    // }
}
window.onload = function () {
    prepareList();
}