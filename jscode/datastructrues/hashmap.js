const LinkedList = require("./linkedlist");
class MapElement {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}
class HashMap {
  constructor() {
    this.table = [];
  }
  _djb2HashCode(key) {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
  }
  put(key, value) {
    let hashCode = this._djb2HashCode(key);
    if (!this.table[hashCode]) {
      let linkedlist = new LinkedList();
      this.table[hashCode] = linkedlist;
    }
    this.table[hashCode].append(new MapElement(key, value));
  }
  get(key) {
    let hashCode = this._djb2HashCode(key);
    if (this.table[hashCode]) {
      let linkedHead = this.table[hashCode].head;
      if (linkedHead.element.key == key) {
        return linkedHead.element.value;
      }
      let current = linkedHead.next;
      while (current.next) {
        if (current.element.key === key) {
          return current.element.value;
          break;
        } else {
          current = current.next;
        }
      }
      return;
    }
  }
  remove(key) {
    let hashCode = this._djb2HashCode(key);
    if (this.table[hashCode]) {
      let linklist = this.table[hashCode];
      let current = linklist.head;
      while (current.next) {
        if (current.element.key === key) {
          linklist.remove(current.element);
          if (linklist.isEmpty()) {
            this.table[hashCode] = undefined;
          }
          return true;
        }
        current = current.next;
      }
      if (current.element.key === key) {
        this.table[hashCode].remove(current.element);
        if (linklist.isEmpty()) {
          this.table[hashCode] = undefined;
        }
        return true;
      }
    }
    return false;
  }
  toString() {
    let result = "";
    for (let linkedList of this.table) {
      if (linkedList) {
        let current = linkedList.head;
        result += current.element.value;
        while (current.next) {
          result += linkedList;
          current = current.next;
        }
      }
    }
    return result;
  }
}
let hashmap = new HashMap();

hashmap.put("a", "a");
hashmap.put("b", "b");
hashmap.put("c", "c");
console.log(hashmap.get("c"));
console.log(hashmap.remove("b"));
console.log(hashmap.toString());
