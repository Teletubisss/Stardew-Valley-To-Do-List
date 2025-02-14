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
    saveToStorage();
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

    const tasks = Array.from(document.querySelectorAll('#taskList li')).map(task => ({
        text: task.querySelector("span").innerText,
        done: task.querySelector("span").classList.contains("done")
    }));;
    console.log(tasks)

    
    localStorage.setItem("stardrewData", JSON.stringify(tasks));
}

let loadFromStorage = () => {

    const tasks = JSON.parse(localStorage.getItem("stardrewData")) || [];

    const taskList = document.querySelector("#taskList");

    tasks.forEach(task => {
        let toDoItem = document.createElement('li');
        toDoItem.innerHTML = `<div class="listFlex">
                                <span class='todo-text ${task.done ? "done":""}' onclick = 'toggleTask(this)' >${task.text}</span>
                                <button class="buttonList" onclick = 'editTask(this.previousElementSibling)' >EDIT</button>
                                 <button class="buttonList" onclick = 'removeTask(this)' >DELETE</button>
                            </div>`;
        taskList.appendChild(toDoItem);

    });


}

//runs at page initialization
window.onload = function() {
    loadFromStorage();
}








// const car = {
//     number: 234,
//     color: "red",
// }

// // {
// //     "number": 234,
// //     "color": "red"
// // }


// const numbers = []
// console.log(JSON.stringify(car))
// console.log(numbers)