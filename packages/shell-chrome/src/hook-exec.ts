import { TabStorageSession } from './types/tab-storage-session';
import { createIframe, toggleIframe, isIframeExists, getIframe, changeHeightIframe } from './helpers/iframe-helper'

window.addEventListener('click-extension-button', async (event) => {
    if (!isIframeExists()) {
        await createIframe();
        return;
    }

    const { detail }: Record<'detail', TabStorageSession> = (event as CustomEvent);
    toggleIframe(detail.isMenuOpen);
})

window.addEventListener('click-context-menu', async (event) => {
    let iFrame = getIframe();

    if (!iFrame) {
        iFrame = await createIframe();
    }
    if (!iFrame.contentWindow) {
        return;
    }

    window.postMessage({
        source: "element-binder-plugin",
        payload: {
            type: 'click-extension-button',
            detail: { isMenuOpen: true }
        }
    }, '*');

    const { detail }: Record<'detail', { info: Record<string, string> }> = (event as CustomEvent);
    iFrame.contentWindow.postMessage({
        source: "element-binder-plugin",
        payload: {
            type: 'click-context-menu',
            detail: detail.info
        }
    }, '*');
})

window.addEventListener('change-height', async (event) => {
    const { detail }: Record<'detail', { height: number }> = (event as CustomEvent);
    changeHeightIframe(detail.height + 8)
})
