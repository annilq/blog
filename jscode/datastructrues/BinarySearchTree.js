class TreeNode {
  constructor(node) {
    this.key = node;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(key) {
    let node = new TreeNode(key);
    if (this.root === null) {
      this.root = node;
      return true;
    } else {
      this._insertNode(this.root, node);
    }
  }
  _insertNode(root, node) {
    if (root.key > node.key) {
      if (root.left) {
        this._insertNode(root.left, node);
      } else {
        root.left = node;
      }
    } else if (root.key < node.key) {
      if (root.left) {
        this._insertNode(root.right, node);
      } else {
        root.right = node;
      }
    }
  }
  _searchNode(node, key) {
    if (node === null) {
      return false;
    }
    if (node.key > key) {
      return this._searchNode(node.left, key);
    }
    if (node.key < key) {
      return this._searchNode(node.right, key);
    }
    return true;
  }
  search(key) {
    return this._searchNode(this.root, key);
  }
  // 中序遍历树节点
  inOrderTraverse() {
    function _traverseNode(node) {
      if (node) {
        _traverseNode(node.left);
        console.log(node.key);
        _traverseNode(node.right);
      }
    }
    return _traverseNode(this.root);
  }

  // 先序遍历树节点
  preOrderTraverse() {
    function _traverseNode(node) {
      if (node) {
        console.log(node.key);
        _traverseNode(node.left);
        _traverseNode(node.right);
      }
    }
    return _traverseNode(this.root);
  }
  // 后序遍历树节点
  postOrderTraverse() {
    function _traverseNode(node) {
      if (node) {
        _traverseNode(node.left);
        _traverseNode(node.right);
        console.log(node.key);
      }
    }
    return _traverseNode(this.root);
  }
  min() {
    let current = this.root;
    if (current) {
      while (current.left) {
        current = current.left;
      }
      return current.key;
    }
    return null;
  }
  max() {
    let current = this.root;
    if (current) {
      while (current.right) {
        current = current.right;
      }
      return current.key;
    }
    return null;
  }
  remove(key) {
    this.root = this._removeNode(this.root, key);
  }
  _removeNode(node, key) {
    if (node === null) {
      return null;
    }
    if (node.key > key) {
      node.left = this._removeNode(node.left, key);
      return node;
    } else if (node.key < key) {
      node.right = this._removeNode(node.right, key);
      return node;
    }
    // 执行到这里就说明找到了要删除的节点,需要判断三种情况
    // 1. 没有子节点
    // 2. 只有一个节点
    // 3. 有两个节点
    // -------------------------------------
    // 没有子节点
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }
    // 有一个节点
    if (node.left === null) {
      return node.right;
    } else if (node.right === null) {
      return node.left;
    }
    // 有两个节点
    let minNode = this._findMinNode(node);
    node.key = minNode.key;
    node.right = this._removeNode(node.right, minNode.key);
    return node;
  }
  _findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
}

let tree = new BinarySearchTree();
tree.insert(3);
tree.insert(4);
tree.insert(2);
tree.insert(1);
console.log(tree.search(1));
console.log(tree.search(5));
console.log(tree.min());
console.log(tree.max());
console.log("-----------------inOrderTraverse------------");
tree.inOrderTraverse();
console.log("-----------------preOrderTraverse------------");
tree.preOrderTraverse();
console.log("-----------------postOrderTraverse------------");
tree.postOrderTraverse();
console.log("-----------------remove------------");
tree.remove(4);
tree.inOrderTraverse();
