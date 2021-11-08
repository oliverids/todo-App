const installBtn = document.getElementById("install");
window.addEventListener('DOMContentLoaded', () => {
    installBtn.style.display = 'none';

    if ('serviceWorker' in navigator) {
        installBtn.style.display = 'block';
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('registrado', reg))
            .catch(err => console.log('erro', err))
    }

    if (localStorage.getItem('APP_INSTALLED') !== null) {
        installBtn.style.display = 'none';
      }
})

let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
    localStorage.removeItem('APP_INSTALLED');
    deferredPrompt = e;
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
            installBtn.style.display = 'none';
            localStorage.setItem('APP_INSTALLED', 'confirmed');
        }
    }
});


