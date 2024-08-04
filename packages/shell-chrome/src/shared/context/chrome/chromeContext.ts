import { createContext } from 'react';
import TabActiveInfo = chrome.tabs.TabActiveInfo;

export const ChromeContext = createContext<TabActiveInfo>({ tabId: 0, windowId: 0 })
