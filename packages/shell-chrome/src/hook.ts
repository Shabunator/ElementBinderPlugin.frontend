const script = document.createElement('script')
script.src = chrome.runtime.getURL('hook-exec.js')
script.onload = () => {
    script.remove()
}
;(document.head || document.documentElement).appendChild(script);

chrome.runtime.onMessage.addListener(({ name, params }) => {
    switch (name) {
        case 'click-extension-button':
            window.dispatchEvent(new CustomEvent(name, { detail: params }));
            break;
        default:
            console.log(`Sorry, we are out of ${name}.`);
    }
})
