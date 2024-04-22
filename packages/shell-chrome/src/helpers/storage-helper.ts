import AreaName = chrome.storage.AreaName;

const clearStorage = (areaName: AreaName) => {
    return new Promise<void>((resolve, reject) => {
        chrome.storage[areaName].clear(() => {
            const err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setStorageEntry = (name: string, value: any, areaName: AreaName) => {
    const storageObject = { [name]: value };
    return chrome.storage[areaName].set(storageObject);
    // return new Promise((resolve, reject) => {
    //     chrome.storage[areaName].set(storageObject, () => {
    //         const err = chrome.runtime.lastError;
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(storageObject);
    //         }
    //     });
    // });
};

const getStorageEntry = <T>(name: string, areaName: AreaName): Promise<T | undefined> => {
    return new Promise((resolve) => {
        chrome.storage[areaName].get(name, (result) => {
            resolve(result && result[name]);
        });
    });
};

export { clearStorage, getStorageEntry, setStorageEntry };
