export default function load() {
    window.addEventListener('DOMContentLoaded', () => {


        if (localStorage.getItem("username") === null) {
            localStorage.clear();
            document.body.style.overflow = 'hidden';
            let loader = document.getElementById('loader'),
                titulo = document.getElementById('titulo'),
                info = document.getElementById('info');

            loader.classList.add('show');
            titulo.classList.add('show');
            setTimeout(() => {
                titulo.classList.remove('show');
                info.classList.add('show');
            }, 1200);

            let input = document.getElementById('user'),
                begin = document.getElementById('begin');
            begin.addEventListener('click', () => {
                let user = input.value;
                if (user.length) {
                    localStorage.setItem('username', user);
                    setTimeout(() => {
                    [loader, info, titulo].forEach(e => e.classList.remove("show"))
                    }, 100);
                }
            })

            window.addEventListener("keyup", evt => {
                if (evt.keyCode == 13) {
                    begin.click();
                }
            })
        }
        const nome = document.getElementById('nome');
        nome.value = localStorage.getItem('username');
        nome.disabled = true;
    })
}