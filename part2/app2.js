const leftBox = document.getElementById('left-block')
const rightBox = document.getElementById('right-block')
const buttonJS = document.getElementById('from-js')
const buttonServer = document.getElementById('from-server')
const load = document.getElementById('load')

class GetXhr {

    loaded() {
        load.classList.remove('hiden')
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users')
        xhr.send()
        xhr.onload = () => {
            if (xhr.status !== 200) {
                err.xhrError()
            } else {
                const parsed = JSON.parse(xhr.response)
                for (const iterator of parsed) {
                    const p = document.createElement('p')
                    p.classList.add('p-left')
                    leftBox.append(p)
                    p.append(iterator.name)
                }
            }
        }
        load.classList.add('hiden')
    }
}

class GetFetch {

    listFetch() {
        load.classList.remove('hiden')
        
        const dataServer = fetch(`https://jsonplaceholder.typicode.com/users`).then((response) => {
               if (response.ok) {  
                   return response.json()
            }
                err.fetchError()
        }
        )
            dataServer.then(arr => {
                arr.forEach((iterator, index) => {
                    const boxUserServer = document.createElement('div')
                    boxUserServer.id = 'box-user-server'
                    rightBox.append(boxUserServer)
                    const p1 = document.createElement('p')
                    boxUserServer.append(p1)
                    p1.append(iterator.name)
                    const divButtons = document.createElement('div')
                    boxUserServer.append(divButtons)
                    divButtons.id = 'blok-button'
                    boxUserServer.append(divButtons)
                    const divInput = document.createElement('div')
                    boxUserServer.append(divInput)
                    divInput.id = 'blok-input'
                    boxUserServer.append(divInput)
                    const input = document.createElement('input')
                    divInput.append(input)
                    const inputBtn = document.createElement('button')
                    inputBtn.append('Save')
                    divInput.append(inputBtn)
                    const body = input.value
                    inputBtn.addEventListener('click', () => patch.saved(body, index))
                    
                }
                )
            }
            )
            load.classList.add('hiden')
        }
}

class Patch{

saved(index, name) {
    load.classList.remove('hiden')
    fetch(`https://jsonplaceholder.typicode.com/users/${index + 1}`, {
        method: "PATCH",
        body: JSON.stringify(name),
        headers: { 'Content-Type': 'application/json' }
    }
    ).then(response => {
        if (response.ok) {
            return response.json()
        }
        err.fetchError()
    })
    load.classList.add('hiden')
}

}

class Errors {

    xhrError() {
        return alert(`Error`)
    }
    fetchError() {
        return alert('Something went wrong!')
    }
}

const xhrLoad = new GetXhr()
const fetchLoad = new GetFetch()
const patch = new Patch()
const err = new Errors()

buttonJS.addEventListener('click', xhrLoad.loaded)
buttonServer.addEventListener('click', fetchLoad.listFetch)


            

