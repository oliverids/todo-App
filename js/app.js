export default function app() {
    const open = document.getElementById('open'),
        overlay = document.querySelector('.overlay'),
        create = document.getElementById('create'),
        back = document.getElementById('back');
    open.addEventListener('click', () => {
        overlay.classList.add('ativo');
        setTimeout(() => create.focus(), 100);
    })
    back.addEventListener('click', () => {
        overlay.classList.remove('ativo');
    })

    window.addEventListener('click', e => {
        if (!overlay.contains(e.target) && !open.contains(e.target)) {
            overlay.classList.remove('ativo');
        }
    })

    let taskList = document.querySelector('.tasks ul'),
        tasks, dragList, local, complete;
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
                complete.push(e.outerHTML);
                localStorage.setItem(`complete`, complete);
            })
        }

        if (ativas.length == 0) {
            localStorage.removeItem('tasks');
        } else {
            ativas.forEach(e => {
                local.push(e.outerHTML);
                localStorage.setItem(`tasks`, local);
            })
        }
    }

    const itemLeft = document.querySelector('.clear p')
    //function to post the new task
    function postTask(texto, completo, categ) {
        let tasktext = texto,
            classe = completo,
            categoria = categ;

        if (tasktext && classe) {
            let newTask = document.createElement('li');
            newTask.classList.add('task');
            newTask.setAttribute('draggable', 'true');
            newTask.classList.add(completo)
            newTask.innerHTML = `
        <div>
          <p>${tasktext}</p>
        </div>
        <button class="close"></button>
        `
            taskList.append(newTask);
            itemLeft.innerText = `${taskList.children.length} tarefa(s) ativa(s)`;
        } else {
            newTask = document.createElement('li');
            newTask.classList.add('task');
            newTask.classList.add(categoria);
            newTask.setAttribute('draggable', 'true');
            newTask.innerHTML = `
        <div>
          <p>${tasktext}</p>
        </div>
        <button class="close"></button>
        `
            taskList.append(newTask);
            itemLeft.innerText = `${taskList.children.length} tarefa(s) ativa(s)`;
        }
        updateList();
    }

    function postSavedTask(html) {
        let fromLocalStorage = html;
        let savedTask = document.createElement('li');
        taskList.append(savedTask);
        savedTask.outerHTML = `${fromLocalStorage}`;
        itemLeft.innerText = `${taskList.children.length} tarefa(s) ativa(s)`;
        updateList();
    }

    //mark as completed
    let index;
    function completeTask() {
        complete = [];
        let completas = taskList.querySelectorAll('li.task.completo');
        if (index !== -1) {
            tasks[index].classList.add('move');
            tasks[index].classList.toggle('completo');

            itemLeft.innerText = `${taskList.children.length - completas.length} tarefa(s) ativa(s)`;
            if (tasks[index].classList.contains('completo')) {
                tasks[index].removeAttribute('draggable');
            } else {
                tasks[index].setAttribute('draggable', 'draggable');
            }
        }
    }

    //marking as completed and removing tasks
    taskList.addEventListener('click', evt => {
        if (evt.target.nodeName === 'LI') {
            index = tasks.indexOf(evt.target);
            completeTask();
            if (evt.target.matches('.close')) {
                let item = evt.target.parentElement;
                taskList.removeChild(item)
                itemLeft.innerText = `${taskList.children.length} tarefa(s) ativa(s)`;
                updateList();
            }
            sort();
            updateLS();
        } else {
            index = tasks.indexOf(evt.target.closest('li.task'));
            completeTask();
            if (evt.target.matches('.close')) {
                let item = evt.target.parentElement;
                taskList.removeChild(item)
                itemLeft.innerText = `${taskList.children.length} tarefa(s) ativa(s)`;
                updateList();
            }
            sort();
            updateLS();
        }
        setTimeout(() => {
            let completas = taskList.querySelectorAll('li.task.completo');
            completas.forEach(e => e.classList.remove('move'))
        }, 500);
    });

    //clear all completed
    let clearCompleted = document.getElementById('clear');
    clearCompleted.addEventListener('click', () => {
        let completedTasks = document.querySelectorAll('li.task.completo');
        completedTasks.forEach(e => taskList.removeChild(e));
        itemLeft.innerText = `${taskList.children.length} tarefa(s) ativa(s)`;
        updateList();
        updateLS();
    })

    //sorting through categories
    let showcateg = document.getElementById('showcateg');
    function showCateg(categSelected) {
        let valor = categSelected;
        //seleciona todas
        let completedTasks = document.querySelectorAll('li.task.completo'),
            activeTasks = document.querySelectorAll('li.task:not(.completo)');
        //com categoria
        let completas = document.querySelectorAll(`li.task.completo.${valor}`),
            ativas = document.querySelectorAll(`li.task:not(.completo).${valor}`);

        if (showcateg.value == 'todas') {
            [...completedTasks, ...activeTasks].forEach(e => e.style.display = 'flex');
            // console.log('todas')
        }
        else if (showcateg.value == 'pessoal') {
            [...completedTasks, ...activeTasks].forEach(e => e.style.display = 'none');
            [...completas, ...ativas].forEach(e => e.style.display = 'flex');
        } else if (showcateg.value == 'saude') {
            [...completedTasks, ...activeTasks].forEach(e => e.style.display = 'none');
            [...completas, ...ativas].forEach(e => e.style.display = 'flex');
        } else if (showcateg.value == 'trabalho') {
            [...completedTasks, ...activeTasks].forEach(e => e.style.display = 'none');
            [...completas, ...ativas].forEach(e => e.style.display = 'flex');
        } else if (showcateg.value == 'escola') {
            [...completedTasks, ...activeTasks].forEach(e => e.style.display = 'none');
            [...completas, ...ativas].forEach(e => e.style.display = 'flex');
        } else if (showcateg.value == 'urgente') {
            [...completedTasks, ...activeTasks].forEach(e => e.style.display = 'none');
            [...completas, ...ativas].forEach(e => e.style.display = 'flex');
        } else if (showcateg.value == 'financas') {
            [...completedTasks, ...activeTasks].forEach(e => e.style.display = 'none');
            [...completas, ...ativas].forEach(e => e.style.display = 'flex');
        } else if (showcateg.value == 'comprar') {
            [...completedTasks, ...activeTasks].forEach(e => e.style.display = 'none');
            [...completas, ...ativas].forEach(e => e.style.display = 'flex');
        }
    }

    //drag and drop to reorder functions and mutation observer
    let dragged = null;
    function handleDragStart(e) {
        this.style.filter = 'brightness(50%)';
        dragged = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);
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
            dragged.outerHTML = this.outerHTML;
            this.outerHTML = e.dataTransfer.getData('text/html');
        }
        return false;
    }

    function handleDragEnd(e) {
        updateList();
        dragList.forEach(each => {
            each.style.filter = 'brightness(100%)';
            each.classList.remove('over');
        })
    }

    setTimeout(() => {
        let draggable = document.querySelectorAll('li.task:not(.completo)');
        draggable.forEach(item => {
            item.addEventListener('dragstart', handleDragStart, false);
            item.addEventListener('dragenter', handleDragEnter, false);
            item.addEventListener('dragover', handleDragOver, false);
            item.addEventListener('dragleave', handleDragLeave, false);
            item.addEventListener('drop', handleDrop, false);
            item.addEventListener('dragend', handleDragEnd, false);
        });
    }, 400);

    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            let lista = document.querySelectorAll('li.task:not(.completo)');
            itemLeft.innerText = `${lista.length} tarefa(s) ativa(s)`;
        }, 100);
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
                postSavedTask(texto)
            }
        }
        if ('complete' in localStorage) {
            let complete = localStorage.getItem('complete');
            let cleaned = Array.from(complete.split(','));
            for (let i = 0; i < cleaned.length; i++) {
                let texto = cleaned[i];
                postSavedTask(texto)
            }
        }

        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        let observer = new MutationObserver(mutations => {
            mutations.forEach(() => {
                setTimeout(() => {
                    let draggable = document.querySelectorAll('li.task:not(.completo)');
                    draggable.forEach(item => {
                        item.addEventListener('dragstart', handleDragStart, false);
                        item.addEventListener('dragenter', handleDragEnter, false);
                        item.addEventListener('dragover', handleDragOver, false);
                        item.addEventListener('dragleave', handleDragLeave, false);
                        item.addEventListener('drop', handleDrop, false);
                        item.addEventListener('dragend', handleDragEnd, false);
                    });
                }, 400);
            });
        });
        observer.observe(taskList, { childList: true });
    });

    let active = document.getElementById('active'),
        completed = document.getElementById('completed');

    //sorting through all, active and completed
    function sort() {
        let completedTasks = document.querySelectorAll('li.task.completo'),
            activeTasks = document.querySelectorAll('li.task:not(.completo)');

        if (active.classList.contains('sorted')) {
            completedTasks.forEach(e => e.style.display = 'none');
            activeTasks.forEach(e => e.style.display = 'flex');
            itemLeft.innerText = `${activeTasks.length} tarefa(s) ativa(s)`;
            clearCompleted.style.visibility = 'hidden';
        } else {
            activeTasks.forEach(e => e.style.display = 'none');
            completedTasks.forEach(e => e.style.display = 'flex');
            itemLeft.innerText = `${completedTasks.length} tarefa(s) completa(s)`;
            clearCompleted.style.visibility = 'visible';
        }
    }

    //active class
    [active, completed].forEach(e => {
        e.addEventListener('click', evt => {
            [active, completed].forEach(e => e.classList.remove('sorted'));

            if (evt.currentTarget == active) {
                active.classList.add('sorted');
                clearCompleted.style.visibility = 'hidden';

            } else if (evt.currentTarget == completed) {
                completed.classList.add('sorted');
                clearCompleted.style.visibility = 'visible';
            }
            sort();
        })
    })

    showcateg.addEventListener('change', () => {
        let valor = showcateg.value;
        showCateg(valor);
    })

    const post = document.getElementById('post'),
        createcateg = document.getElementById('createcateg');

    post.addEventListener('click', () => {
        let valor = create.value,
            categ = createcateg.value,
            warn = document.getElementById("warning");

        if (valor.length && categ !== 'hide') {
            warn.classList.remove('ativo');
            completed.classList.remove('sorted');
            sort();
            postTask(valor, categ);
            create.value = '';
            updateLS();
            overlay.classList.remove('ativo');

            if (!overlay.classList.contains('ativo')) {
                let options = Array.from(createcateg.querySelectorAll('option'));
                createcateg.value = options[0].value;
            }
        } else {
            warn.classList.add('ativo');
        }
    })

    window.addEventListener('keyup', evt => {
        if (evt.keyCode == 13) {
            post.click();
        }
    })
};