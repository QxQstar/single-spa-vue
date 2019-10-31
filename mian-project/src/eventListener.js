let vm;

export function startListen(_vm) {
    vm = _vm;
    listenLogout();
}


function listenLogout() {
    window.addEventListener('logout',() => {
        vm.logout();
});
}
