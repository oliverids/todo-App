const tema = document.getElementById('tema');
tema.addEventListener('click', () => {
    document.body.classList.toggle('claro');
    tema.classList.toggle("ativo");
})

let tasks = document.querySelectorAll('.task');

tasks.forEach(e => {
    e.addEventListener('click', evt => {
        let checa = evt.currentTarget.querySelector('.checa');

        [evt.currentTarget, checa].forEach(e => {
            e.classList.toggle('checado');
        })
        // evt.currentTarget.classList.toggle('checado');

    })
})

const create = document.getElementById('create'),
    taskList = document.querySelector('.tasks ul'),
    taskArray = Array.from(document.querySelectorAll('.task')),
    itemLeft = document.querySelector('.clear p');

window.addEventListener('keyup', evt => {
    let tasktext = create.value;
    if (evt.keyCode == 13 && tasktext) {
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
        taskArray.unshift(newTask);

        for (let i = 0; i < taskArray.length; i++) {
            taskList.append(taskArray[i]);
        }

        itemLeft.innerText = `${taskArray.length} items left`
    }
})

