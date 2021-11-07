const installBtn = document.getElementById("install");
window.addEventListener('DOMContentLoaded', () => {
    installBtn.style.display = 'none';

    if ('serviceWorker' in navigator) {
        installBtn.style.display = 'block';
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('registrado', reg))
            .catch(err => console.log('erro', err))
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
        installBtn.style.display = 'none';
      }
})

let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
    deferredPrompt = e;
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
            installBtn.style.display = 'none';
        }
    }
});


