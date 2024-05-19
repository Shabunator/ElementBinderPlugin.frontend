import { IFRAME_ID } from '../const';

const IFRAME_CLASS_OPEN = 'ebp-iframe--open';

export const createIframe = () => {
    return new Promise<HTMLIFrameElement>((resolve) => {
        const iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "http://localhost:5173/");
        iFrame.setAttribute("id", IFRAME_ID);
        iFrame.classList.add("ebp-iframe");
        iFrame.addEventListener('load', () => {
            iFrame.classList.add(IFRAME_CLASS_OPEN);
            resolve(iFrame);
        });

        document.body.appendChild(iFrame);
    });
}

export const showIframe = () => {
    const iFrame = getIframe();
    if (!iFrame) return;

    iFrame.classList.add(IFRAME_CLASS_OPEN);
}

export const hideIframe = () => {
    const iFrame = getIframe();
    if (!iFrame) return;

    iFrame.classList.remove(IFRAME_CLASS_OPEN);
}

export const toggleIframe = (isNeedShow: boolean) => {
    const iFrame = getIframe();
    if (!iFrame) return;

    if (isNeedShow) {
        iFrame.classList.add(IFRAME_CLASS_OPEN);
        return;
    }

    iFrame.classList.remove(IFRAME_CLASS_OPEN);
}

export const getIframe = (): HTMLIFrameElement | null => {
    const iFrame = document.getElementById(IFRAME_ID);
    if (iFrame instanceof HTMLIFrameElement) {
        return iFrame;
    }

    return null;
}

export const isIframeExists = (): boolean => {
    return getIframe() !== null;
}

export const changeHeightIframe = (height: number) => {
    const iFrame = getIframe();
    if (!iFrame) return;

    iFrame.style.height = `${height}px`;
}
