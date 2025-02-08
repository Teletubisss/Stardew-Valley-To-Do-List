let addTask = () => {
    let input = document.querySelector('#taskInput')
    let text = input.value.trim()
    let toDoLista = document.querySelector('#taskList')
    let toDoItem = document.createElement('li')
    let errorInput = document.querySelector('.inputError')



    if (text !== '') {
        toDoItem.innerHTML =`<div class="listFlex">
                                <span class='todo-text' onclick = 'toggleTask(this)' >${text}</span>
                                <button class="buttonList" onclick = 'editTask(this.previousElementSibling)' >EDIT</button>
                                <button class="buttonList" onclick = 'removeTask(this)' >DELETE</button>
                            </div>`
        toDoLista.appendChild(toDoItem)
    
        input.value = ''
        errorInput.textContent = ``
        document.querySelector(".inputError").style.display = "none";
    }
    else {
        errorInput.textContent = `Fill the text area`
        errorInput.style.display = "flex"
    }
};

let keyDown = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        addTask();
    }
}

let keyDownSave = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        saveEdit();
    }
    else if (e.keyCode === 27) {
        e.preventDefault();
        closePopup();
    }
}

let removeTask = (element) => {
    element.parentElement.remove()
}

let toggleTask = (element) => {
    element.classList.toggle('done')
}

let editTask = (element) => {
    currentTask = element;
    document.getElementById("editInput").value = element.innerText;
    document.getElementById("editPopupContainer").style.display = "flex";
}

let saveEdit = () => {
    if (currentTask) {
        currentTask.innerText = document.getElementById("editInput").value;
    }
    closePopup();
}

let closePopup = () => {
    document.querySelector("#editPopupContainer").style.display = "none";
}