import { TabStorageSession } from "./types/tab-storage-session";

const ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "http://localhost:5173/");
ifrm.setAttribute("id", "element-binder-plugin-iframe");
ifrm.classList.add("ebp-iframe");

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(ifrm);
});

window.addEventListener('click-extension-button', (event) => {
    const { detail }: Record<'detail', TabStorageSession> = (event as CustomEvent);

    if (detail.isMenuOpen) {
        ifrm.classList.add('ebp-iframe--open');
        return;
    }

    ifrm.classList.remove('ebp-iframe--open');
})
