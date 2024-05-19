import { toggleIframe, changeHeightIframe } from './iframe-helper';

export const messageListener = async (event: MessageEvent) => {
    if (event?.data?.source !== "element-binder-plugin") return;

    // console.log('@messageListener');
    // await chrome.runtime.sendMessage({greeting: '123'});
    // chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    //     const activeTab = tabs[0];
    //     const activeTabId = activeTab.id;
    //     console.log('@activeTabId', activeTabId);
    // });

    const { type, detail } = event.data.payload;
    switch (type) {
        case 'click-extension-button':
            // eslint-disable-next-line no-case-declarations
            const { isMenuOpen } = detail;
            toggleIframe(isMenuOpen);
            break;
        case 'change-height':
            changeHeightIframe(detail.height + 8)
            break;
        default:
            console.warn(`Sorry, we are out of ${type}.`);
    }
}
