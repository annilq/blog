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
    return null
  }
  remove(key) {}
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
console.log(tree.inOrderTraverse());
console.log("-----------------preOrderTraverse------------");
console.log(tree.preOrderTraverse());
console.log("-----------------postOrderTraverse------------");
console.log(tree.postOrderTraverse());
