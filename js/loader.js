export function nomeSalvo() {
    const nome = document.getElementById('nome');
    nome.value = localStorage.getItem('username');
    setTimeout(() => nome.disabled = true, 100);
}

export default function load() {
    window.addEventListener('DOMContentLoaded', () => {
        const loader = document.getElementById('loader'),
            titulo = document.getElementById('titulo'),
            info = document.getElementById('info'),
            nomeEscolhido = document.getElementById('nomeEscolhido'),
            tutorial1 = document.getElementById('tutorial1'),
            tutorial2 = document.getElementById('tutorial2'),
            openshow = document.getElementById('open'),
            spanshow = document.querySelector('#open span');

        if (localStorage.getItem("username") === null) {
            localStorage.clear();
            setTimeout(() => window.scrollTo(0, 0), 200);
            titulo.classList.add('show');

            setTimeout(() => titulo.classList.remove('show'), 1000);
            setTimeout(() => {
                info.classList.add('show');

                let input = document.getElementById('user'),
                    proximo = document.getElementById('proximo');

                proximo.addEventListener('click', () => {
                    let user = input.value;
                    if (user.length) {
                        localStorage.setItem('username', user);
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
                setTimeout(() => tutorial2.classList.add('show'), 1000);
                setTimeout(() => {
                    tutorial2.classList.remove('show');
                    [openshow, spanshow].forEach(e => e.classList.add('ativo'))
                    loader.classList.add('completo')
                    document.documentElement.style.overflow = 'visible';
                }, 2200);
                setTimeout(() => [openshow, spanshow].forEach(e => e.classList.remove('ativo')), 4000);
            })
        } else {
            titulo.classList.add('show')
            setTimeout(() => {
                loader.classList.add('completo')
                document.documentElement.style.overflow = 'visible'
            }, 1000);
            setTimeout(() => loader.style.display = 'none', 1600);
        }
    })
}