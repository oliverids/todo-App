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
        novoNome = document.getElementById('nome');

    changename.addEventListener('click', () => {
        novoNome.disabled = false;
        novoNome.classList.add('ativo');
        changename.classList.add('ativo');
    })

    window.addEventListener('click', e => {
        if (!changename.contains(e.target) && !novoNome.contains(e.target)) {
            novoNome.disabled = true;
            novoNome.classList.remove('ativo');
            changename.classList.remove('ativo');
            let novoUsername = novoNome.value;
            localStorage.setItem('user', novoUsername)
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