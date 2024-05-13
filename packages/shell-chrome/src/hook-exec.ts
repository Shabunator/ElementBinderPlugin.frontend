import { TabStorageSession } from './types/tab-storage-session';
import { messageListener } from './helpers/message-listener';
import { createIframe, toggleIframe, isIframeExists } from './helpers/iframe-helper'
import { getDataAutocomplete } from './helpers/site-helper'

window.addEventListener('message', messageListener);

window.addEventListener('click-extension-button', (event) => {
    if (!isIframeExists()) {
        createIframe();
        getDataAutocomplete();
        return;
    }

    const { detail }: Record<'detail', TabStorageSession> = (event as CustomEvent);
    toggleIframe(detail.isMenuOpen);
})
