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