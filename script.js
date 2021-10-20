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
let tasks, dragList;

//update the task list after every modification
function updateList() {
    dragList = taskList.querySelectorAll('.task');
    tasks = [].slice.call(taskList.querySelectorAll('.task'), 0);
}

//function to post the new task
function postTask() {
    let tasktext = create.value;

    if (tasktext) {
        let newTask = document.createElement('li');
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
    [all, active, completed].forEach(e => e.classList.remove('sorted'));
    all.classList.add('sorted');
    sort();
    postTask();
    create.value = '';
})

window.addEventListener('keyup', evt => {
    if (evt.keyCode == 13) {
        post.click();
    }
})

//mark as completed
let index;
function completeTask() {
    if (index !== -1) {
        tasks[index].classList.toggle('completo')
        tasks[index].querySelector('.checa').classList.toggle('completo');
        let completas = taskList.querySelectorAll('li.task.completo');
        itemLeft.innerText = `${taskList.children.length - completas.length} item(s) left`;
    }
}

//marking as completed and removing tasks
taskList.addEventListener('click', evt => {
    if (!evt.target.nodeName == 'LI') {
        index = tasks.indexOf(evt.target.closest('li'));
        completeTask();
        if (evt.target.matches('.close')) {
            let item = evt.target.parentElement;
            taskList.removeChild(item)
            itemLeft.innerText = `${taskList.children.length} item(s) left`;
        }
        sort();
    } else {
        index = tasks.indexOf(evt.target);
        completeTask();
        if (evt.target.matches('.close')) {
            let item = evt.target.parentElement;
            taskList.removeChild(item)
            itemLeft.innerText = `${taskList.children.length} item(s) left`;
        }
        sort();
    }
});

//clear all completed
let clearCompleted = document.getElementById('clear');
clearCompleted.addEventListener('click', () => {
    let completedTasks = document.querySelectorAll('li.task.completo');
    completedTasks.forEach(e => taskList.removeChild(e));
    itemLeft.innerText = `${taskList.children.length} item(s) left`;
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
    dragList.forEach(each => {
        this.style.filter = 'brightness(100%)';
        each.classList.remove('over');
    })
    updateList();
}

window.addEventListener('DOMContentLoaded', () => {
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





