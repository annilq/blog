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
    if (this.head === null) {
      return false;
    } else {
      if (this.head.element == element) {
        this.head = this.head.next;
        return true;
      } else {
        let current = this.head, removed = false;
        while (current.next) {
          let next = current.next;
          if (next.element == element) {
            current.next = next.next;
            removed = true;
          } else {
            current = current.next;
          }
        }
        return removed;
      }
    }
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
  removeAt(position) {}
  isEmpty() {}
  size() {}
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
let linklist = new LinkedList();
linklist.append("a");
linklist.append("b");
console.log(linklist.insert(0, "c"));
console.log(linklist.indexOf("a"));
console.log(linklist.toString());
