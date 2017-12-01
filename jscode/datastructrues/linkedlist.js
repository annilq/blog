class LinkedListElement {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }
  append(element) {
    let linkedlistelement = new LinkedListElement(element);
    if (this.head === null) {
      this.head = linkedlistelement;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = linkedlistelement;
    }
  }
  insert(position, element) {
    let linkedlistelement = new LinkedListElement(element);
    if (position === 0) {
      if (this.head === null) {
        this.head = linkedlistelement;
        return true;
      } else {
        let current = this.head;
        this.head = linkedlistelement;
        linkedlistelement.next = current;
        return true;
      }
    } else {
      let current = this.head, index = 0, inserted = false;
      while (current.next) {
        index++;
        if (index === position) {
          let next = current.next;
          current.next = linkedlistelement;
          linkedlistelement.next = next;
          inserted = true;
          break;
        } else {
          current = current.next;
        }
      }
      return inserted;
    }
  }
  remove(element) {
    let position = this.indexOf(element);
    return this.removeAt(position);
  }
  indexOf(element) {
    if (this.head === null) {
      return -1;
    } else {
      if (this.head.element == element) {
        return 0;
      } else {
        let current = this.head, index = 0, finded = false;
        while (current.next) {
          index++;
          current = current.next;
          if (current.element == element) {
            finded = true;
            break;
          }
        }
        if (finded) {
          return index;
        } else {
          return -1;
        }
      }
    }
  }
  removeAt(position) {
    if (position === 0) {
      let current = this.head;
      this.head = current.next;
      return true;
    } else {
      let current, index = 0, removed = false;
      current = this.head;
      while (current.next) {
        let next = current.next;
        index++;
        if (index === position) {
          current.next = next.next;
          removed = true;
          break;
        } else {
          current = current.next;
        }
      }
      return removed;
    }
  }
  isEmpty() {
    return !this.head;
  }
  size() {
    let sum = 0, current = null;
    current = this.head;
    while (current.next) {
      sum++;
      current = current.next;
    }
    return sum+1;
  }
  valueOf() {
    this.toString();
  }
  toString() {
    let result = "", current = null;
    current = this.head;
    while (current.next) {
      result += current.element;
      current = current.next;
    }
    return result + current.element;
  }
}
// let linklist = new LinkedList();
// console.log(linklist.isEmpty());
// linklist.append("a");
// linklist.append("b");
// console.log(linklist.insert(0, "c"));
// console.log(linklist.size());
// // console.log(linklist.removeAt(0));
// console.log(linklist.toString());
module.exports=LinkedList
