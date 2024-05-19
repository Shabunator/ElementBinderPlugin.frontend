import { TabStorageSession } from './types/tab-storage-session';
import { messageListener } from './helpers/message-listener';
import { createIframe, toggleIframe, isIframeExists, getIframe } from './helpers/iframe-helper'
// import { getDataAutocomplete } from './helpers/site-helper'

window.addEventListener('message', messageListener);

window.addEventListener('click-extension-button', (event) => {
    if (!isIframeExists()) {
        createIframe();
        // getDataAutocomplete();
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

    toggleIframe(true);

    const { detail }: Record<'detail', { info: Record<string, string> }> = (event as CustomEvent);
    iFrame.contentWindow.postMessage({
        source: "element-binder-plugin",
        payload: {
            type: 'click-context-menu',
            detail: detail.info
        }
    }, '*');
})
