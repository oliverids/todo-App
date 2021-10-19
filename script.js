const tema = document.getElementById('tema');
tema.addEventListener('click', () => {
    document.body.classList.toggle('claro');
    tema.classList.toggle("ativo");
})

const post = document.getElementById('post'),
    create = document.getElementById('create'),
    taskList = document.querySelector('.tasks ul'),
    itemLeft = document.querySelector('.clear p');
let tasks;

function postTask() {
    let tasktext = create.value;

    if (tasktext) {
        let newTask = document.createElement('li');
        newTask.classList.add('task');
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

    tasks = [].slice.call(taskList.querySelectorAll('.task'), 0);
}

let all = document.getElementById('all'),
    active = document.getElementById('active'),
    completed = document.getElementById('completed');

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
    // create.value = '';
})

window.addEventListener('keyup', evt => {
    if (evt.keyCode == 13) {
        post.click();
    }
})

let index;
function completeTask() {
    if (index !== -1) {
        tasks[index].classList.add('completo')
        tasks[index].querySelector('.checa').classList.add('completo');
        let completas = taskList.querySelectorAll('li.task.completo');
        itemLeft.innerText = `${taskList.children.length - completas.length} item(s) left`;

    }
}

taskList.addEventListener('click', evt => {
    if (evt.target.nodeName == 'P' || evt.target.nodeName == 'DIV' || evt.target.matches('.checa')) {
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

let clearCompleted = document.getElementById('clear');
clearCompleted.addEventListener('click', () => {
    let completedTasks = document.querySelectorAll('li.task.completo');
    completedTasks.forEach(e => taskList.removeChild(e));
    itemLeft.innerText = `${taskList.children.length} item(s) left`;
})






