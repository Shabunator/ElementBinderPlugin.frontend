import { TabStorageSession } from "./types/tab-storage-session";

const ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "http://localhost:5173/");
ifrm.setAttribute("id", "element-binder-plugin-iframe");
ifrm.classList.add("ebp-iframe");

window.addEventListener('click-extension-button', (event) => {
    if (document.getElementById('element-binder-plugin-iframe') === null) {
        document.body.appendChild(ifrm);

        setTimeout(() => { ifrm.classList.add('ebp-iframe--open'); }, 0);
        return;
    }

    const { detail }: Record<'detail', TabStorageSession> = (event as CustomEvent);

    if (detail.isMenuOpen) {
        ifrm.classList.add('ebp-iframe--open');
        return;
    }

    ifrm.classList.remove('ebp-iframe--open');
})
