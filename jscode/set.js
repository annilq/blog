class Set {
  constructor(...set) {
    if (set) {
      this.collection = set;
    } else {
      this.collection = {};
    }
  }
  add(value) {
    if (this.has(value)) {
      return false;
    } else {
      this.collection[value] = value;
      return true;
    }
  }
  delete(value) {
    if (this.has(value)) {
      delete this.collection.value;
      return true;
    } else {
      return false;
    }
  }
  has(value) {
    return this.collection.hasOwnProperty(value);
  }
  clear() {
    this.collection = {};
  }
  size() {
    return Object.keys(this.collection).length;
  }
  values() {
    let values = [];
    for (let key in this.collection) {
      if (this.has(key)) {
        values.push(key);
      }
    }
    return values;
  }
  // 设置集合方法
  union(set) {
    // 并集
    let result = new Set();
    for (let value of this.values()) {
      result.add(value);
    }
    for (let value of set.values()) {
      result.add(value);
    }
    return result;
  }
  intersection(set) {
    // 交集
    let result = new Set();
    for (let value of set.values()) {
      if (this.has(value)) {
        result.add(value);
      }
    }
    return result;
  }
  difference(set) {
    // 差集
    let result = new Set();
    for (let value of this.values()) {
      if (!set.has(value)) {
        result.add(value);
      }
    }
    return result;
  }
  subset(set) {
    // 子集
    let isSubset = true;
    if (this.size() > set.size()) {
      for (let value of set.values()) {
        if (!this.has(value)) {
          isSubset = false;
        }
      }
      return isSubset;
    } else {
      return false;
    }
  }
}
// 测试集合方法
let set = new Set();
set.add("a");
set.add("b");
set.add("b");
set.add("c");
console.log(set.has("a"));
console.log(set.has("d"));
console.log(set.size());
console.log(set.values());
// 测试集合操作方法
let setA = new Set();
setA.add("a");
setA.add("b");
console.log(setA.union(set).values());
console.log(setA.intersection(set).values());
console.log(setA.difference(set).values());
console.log(set.subset(setA));
