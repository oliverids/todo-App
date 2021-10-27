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
            setTimeout(() => window.scrollTo( 0, 0), 200);
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

            let terminou = false;
            let begin = document.getElementById('begin');
            begin.addEventListener('click', () => {
                tutorial1.classList.remove('show');
                setTimeout(() => loader.classList.add('final'), 500);
                setTimeout(() => {
                    tutorial2.classList.add('show');
                    setTimeout(() => openshow.classList.add('ativo'), 300);
                    setTimeout(() => spanshow.classList.add('ativo'), 600);

                    window.addEventListener('click', evt => {
                        if(!terminou) {
                            if(!openshow.contains(evt.target)) {
                                tutorial2.classList.remove('show');
                                loader.classList.add('completo');
                                document.documentElement.style.overflow = 'visible';
                                setTimeout(() => openshow.classList.remove('ativo'), 300);
                                setTimeout(() => spanshow.classList.remove('ativo'), 300);
                            } else {
                                evt.preventDefault();
                                tutorial2.classList.remove('show');
                                loader.classList.add('completo');
                                setTimeout(() => openshow.click(), 200);
                                terminou = true;
                                setTimeout(() => openshow.classList.remove('ativo'), 300);
                                setTimeout(() => spanshow.classList.remove('ativo'), 300);
                            }
                        }
                    })
                }, 1000);
            })
        } else {
            titulo.classList.add('show')
            setTimeout(() => loader.classList.add('completo'), 1000);
            setTimeout(() => document.documentElement.style.overflow = 'visible', 1200);
        }
    })
}