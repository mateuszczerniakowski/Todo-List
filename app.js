let container, todoInput, errorInfo, addBtn, ulList, newTaskContent, popUp, popUpInfo, taskToEdit, popUpInput, popUpAddBtn, popUpCloseBtn

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
    getSavedTasks()
}

const getSavedTasks = () => {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        let taskFromStorage = document.createElement('li');
        taskFromStorage.textContent = task;
        taskFromStorage.classList.add('task')
        addButtons(taskFromStorage)
        ulList.appendChild(taskFromStorage)
    });
}
const prepareDOMElements = () => {
    todoInput = document.querySelector('.Input')
    errorInfo = document.querySelector('.info')
    addBtn = document.querySelector('.addBtn')
    ulList = document.querySelector('.taskList ul')
    popUp = document.querySelector('.popUp')
    popUpInfo = document.querySelector('.popUp p')
    popUpInput = document.querySelector('.popUp input')
    popUpAddBtn = document.querySelector('.ok')
    popUpCloseBtn = document.querySelector('.cancel')
    container = document.querySelector('.container')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTask)
    ulList.addEventListener('click', checkClick)
    popUpCloseBtn.addEventListener('click', closePopUp)
    popUpAddBtn.addEventListener('click', editToDoText)
    container.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            addNewTask()
        }
    })
}

const clearInput = () => {
    todoInput.value = ''
}

const addNewTask = () => {
    if (todoInput.value !== "") {
        const newTask = document.createElement('li')
        newTask.classList.add('task')
        newTask.textContent = todoInput.value
        storeTaskInLocalStorage(newTask.textContent)
        addButtons(newTask)
        ulList.appendChild(newTask)
        clearInput()
        errorInfo.textContent = 'Add something..'
        errorInfo.classList.remove('warning')

    } else {
        errorInfo.textContent = 'Add the task name!'
        errorInfo.classList.add('warning')
    }
}

const addButtons = (newTask) => {
    const div = document.createElement('div')
    const doneBtn = document.createElement('button')
    doneBtn.classList.add('btn')
    doneBtn.classList.add('done')
    doneBtn.textContent = '✅'

    const editBtn = document.createElement('button')
    editBtn.classList.add('btn')
    editBtn.classList.add('edit')
    editBtn.textContent = '✏️'
    editBtn.style.transform = 'scaleX(-1)'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn')
    deleteBtn.classList.add('delete')
    deleteBtn.textContent = '❌'

    div.append(doneBtn, editBtn, deleteBtn)
    newTask.append(div)
}

const checkClick = (e) => {
    e.target.matches(".edit") ? editToDo(e) : 0
    if (e.target.matches(".delete") || e.target.matches(".done")) {
        removeFromLocalStorage(e.target.closest('li').firstChild)
        e.target.closest('li').remove()
    }
}

const editToDo = (e) => {
    taskToEdit = e.target.closest('li')
    popUpInput.value = taskToEdit.firstChild.textContent
    popUp.classList.add('isVisible')
    popUp.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            editToDoText()
        }
    })
}

const closePopUp = () => {
    popUp.classList.remove('isVisible')
    popUpInfo.textContent = ''
}

const editToDoText = () => {
    if (popUpInput.value !== '') {
        let oldTaskVersion = taskToEdit.firstChild.textContent
        let newTaskVersion = popUpInput.value
        editTaskInLocalStorage(oldTaskVersion, newTaskVersion)
        taskToEdit.firstChild.textContent = popUpInput.value
        popUp.classList.remove('isVisible')
        popUpInfo.textContent = ''
    } else {
        popUpInfo.classList.add('warning')
        popUpInfo.textContent = 'Any text required!'
    }
}
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function editTaskInLocalStorage(oldTaskVersion, newTaskVersion) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    };
    tasks.forEach(task => {
        if (task == oldTaskVersion) {
            let index = tasks.indexOf(task);
            tasks[index] = newTaskVersion;
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    };
    tasks.forEach(
        function (task, index) {
            if (taskItem.textContent === task) {
                tasks.splice(index, 1);
            }
        }
    )
    localStorage.setItem('tasks', JSON.stringify(tasks));
};




document.addEventListener('DOMContentLoaded', main)