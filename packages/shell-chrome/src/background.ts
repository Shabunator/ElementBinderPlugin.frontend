import { getStorageEntry, setStorageEntry } from './helpers/storage-helper.js';
import type { TabStorageSession } from './types/tab-storage-session';
// import ContextType = chrome.contextMenus.ContextType;

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
    await setStorageEntry(tabId, { isMenuOpen }, 'session');

    await chrome.sidePanel.open({ tabId: tab.id });
});

chrome.contextMenus.onClicked.addListener((info) => {
    // chrome.sidePanel.open({ tabId: tab.id });
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const activeTab = tabs[0];
        const activeTabId = activeTab.id;
        if (activeTabId) {
            await chrome.tabs.sendMessage(activeTabId, {
                name: 'click-context-menu',
                params: { info },
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

    // chrome.contextMenus.create({
    //     id: 'define-word',
    //     title: 'Define',
    //     contexts: ['selection']
    // });
    // chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true});
    // chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    //     const activeTab = tabs[0];
    //     const activeTabId = activeTab.id;
    //     if (activeTabId) {
    //         chrome.sidePanel.open({ tabId: activeTabId });
    //     }
    // });


    // Create one test item for each context type.
    // const contexts: ContextType[] = [
    //     'page',
    //     'selection',
    //     'link',
    //     'editable',
    //     'image',
    //     'video',
    //     'audio'
    // ];
    // for (let i = 0; i < contexts.length; i++) {
    //     const context = contexts[i];
    //     const title = "Test '" + context + "' menu item";
    //     chrome.contextMenus.create({
    //         title: title,
    //         contexts: [context],
    //         id: context
    //     });
    // }

    // Create a parent item and two children.
    // const parent = chrome.contextMenus.create({
    //     title: 'Test parent item',
    //     id: 'parent'
    // });
    // chrome.contextMenus.create({
    //     title: 'Child 1',
    //     parentId: parent,
    //     id: 'child1'
    // });
    // chrome.contextMenus.create({
    //     title: 'Child 2',
    //     parentId: parent,
    //     id: 'child2'
    // });
    //
    // // Create a radio item.
    // chrome.contextMenus.create({
    //     title: 'radio',
    //     type: 'radio',
    //     id: 'radio'
    // });
    //
    // // Create a checkbox item.
    // chrome.contextMenus.create({
    //     title: 'checkbox',
    //     type: 'checkbox',
    //     id: 'checkbox'
    // });
    // Intentionally create an invalid item, to show off error checking in the
    // create callback.
    // chrome.contextMenus.create(
    //     {title: 'Oops', parentId: 999, id: 'errorItem'},
    //     function () {
    //         if (chrome.runtime.lastError) {
    //             console.log('Got expected error: ' + chrome.runtime.lastError.message);
    //         }
    //     }
    // );
});
