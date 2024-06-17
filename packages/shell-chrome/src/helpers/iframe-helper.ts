import { throttle } from 'lodash-es';
import { IFRAME_ID } from '../const';

const WRAPPER_CLASS_OPEN = 'ebp-wrapper--open';

export const createIframe = () => {
    return new Promise<HTMLIFrameElement>((resolve) => {
        const wrapper: HTMLDivElement = document.createElement('div');
        wrapper.setAttribute("id", `wrapper-${IFRAME_ID}`);
        wrapper.classList.add("ebp-wrapper");

        const iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", "http://localhost:5173/login");
        iFrame.setAttribute("id", IFRAME_ID);
        iFrame.classList.add("ebp-iframe");
        iFrame.addEventListener('load', () => {
            wrapper.classList.add(WRAPPER_CLASS_OPEN);
            resolve(iFrame);
        });

        const moveElement: HTMLDivElement = document.createElement('div');
        moveElement.classList.add("ebp-move-element");
        moveElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M7 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M5.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0-5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M7 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m3.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" clip-rule="evenodd"/></svg>`;
        let isDown = false;
        moveElement.addEventListener('mousedown', () =>{
            isDown = true;
        })
        moveElement.addEventListener('mouseup', () =>{
            isDown = false;
        })
        document.addEventListener('mousemove', throttle((evt) =>{
            evt.preventDefault();
            if (isDown) {
                wrapper.style.left = `${evt.clientX - 282}px`
                wrapper.style.top = `${evt.clientY + 20}px`
            }
        }, 150))

        wrapper.append(moveElement, iFrame);
        document.body.appendChild(wrapper);
    });
}

export const showIframe = () => {
    const iFrame = getWrapper();
    if (!iFrame) return;

    iFrame.classList.add(WRAPPER_CLASS_OPEN);
}

export const hideIframe = () => {
    const iFrame = getWrapper();
    if (!iFrame) return;

    iFrame.classList.remove(WRAPPER_CLASS_OPEN);
}

export const toggleIframe = (isNeedShow: boolean) => {
    const iFrame = getWrapper();
    if (!iFrame) return;

    if (isNeedShow) {
        iFrame.classList.add(WRAPPER_CLASS_OPEN);
        return;
    }

    iFrame.classList.remove(WRAPPER_CLASS_OPEN);
}

export const getIframe = (): HTMLIFrameElement | null => {
    const iFrame = document.getElementById(IFRAME_ID);
    if (iFrame instanceof HTMLIFrameElement) {
        return iFrame;
    }

    return null;
}

export const getWrapper = (): HTMLDivElement | null => {
    const wrapper = document.getElementById(`wrapper-${IFRAME_ID}`);
    if (wrapper instanceof HTMLDivElement) {
        return wrapper;
    }

    return null;
}

export const isIframeExists = (): boolean => {
    return getIframe() !== null;
}

export const changeHeightIframe = (height: number) => {
    const iFrame = getWrapper();
    if (!iFrame) return;

    iFrame.style.height = `${height}px`;
}
