import { getStorageEntry, setStorageEntry } from './helpers/storage-helper.js';
import type { TabStorageSession } from './types/tab-storage-session';

chrome.action.onClicked.addListener(async (tab) => {
    if (! tab.id) {
        return;
    }

    const tabId = tab.id.toString();
    const data = await getStorageEntry<TabStorageSession>(tabId, 'session');
    const isMenuOpen = data === undefined || ! data.isMenuOpen;

    await chrome.tabs.sendMessage(tab.id, {
        name: 'click-extension-button',
        params: { isMenuOpen },
    });
    await setStorageEntry(tabId, { isMenuOpen }, 'session')
});
