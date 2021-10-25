export function nomeSalvo() {
    const nome = document.getElementById('nome');
    nome.value = localStorage.getItem('user');
    // setTimeout(() => nome.disabled = true, 100);
}

export default function load() {
    window.addEventListener('DOMContentLoaded', () => {
        const loader = document.getElementById('loader'),
            titulo = document.getElementById('titulo'),
            info = document.getElementById('info');

        if (localStorage.getItem("user") === null) {
            titulo.classList.add('show')

            setTimeout(() => titulo.classList.remove('show'), 1000);
            setTimeout(() => info.classList.add('show'), 1400);

            localStorage.clear();

            let input = document.getElementById('user'),
                begin = document.getElementById('begin');

            begin.addEventListener('click', () => {
                let user = input.value;
                if (user.length) {
                    localStorage.setItem('user', user);

                    setTimeout(() => {
                        loader.classList.add('completo');
                        document.documentElement.style.overflow = 'visible';
                    }, 100);
                }
                nomeSalvo();
            })

            window.addEventListener("keyup", evt => {
                if (evt.keyCode == 13) {
                    begin.click();
                }
            })
        } else {
            titulo.classList.add('show')
            setTimeout(() => loader.classList.add('completo'), 1000);
            setTimeout(() => document.documentElement.style.overflow = 'visible', 1200);
        }
    })
}