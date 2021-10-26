import { nomeSalvo } from './loader.js';

export default function mainSection() {
    //hora
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

    nomeSalvo();

    // //nome
    const changename = document.getElementById('changename'),
        userdiv = document.getElementById('userdiv'),
        novoNome = document.getElementById('nome'),
        edita = document.getElementById('edita');

    changename.addEventListener('mouseenter', () => {
        changename.classList.add('abre')
        edita.classList.add('abre');
    });

    changename.addEventListener('mouseleave', () => {
        changename.classList.remove('abre')
        edita.classList.remove('abre');
    });

    changename.addEventListener('click', () => {
        if (changename.classList.contains('ativo')) {
            edita.innerText = 'Editar';
            [edita, changename].forEach(e => e.classList.remove('ativo'))
            novoNome.disabled = true;
        } else {
            edita.innerText = 'Salvar';
            [edita, changename].forEach(e => e.classList.add('ativo'))
            novoNome.disabled = false;
            novoNome.focus();
            [novoNome, userdiv].forEach(e => e.classList.toggle('ativo'));
        }
    });

    function cliqueForaDoInput() {
        novoNome.disabled = true;
        [edita, changename].forEach(e => e.classList.remove('ativo'));
        [novoNome, userdiv].forEach(e => e.classList.remove('ativo'));
        let novoUsername = novoNome.value;
        localStorage.setItem('usuario', novoUsername);
    }

    window.addEventListener('click', e => {
        if (!changename.contains(e.target) && !novoNome.contains(e.target)) {
            cliqueForaDoInput();
        }
    })

    window.addEventListener('keyup', evt => {
        if (evt.keyCode == 13) {
            cliqueForaDoInput();
        }
    })

    //tema
    window.addEventListener("DOMContentLoaded", () => {
        const tema = document.getElementById('tema');
        tema.addEventListener('click', () => {
            document.body.classList.toggle('claro');
            tema.classList.toggle("ativo");

            if (document.body.classList.contains("claro")) {
                localStorage.setItem('tema', 'claro');
            } else {
                localStorage.setItem('tema', 'escuro');
            }
        })

        let temaSalvo = localStorage.getItem('tema');

        if (temaSalvo == 'escuro') {
            document.body.classList.remove("claro");
            tema.classList.remove("ativo");
        } else {
            document.body.classList.add("claro");
            tema.classList.add("ativo");
        }
    })
}