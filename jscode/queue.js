class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(value) {
    this.items.push(value);
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
class PriorityQueue extends Queue {
  constructor() {
    super();
  }
  enqueue(value, priority = 0) {
    let node = this.createNode(value, priority);
    if (this.isEmpty()) {
      this.items.push(node);
    } else {
      let inserted = false;
      this.items.forEach((item, index) => {
        // 如果插入的优先级比当前的元素的优先级大则插入他前面
        if (node.priority > item.priority) {
          this.items.splice(index, 0, node);
          inserted = true;
        }
      });
      if (!inserted) {
        this.items.push(node);
      }
    }
  }
  createNode(value, priority) {
    let node = {};
    node.value = value;
    node.priority = priority;
    return node;
  }
  print() {
    return this.items
      .map(item => {
        return item.value;
      })
      .toString();
  }
}
let queue2 = new PriorityQueue();
queue2.enqueue("c");
queue2.enqueue("d",1);
console.log(queue2.front());
// queue2.dequeue();
console.log(queue2.print());
