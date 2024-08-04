import { FC, PropsWithChildren } from 'react';
import TabActiveInfo = chrome.tabs.TabActiveInfo;

import { useState, useCallback, useEffect } from 'react';

import { getCurrentTab } from '@shared/utils';

import { ChromeContext } from './chromeContext';

export const ChromeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [tab, setTab] = useState<TabActiveInfo | null>(null);

    const handleTabUpdated = useCallback(async (activeInfo: TabActiveInfo) => {
        setTab(activeInfo);
    }, []);

    useEffect(() => {
        getCurrentTab().then((tab) => setTab({ tabId: tab.id ?? 0, windowId: tab.windowId }));

        chrome.tabs.onActivated.addListener(handleTabUpdated);

        return () => {
            chrome.tabs.onActivated.removeListener(handleTabUpdated);
        }
    }, [handleTabUpdated])

    if (tab === null) {
        return;
    }

    return (
        <ChromeContext.Provider value={tab}>
            {children}
        </ChromeContext.Provider>
    );
};
