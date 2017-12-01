class Map {
  constructor() {
    this.map = {};
  }
  set(key, value) {
    this.map[key] = value;
  }
  delete(key) {
    if (this.has(key)) {
      delete this.map.key;
      return true;
    } else {
      return false;
    }
  }
  has(key) {
    return this.map.hasOwnProperty(key);
  }
  get(key) {
    if (this.has(key)) {
      return this.map[key];
    }
  }
  clear() {
    this.map = {};
  }
  size() {
    return Object.keys(this.map).length;
  }
  keys() {
    return Object.keys(this.map);
  }
  values() {
    let values = [];
    for (let key in this.map) {
      if (this.has(key)) {
        values.push(key);
      }
    }
    return values;
  }
}
// 测试集合方法
let map = new Map();
map.set("a", "a");
map.set("b", "b");
map.set("c", "c");
console.log(map.has("a"));
console.log(map.size());
console.log(map.keys());
console.log(map.values());
