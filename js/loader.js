export default function load() {
    window.addEventListener('DOMContentLoaded', () => {
        const time = document.getElementById('time');
        let data = new Date(),
            hora = data.getHours();

        if (hora < 12) {
            time.innerText = 'Bom dia,';
        } else if (hora < 18) {
            time.innerText = 'Boa tarde,';
        } else {
            time.innerText = 'Boa noite,';
        }

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
                    const nome = document.getElementById('nome');
                    nome.innerText = user;
                    [loader, info, titulo].forEach(e => e.classList.remove("show"))
                }
            })

            window.addEventListener("keyup", evt => {
                if (evt.keyCode == 13) {
                    begin.click();
                }
            })
        }
    })
}