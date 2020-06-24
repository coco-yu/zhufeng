// 实现链表的发转

class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(index, element) {
        if (arguments.length === 1) {
            element = index;
            index = this.size;
        }

        if (index < 0 || index > this.size) {
            throw Error('越界');
        }

        if (index === 0) {
            const head = this.head;
            this.head = new Node(element, head);
        } else {
            const prevNode = this.getNode(index - 1);
            prevNode.next = new Node(element, prevNode.next);
        }

    }

    getNode(index) {
        const current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
}

