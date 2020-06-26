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
  constructor(compare) {
    this.root = null;
    this.size = 0;
    this.compare = compare || this.compare;
  }
  // 自定义比较方法
  compare(e1, e2) {
    return e1 - e2;
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
        compare = this.compare(element, currentNode.element);
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
  preorderTraversal() {
    const traversal = (node) => {
      if (node === null) return;
      console.log(node.element);
      traversal(node.left);
      traversal(node.right);
    }
    traversal(this.root);
  }

  inorderTraversal(visitor) {
    if(visitor === null) return;
    const traversal = (node) => {
      if (node === null) return;
      traversal(node.left);
      visitor.visit(node);
      traversal(node.right);
    }
    traversal(this.root);
  }

  inorderTraversal(visitor) {
    if(visitor === null) return;
    const traversal = (node) => {
      if (node === null) return;
      traversal(node.left);
      visitor.visit(node);
      traversal(node.right);
    }
    traversal(this.root);
  }

  postorderTraversal(visitor) {
    // 使用访问者模式在外面对节点进行操作
    if(visitor === null) return;
    const traversal = (node) => {
      if (node === null) return;
      traversal(node.left);
      traversal(node.right);
      console.log(node.element);
      visitor.visit(node);
    }
    traversal(this.root);
  }
}