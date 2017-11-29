class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  clear() {
    this.items = [];
  }
  size() {
    return this.items.length;
  }
  print() {
    return console.log(this.items.toString());
  }
}
let queue = new Queue();
queue.enqueue("a");
queue.enqueue("b");
console.log(queue.front());
queue.dequeue();
console.log(queue.front());
// ----------------构建优先队列-------------------
class PriorityElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}
class PriorityQueue extends Queue {
  constructor() {
    super();
  }
  enqueue(element, priority = 0) {
    let node = new PriorityElement(element, priority);
    // 判断是否已经插入到queue中
    let inserted = false;
    for (let i = 0; i < this.items.length; i++) {
      // 如果插入的优先级比当前的元素的优先级大则插入他前面
      if (node.priority > this.items[i].priority) {
        this.items.splice(i, 0, node);
        inserted = true;
        break;
      }
    }
    // 如果没有插入则插入到queue
    if (!inserted) {
      this.items.push(node);
    }
  }
  print() {
    return this.items
      .map(item => {
        return item.element;
      })
      .toString();
  }
}
let queue2 = new PriorityQueue();
queue2.enqueue("c");
queue2.enqueue("d", 1);
console.log(queue2.front());
// queue2.dequeue();
console.log(queue2.print());
