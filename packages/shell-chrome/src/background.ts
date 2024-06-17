import { getStorageEntry, setStorageEntry } from './helpers/storage-helper.js';
import type { TabStorageSession } from './types/tab-storage-session';

const toggleIframe = async (tabId: number, isMenuOpenParam?: boolean) => {
    let isMenuOpen = isMenuOpenParam;
    if (!isMenuOpen) {
        const data = await getStorageEntry<TabStorageSession>(tabId.toString(), 'session');
        isMenuOpen = data === undefined || ! data.isMenuOpen;
    }

    await chrome.tabs.sendMessage(tabId, {
        type: 'click-extension-button',
        detail: { isMenuOpen },
    });
    await setStorageEntry(tabId.toString(), { isMenuOpen }, 'session');
}

chrome.action.onClicked.addListener(async (tab) => {
    if (! tab.id) {
        return;
    }

    await toggleIframe(tab.id);
});

chrome.contextMenus.onClicked.addListener((info) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const activeTab = tabs[0];
        const activeTabId = activeTab.id;
        if (activeTabId) {
            await chrome.tabs.sendMessage(activeTabId, {
                type: 'click-context-menu',
                detail: { info },
            });
        }
    });
});

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: 'Добавить в ElementBinderPlugin',
        contexts: ['image'],
        id: 'image'
    });
});

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(async ({ type, detail }) => {
        switch (type) {
            case 'click-extension-button':
                if (typeof port?.sender?.tab?.id === 'number') {
                    await toggleIframe(port.sender.tab.id, detail.isMenuOpen);
                }
                break;
            case 'change-height':
                port.postMessage({ type, detail });
                break;
            default:
                console.log(`Sorry, we are out of ${type}.`);
        }
    });
});
