if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('registrado', reg))
    .catch(err => console.log('erro', err))
}