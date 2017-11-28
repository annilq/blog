## 几种常见的数据结构
1. Stack栈
2. Queue队列
3. LinkedList链表
4. Set集合
5. Map字典、散列表
6. Tree树
7. 图(还不理解)

### Stack
栈是一种遵从后进先出原则的有序集合
 - push() 添加一个新元素到栈顶
 - pop() 移除栈顶的元素，并且返回移除的元素
 - peek() 返回栈顶的元素
 - isEmpty() 判断栈是否为空
 - clear()清空栈
 - size() 返回栈元素个数

应用：十进制转换二进制
### Queue
队列是遵从先进先出原则的一组有序集合
 - enqueue() 向队列尾部添加新元素
 - dequeue() 移除队列第一个元素，并返回该元素
 - front() 返回队列的第一个元素
 - isEmpty() 判断队列是否为空
 - size() 返回队列的元素个数

 其他修改版本的队列实现
 - 优先队列 应用：医院排队
  >需要构建一个包含优先级的元素
  ```javascript
  let Node=function(element,priority){
    this.element=element;
    this.priority=priority;
  }
  ```
 - 循环队列 应用：击鼓传花游戏

### LinkedList
链表是有序的元素集合，不同于集合，链表中的元素在内存中不是连续放置的，每个元素由一个存储元素本身的节点和一个指向下一个元素的引用组成
 - append(element) 向链表尾处添加一个元素
 - insert(position,element) 向指定位置添加一个元素
 - remove(element) 移除指定元素
 - indexOf(element) 返回元素在链表中的索引
 - removeAt(position) 移除指定位置的元素
 - isEmpty() 判断链表是否为空
 - size() 返回链表元素个数
 - toString() 由于链表项使用了Node类，就需要重写继承自javascript对象默认的toString方法，让其只输出元素的值

 其他修改版本的队列实现
 - 双向链表 :双向链表中链接是双向的，一个链接向上的一个链接向下的
  ```javascript
  let Node=function(element){
    this.element=element;
    this.prev=null;
    this.next=null;
  }
  ```
 - 循环链表 :循环链表与链表的唯一区别在于,最后一个元素指向下一个元素的指针不是null,而是第一个元素head

 >ps:使用Stack 、Queue与LinkedList之间的区别
 >- Stack 、Queue相对于链表来说数据结构简单，并且(再大多数语言中)数组的大小是固定的，不容易扩容，链表可以动态扩容
 >- 从Stack 、Queue起点或中间插入或移除元素成本非常高，因为需要移动元素，而链表不需要移动元素

### Set
集合是一组无序且唯一的项组成的

  集合方法
  - add(value) 添加一个元素到集合中
  - delete(value) 删除集合中的一个元素
  - has(value) 判断值是否在集合中
  - clear() 清空集合
  - size() 返回集合中的元素数量
  - values() 返回一个包含集合中所有值的数组


  集合操作
  - union 并集
  - intersection 交集
  - difference 差集
  - subset 子集

### Map,HashTable
