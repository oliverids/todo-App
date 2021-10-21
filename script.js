//themes
const tema = document.getElementById('tema');
tema.addEventListener('click', () => {
    document.body.classList.toggle('claro');
    tema.classList.toggle("ativo");
})

const post = document.getElementById('post'),
    create = document.getElementById('create'),
    taskList = document.querySelector('.tasks ul'),
    itemLeft = document.querySelector('.clear p');
let tasks, dragList, local, complete;

//update the task list after every modification
function updateList() {
    dragList = taskList.querySelectorAll('.task');
    tasks = [].slice.call(taskList.querySelectorAll('.task'), 0);
}

function updateLS() {
    local = [];
    complete = [];
    let ativas = document.querySelectorAll('li.task:not(.completo)');
    let completas = taskList.querySelectorAll('li.task.completo');

    if (completas.length == 0) {
        localStorage.removeItem('complete');
    } else {
        completas.forEach(e => {
            complete.push(e.children[0].children[1].innerText);
            localStorage.setItem(`complete`, complete);
        })
    }

    if (ativas.length == 0) {
        localStorage.removeItem('tasks');
    } else {
        ativas.forEach(e => {
            local.push(e.children[0].children[1].innerText);
            localStorage.setItem(`tasks`, local);
        })
    }
}

//function to post the new task
function postTask(texto, completo) {
    let tasktext = texto;
    let classe = completo;

    if (tasktext && classe) {
        newTask = document.createElement('li');
        newTask.classList.add('task');
        newTask.setAttribute('draggable', 'true');
        newTask.classList.add(completo)
        newTask.innerHTML = `
        <div>
          <button class="checa completo"></button>
          <p>${tasktext}</p>
        </div>
        <button class="close"></button>
        `
        taskList.append(newTask);
        itemLeft.innerText = `${taskList.children.length} item(s) left`;
    } else {
        newTask = document.createElement('li');
        newTask.classList.add('task');
        newTask.setAttribute('draggable', 'true');
        newTask.innerHTML = `
        <div>
          <button class="checa"></button>
          <p>${tasktext}</p>
        </div>
        <button class="close"></button>
        `
        taskList.append(newTask);
        itemLeft.innerText = `${taskList.children.length} item(s) left`;
    }
    updateList();
}

let all = document.getElementById('all'),
    active = document.getElementById('active'),
    completed = document.getElementById('completed');

//sorting through all, active and completed
function sort() {
    let completedTasks = document.querySelectorAll('li.task.completo'),
        activeTasks = document.querySelectorAll('li.task:not(.completo)');

    if (active.classList.contains('sorted')) {
        completedTasks.forEach(e => e.style.display = 'none');
        activeTasks.forEach(e => e.style.display = 'flex');
        itemLeft.innerText = `${activeTasks.length} active tasks`;
    } else if (completed.classList.contains('sorted')) {
        activeTasks.forEach(e => e.style.display = 'none');
        completedTasks.forEach(e => e.style.display = 'flex');
        itemLeft.innerText = `${completedTasks.length} completed tasks`;
    } else {
        activeTasks.forEach(e => e.style.display = 'flex');
        completedTasks.forEach(e => e.style.display = 'flex');
        itemLeft.innerText = `${taskList.children.length} item(s) left`;
    }
}

//active class
[all, active, completed].forEach(e => {
    e.addEventListener('click', evt => {
        [all, active, completed].forEach(e => e.classList.remove('sorted'));

        if (evt.currentTarget == active) {
            active.classList.add('sorted');

        } else if (evt.currentTarget == completed) {
            completed.classList.add('sorted');

        } else {
            all.classList.add('sorted');
        }
        sort();
    })
})

post.addEventListener('click', () => {
    let valor = create.value;
    if (valor.length) {
        [all, active, completed].forEach(e => e.classList.remove('sorted'));
        all.classList.add('sorted');
        sort();
        postTask(valor);
        create.value = '';
        updateLS();
    }
})

