# todo-list
待办清单

## 功能
1. 新建工作项
2. 修改工作项
3. 删除工作项
4. 查找工作项
5. 完成工作项

## 遇到的问题

获取一个包含ul的所有li的数组，对li进行筛选，符合条件的删除，删除的过程，li数组的长度也跟着变化

解决：如果删除当前元素，令指针i不再自增（因此自动指向下一个li元素）

存储用localStorage

怎么建立一一对应关系？

解决：直接拿值当键（重复值无所谓）,另外索引也作为值存入local中


## todo

1. 目前修改文字，只能新增文字，没有删除旧文字
2. 另外焦点移出去后，没法保存列表项