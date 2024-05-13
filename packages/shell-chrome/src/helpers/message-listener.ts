import { toggleIframe } from './iframe-helper'

export const messageListener = (event: MessageEvent) => {
    if (event?.data?.source !== "element-binder-plugin") return;

    const { type, detail } = event.data.payload;
    switch (type) {
        case 'click-extension-button':
            toggleIframe(detail.isMenuOpen)
            break;
        default:
            console.warn(`Sorry, we are out of ${type}.`);
    }
}
