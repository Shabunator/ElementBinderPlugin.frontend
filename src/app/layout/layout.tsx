import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Text, Button, Icon } from '@gravity-ui/uikit';
import { Xmark, FileArrowDown } from '@gravity-ui/icons';

import { postMessage } from '@shared/utils';

import './layout.css';

export const Layout = () => {
    const closeHandler = useCallback(() => {
        postMessage('click-extension-button', { isMenuOpen: false });
    }, []);

    return (
        <div className='layout'>
            <header className="layout__header">
                <Text variant="header-1">Element binder plugin</Text>
                <div className="layout__buttonRow">
                    <Button view="action" size="l">
                        <Icon data={FileArrowDown} size={18}/>
                    </Button>
                    <Button view="flat" size="l" onClick={closeHandler}>
                        <Icon data={Xmark} size={18}/>
                    </Button>
                </div>
            </header>
            <main className="layout__main">
                <Outlet/>
            </main>
        </div>
    )
}