window.addEventListener('keyup', evt => {
    if (evt.keyCode == 13) {
        post.click();
    }
})

//mark as completed
let index;
function completeTask() {
    complete = [];
    let completas = taskList.querySelectorAll('li.task.completo');
    if (index !== -1) {
        tasks[index].classList.toggle('completo')
        tasks[index].querySelector('.checa').classList.toggle('completo');
        itemLeft.innerText = `${taskList.children.length - completas.length} item(s) left`;

        let foramCompletas = tasks.filter(e => {
            return e.classList.contains('completo');
        });

        let estaoAtivas = tasks.filter(e => {
            return !e.classList.contains('completo');
        });

        taskList.innerHTML= '';
        estaoAtivas.forEach(e => taskList.appendChild(e));
        foramCompletas.forEach(e => taskList.appendChild(e));
    }
    updateList();
    updateLS();
}

//marking as completed and removing tasks
taskList.addEventListener('click', evt => {
    if (!evt.target.nodeName == 'LI') {
        index = tasks.indexOf(evt.target.closest('li.task'));
        completeTask();
        if (evt.target.matches('.close')) {
            let item = evt.target.parentElement;
            taskList.removeChild(item)
            itemLeft.innerText = `${taskList.children.length} item(s) left`;
            updateList();
        }
        sort();
        updateLS();
    } else {
        index = tasks.indexOf(evt.target);
        completeTask();
        if (evt.target.matches('.close')) {
            let item = evt.target.parentElement;
            taskList.removeChild(item)
            itemLeft.innerText = `${taskList.children.length} item(s) left`;
            updateList();
        }
        sort();
        updateLS();
    }
});

//clear all completed
let clearCompleted = document.getElementById('clear');
clearCompleted.addEventListener('click', () => {
    let completedTasks = document.querySelectorAll('li.task.completo');
    completedTasks.forEach(e => taskList.removeChild(e));
    itemLeft.innerText = `${taskList.children.length} item(s) left`;
    updateList();
    updateLS();
})

//drag and drop to reorder functions and mutation observer
let dragged = null;
function handleDragStart(e) {
    this.style.filter = 'brightness(50%)';
    dragged = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('text/text', 'id');
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();

    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    updateList();
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.preventDefault) e.preventDefault();

    if (dragged != this) {
        dragged.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}

function handleDragEnd(e) {
    updateList();
    dragList.forEach(each => {
        this.style.filter = 'brightness(100%)';
        each.classList.remove('over');
    })
}

window.addEventListener('DOMContentLoaded', () => {
    //check if user is using a device with touchscreen
    let notouchWarning = document.getElementById('notouch');
    if ('ontouchstart' in window) {
        notouchWarning.classList.add('notouch')
    } else {
        notouchWarning.classList.remove('notouch')
    }

    //check if tasks exist and update them on the page
    if ('tasks' in localStorage) {
        let tasks = localStorage.getItem('tasks');
        let cleaned = Array.from(tasks.split(','));
        for (let i = 0; i < cleaned.length; i++) {
            let texto = cleaned[i];
            postTask(texto);
        }
    }
    if ('complete' in localStorage) {
        let complete = localStorage.getItem('complete');
        let cleaned = Array.from(complete.split(','));
        for (let i = 0; i < cleaned.length; i++) {
            let texto = cleaned[i];
            postTask(texto, 'completo');
        }
    }

    let lista = document.querySelector('.tasks ul');

    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(() => {
            let tasks = document.querySelectorAll('.task');
            tasks.forEach(item => {
                item.addEventListener('dragstart', handleDragStart, false);
                item.addEventListener('dragenter', handleDragEnter, false);
                item.addEventListener('dragover', handleDragOver, false);
                item.addEventListener('dragleave', handleDragLeave, false);
                item.addEventListener('drop', handleDrop, false);
                item.addEventListener('dragend', handleDragEnd, false);
            });
        });
    });
    observer.observe(lista, { childList: true });
});





