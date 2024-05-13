import { IFRAME_ID } from '../const';

const IFRAME_CLASS_OPEN = 'ebp-iframe--open';

export const createIframe = () => {
    const iFrame = document.createElement("iframe");
    iFrame.setAttribute("src", "http://localhost:5173/");
    iFrame.setAttribute("id", IFRAME_ID);
    iFrame.classList.add("ebp-iframe");
    iFrame.addEventListener('load', () => {
        iFrame.classList.add(IFRAME_CLASS_OPEN);
    });

    document.body.appendChild(iFrame);
}

export const showIframe = () => {
    const iFrame = document.getElementById(IFRAME_ID);
    if (!iFrame) return;

    iFrame.classList.add(IFRAME_CLASS_OPEN);
}

export const hideIframe = () => {
    const iFrame = document.getElementById(IFRAME_ID);
    if (!iFrame) return;

    iFrame.classList.remove(IFRAME_CLASS_OPEN);
}

export const toggleIframe = (isNeedShow: boolean) => {
    const iFrame = document.getElementById(IFRAME_ID);
    if (!iFrame) return;

    if (isNeedShow) {
        iFrame.classList.add(IFRAME_CLASS_OPEN);
        return;
    }

    iFrame.classList.remove(IFRAME_CLASS_OPEN);
}

export const isIframeExists = (): boolean => {
    return document.getElementById(IFRAME_ID) instanceof HTMLIFrameElement;
}
