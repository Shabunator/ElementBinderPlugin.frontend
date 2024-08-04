export const postMessage = <T>(type: string, detail: T) => {
    window.parent.postMessage({
        source: "element-binder-plugin",
        payload: {
            type,
            detail
        }
    }, '*');
}
