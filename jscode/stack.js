class Stack {
  constructor() {
    this.items = [];
  }
  push(value) {
    this.items.push(value);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
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
let stack = new Stack();
stack.push("a");
stack.push("b");
stack.push("c");
console.log(stack.pop());
console.log(stack.peek());
// exmple十进制转二进制
function divideBy2(number) {
  let stack = new Stack();
  while (number > 0) {
    let a = Math.floor(number % 2);
    stack.push(a);
    number = Math.floor(number / 2);
  }
  if (!stack.isEmpty()) {
    stack.print();
  }
}
divideBy2(10);
