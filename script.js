let currentTask = undefined;

let addTask = () => {
    let input = document.querySelector('#taskInput');
    let text = input.value.trim();
    let toDoLista = document.querySelector('#taskList');
    let toDoItem = document.createElement('li');
    let errorInput = document.querySelector('.inputError');

    if (text !== '') {
        toDoItem.innerHTML = getListInnerHtml(text);
        toDoLista.appendChild(toDoItem);
    
        input.value = '';
        errorInput.textContent = ``;
        document.querySelector(".inputError").style.display = "none";

    }
    else {
        errorInput.textContent = `Fill the text area`;
        errorInput.style.display = "flex";
    }
    saveToStorage();
}

let getListInnerHtml = (text) => {
    return `<div class="listFlex">
                <span class='todo-text' onclick = 'toggleTask(this)' >${text}</span>
                <button class="buttonList" onclick = 'editTask(this.previousElementSibling)' >EDIT</button>
                <button class="buttonList" onclick = 'removeTask(this)' >DELETE</button>
            </div>`;
}

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
    element.parentElement.parentElement.remove();
    saveToStorage();
}

let toggleTask = (element) => {
    element.classList.toggle('done');
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
    saveToStorage();
    closePopup();
}

let closePopup = () => {
    document.querySelector("#editPopupContainer").style.display = "none";
}

let saveToStorage = () => {
    let arrayData = [];

    let tasks = document.getElementById('taskList');

    for(let i=0; i<tasks.children.length; i++) {
        let task = tasks.children[i].children[0].children[0].innerText;
        arrayData.push(task);
    }
    
    localStorage.setItem("stardrewData", JSON.stringify(arrayData));
}

let loadFromStorage = () => {
    let listHtml = '';
    let arrayData = [];
    arrayData = JSON.parse(localStorage.getItem("stardrewData"));  
    if (arrayData === null)
        return;

    for(let i=0; i<arrayData.length; i++) {
        let innerHtml = getListInnerHtml(arrayData[i]);
        let item = '<li>' + innerHtml + '</li>';
        listHtml = listHtml + item;
    }   

    let tasks = document.getElementById('taskList');
    tasks.innerHTML = listHtml;
}

//runs at page initialization
window.onload = function() {
    loadFromStorage();
}