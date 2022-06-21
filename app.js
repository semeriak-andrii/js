
class Queue {
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
    }
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    }
    peek() {
        return this.elements[this.head];
    }
    get length() {
        return this.tail - this.head;
    }
    get isEmpty() {
        return this.length === 0;
    }
}

let queue = new Queue();
const addBtn = document.querySelector('.add')
const input = document.querySelector('input')
const boxQueue = document.querySelector('.queue')
const p = document.createElement('p')
const btnDelete = document.querySelector('.delete')
const qwe = new Object(queue.elements)
let localQueue = localStorage.getItem('data')

function defoultAction() {
    boxQueue.append(p)
    p.classList.add('text')
    queue.enqueue(localStorage.getItem('data'))
    queue.dequeue()
    p.innerHTML = localQueue
}
defoultAction()

function addToHtml(localQueue) {
    localStorage.setItem('data', Object.values(queue.elements))
    localQueue = localStorage.getItem('data')
    p.innerHTML = localQueue
}

const addToQueue = () => {
    if (input.value && queue.length < 30) {
        queue.enqueue(input.value)
        addToHtml()
        input.value = ''
    } else {
        alert('input is empty or list is full')
    }
}

addBtn.addEventListener('click', addToQueue)

const firstElementDelete = () => {
    if (queue.length) {
        queue.dequeue()
        addToHtml()
        p.innerHTML = Object.values(queue.elements)
    }
}

btnDelete.addEventListener('click', firstElementDelete)