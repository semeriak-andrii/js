
class Queue {
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
        if (localStorage.getItem('data')) {
            this.elements = JSON.parse(localStorage.getItem('data'));
            if (Object.keys(this.elements) > 0) {
                this.head = Math.min(...Object.keys(this.elements).map(key => +key));
                this.tail = Math.max(...Object.keys(this.elements).map(key => +key)) + 1;
            }
        }
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
        this.updateStorage();
    }
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        this.updateStorage();
        return item;
    }
    updateStorage() {
        localStorage.setItem('data', JSON.stringify(this.elements));
    }
    getElements() {
        return Object.values(this.elements);
    }
    get length() {
        return this.tail - this.head;
    }
}

const queue = new Queue();
const addBtn = document.querySelector('.add')
const input = document.querySelector('input')
const boxQueue = document.querySelector('.queue')
const p = document.createElement('p')
const btnDelete = document.querySelector('.delete')

function defoultAction() {
    boxQueue.append(p)
    p.classList.add('text')
    p.innerHTML = queue.getElements();
}
defoultAction()

const addToQueue = () => {
    if (input.value && queue.length < 30) {
        queue.enqueue(input.value)
        p.innerHTML = queue.getElements();
        input.value = ''
    } else {
        alert('input is empty or list is full')
    }
}

addBtn.addEventListener('click', addToQueue)

const firstElementDelete = () => {
    if (queue.length > 0) {
        queue.dequeue()
        p.innerHTML = queue.getElements();
    }
}

btnDelete.addEventListener('click', firstElementDelete)