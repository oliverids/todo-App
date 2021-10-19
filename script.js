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
        itemLeft.innerText = `${taskList.children.length} items left`;
    }

    tasks = [].slice.call(taskList.querySelectorAll('.task'), 0);
}

post.addEventListener('click', () => {
    postTask();
    // create.value = '';
})

window.addEventListener('keyup', evt => {
    if (evt.keyCode == 13) {
        post.click();
    }
})

taskList.addEventListener('click', evt => {
    let index = tasks.indexOf(evt.target);
    if (index !== -1) {
        tasks[index].classList.add('completo')
        tasks[index].querySelector('.checa').classList.add('completo');
        
        let completas = taskList.querySelectorAll('li.task.completo');
        itemLeft.innerText = `${taskList.children.length - completas.length} items left`;
    } else if(evt.target.matches('.close')) {
        let item = evt.target.parentElement;
        // console.log(item);
        taskList.removeChild(item)
        itemLeft.innerText = `${taskList.children.length} items left`;
    }
});




