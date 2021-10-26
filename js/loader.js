export function nomeSalvo() {
    const nome = document.getElementById('nome');
    nome.value = localStorage.getItem('usuario');
    setTimeout(() => nome.disabled = true, 100);
}

export default function load() {
    window.addEventListener('DOMContentLoaded', () => {
        const loader = document.getElementById('loader'),
            titulo = document.getElementById('titulo'),
            info = document.getElementById('info'),
            nomeEscolhido = document.getElementById('nomeEscolhido'),
            tutorial1 = document.getElementById('tutorial1'),
            tutorial2 = document.getElementById('tutorial2');

        if (localStorage.getItem("usuario") === null) {
            localStorage.clear();
            titulo.classList.add('show');

            setTimeout(() => titulo.classList.remove('show'), 1000);
            setTimeout(() => {
                info.classList.add('show');

                let input = document.getElementById('user'),
                    proximo = document.getElementById('proximo');

                proximo.addEventListener('click', () => {
                    let user = input.value;
                    if (user.length) {
                        localStorage.setItem('usuario', user);
                        nomeEscolhido.innerText = user;
                        info.classList.remove('show')
                        setTimeout(() => tutorial1.classList.add('show'), 500);
                    }
                    nomeSalvo();
                })
            }, 1400);

            let begin = document.getElementById('begin');
            begin.addEventListener('click', () => {
                tutorial1.classList.remove('show');
                setTimeout(() => loader.classList.add('final'), 500);
                setTimeout(() => {
                    tutorial2.classList.add('show');

                    window.addEventListener('click', () => {
                        tutorial2.classList.remove('show');
                        loader.classList.add('completo');
                        document.documentElement.style.overflow = 'visible';
                    })
                }, 800);
            })
        } else {
            titulo.classList.add('show')
            setTimeout(() => loader.classList.add('completo'), 1000);
            setTimeout(() => document.documentElement.style.overflow = 'visible', 1200);
        }
    })
}