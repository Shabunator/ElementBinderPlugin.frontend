const script = document.createElement('script')
script.src = chrome.runtime.getURL('hook-exec.js')
script.onload = () => {
    script.remove()
}
;(document.head || document.documentElement).appendChild(script);

chrome.runtime.onMessage.addListener(async ({ type, detail }) => {
    switch (type) {
        case 'click-extension-button':
            window.dispatchEvent(new CustomEvent(type, { detail }));
            break;
        case 'click-context-menu':
            window.dispatchEvent(new CustomEvent(type, { detail }));
            break;
        default:
            console.log(`Sorry, we are out of ${type}.`);
    }
})

const port = chrome.runtime.connect();
port.onMessage.addListener(({ type, detail }) => {
    switch (type) {
        case 'change-height':
            window.dispatchEvent(new CustomEvent(type, { detail }));
            break;
        default:
            console.log(`Sorry, we are out of ${type}.`);
    }
});
window.addEventListener('message', async (event: MessageEvent) => {
    if (event?.data?.source !== "element-binder-plugin") return;

    port.postMessage(event.data.payload);
});
