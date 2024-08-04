chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel
        .setPanelBehavior({ openPanelOnActionClick: true })
        .catch((error) => console.error(error));

    chrome.contextMenus.create({
        id: 'openSidePanel',
        title: 'Открыть ElementBinderPlugin',
        contexts: ['page']
    });
    chrome.contextMenus.create({
        title: 'Добавить в ElementBinderPlugin',
        contexts: ['image'],
        id: 'image'
    });
});

chrome.contextMenus.onClicked.addListener(async (_info, tab) => {
    if (tab === undefined) {
        return;
    }

    await chrome.sidePanel.open({ windowId: tab.windowId });
});

// chrome.tabs.onUpdated.addListener(async (tabId, _info, tab) => {
//
// });
