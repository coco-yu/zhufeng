// 实现二叉搜索树

class Node {
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
    this.right = null;
    this.left = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  add(element) {
    if (this.root === null) {
      this.root = new Node(element, null);
      this.size++;
      return;
    } else {
      currentNode = this.root;
      let compare = null;
      let parent = null;
      while (currentNode) {
        compare = element - currentNode.element;
        parent = currentNode;
        if (compare > 0) {
          currentNode = currentNode.right;
        } else {
          currentNode = currentNode.left;
        }
      }

      const newNode = new Node(element, parent);
      if (compare > 0) {
        parent.right = newNode;
      } else {
        parent.left = newNode;
      }
    }
  }
}