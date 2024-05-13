export const getDataAutocomplete = () => {
    const nodeList = document.querySelectorAll('*[itemscope]');
    nodeList.forEach(node => {
        console.log(node);
    })
}
